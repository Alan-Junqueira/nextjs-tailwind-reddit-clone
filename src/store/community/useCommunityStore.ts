import { Community } from '@/@types/Community'
import { firestore } from '@/firebase/clientApp'
import { User } from 'firebase/auth'
import { collection, doc, getDocs, increment, writeBatch } from 'firebase/firestore'
import { create } from 'zustand'

type CommunitySnippet = {
  communityId: string
  isModerator?: boolean
  imageUrl?: string
}

type CommunityState = {
  mySnippets: CommunitySnippet[]
  // visitedCommunities
}

type CommunityActions = {
  getMySnippets: (user: any) => void
  joinCommunity: (communityData: Community, user: User) => void
  leaveCommunity: (communityId: string, user: User) => void
  onJoinOrLeaveCommunity: (communityData: Community, user: any, isJoined: boolean) => void
  resetSnippets: () => void
}

interface CommunityStoreProps {
  state: CommunityState,
  actions: CommunityActions
}

export const useCommunityStore = create<CommunityStoreProps>((set, get, actions) => ({
  state: {
    mySnippets: []
  },
  actions: {
    getMySnippets: async (user: User) => {
      try {
        const snippetDocs = await getDocs(
          collection(firestore, `users/${user.uid}/communitySnippets`)
        )

        const snippets = snippetDocs.docs.map(doc => ({ ...doc.data() }))

        set((prev) => ({
          ...prev,
          state: { ...prev.state, mySnippets: snippets as CommunitySnippet[] },
        }))
      } catch (error) {
        console.log('getMySnippets error', error)
      }
    },
    resetSnippets: () => {
      set((prev) => ({
        ...prev,
        state: { ...prev.state, mySnippets: [] },
      }))
    },
    leaveCommunity: async (communityId: string, user: User) => {
      try {
        const batch = writeBatch(firestore)
        batch.delete(doc(firestore, `users/${user.uid}/communitySnippets`, communityId))
        batch.update(doc(firestore, 'communities', communityId), {
          numberOfMembers: increment(-1)
        })

        await batch.commit()

        set((prev) => ({
          ...prev,
          state: { ...prev.state, mySnippets: prev.state.mySnippets.filter(item => item.communityId !== communityId) },
        }))
      } catch (error) {
        console.log('leaveCommunityError', error)
      }
    },
    joinCommunity: async (communityData: Community, user: User) => {
      try {
        const batch = writeBatch(firestore)
        const newSnippet: CommunitySnippet = {
          communityId: communityData.id,
          imageUrl: communityData.imageUrl || ''
        }

        batch.set(doc(firestore, `users/${user.uid}/communitySnippets`, communityData.id), newSnippet)
        batch.update(doc(firestore, 'communities', communityData.id), {
          numberOfMembers: increment(1)
        })

        await batch.commit()

        set((prev) => ({
          ...prev,
          state: { ...prev.state, mySnippets: [...prev.state.mySnippets, newSnippet] },
        }))

      } catch (error) {
        console.log('joinCommunity error', error)
      }
    },
    onJoinOrLeaveCommunity: (communityData: Community, user: User, isJoined: boolean) => {
      if (isJoined) {
        // agora você pode acessar a função joinCommunity
        get().actions.leaveCommunity(communityData.id, user)
        return
      }

      get().actions.joinCommunity(communityData, user)
    }
  }
}))
