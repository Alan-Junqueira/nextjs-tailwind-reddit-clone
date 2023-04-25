import { Community } from '@/@types/Community'
import { firestore } from '@/firebase/clientApp'
import { User } from 'firebase/auth'
import { collection, getDocs } from 'firebase/firestore'
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
  joinCommunity: (communityData: Community) => void
  leaveCommunity: (communityId: string) => void
  onJoinOrLeaveCommunity: (communityData: Community, isJoined: boolean) => void
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

        console.log('here are snippets', snippets)
      } catch (error) {
        console.log('getMySnippets error', error)
      }
    },
    leaveCommunity: (communityId) => { },
    joinCommunity: () => { /* implementação da função */ },
    onJoinOrLeaveCommunity: (communityData, isJoined) => {
      if (isJoined) {
        // agora você pode acessar a função joinCommunity
        get().actions.leaveCommunity(communityData.id)
        return
      }

      get().actions.joinCommunity(communityData)
    },
  }
}))
