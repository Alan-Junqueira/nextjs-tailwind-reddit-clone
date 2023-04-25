import { Community } from '@/@types/Community'
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
    leaveCommunity: (communityId) => { },
    joinCommunity: () => { /* implementação da função */ },
    onJoinOrLeaveCommunity: (communityData, isJoined) => {
      if (isJoined) {
        // agora você pode acessar a função joinCommunity
        actions.getState().actions.leaveCommunity(communityData.id)
        return
      }

      actions.getState().actions.joinCommunity(communityData)
    },
  }
}))
