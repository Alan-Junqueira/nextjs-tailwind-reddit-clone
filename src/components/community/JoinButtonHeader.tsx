'use client'

import React, { useEffect } from 'react'
import { Button } from '../Button'
import { useCommunityStore } from '@/store/community/useCommunityStore'
import { Community } from '@/@types/Community'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '@/firebase/clientApp'

interface IJoinButtonHeader {
  communityData: Community
}

export const JoinButtonHeader = ({ communityData }: IJoinButtonHeader) => {
  const [user, loading, error] = useAuthState(auth)

  const { state: { mySnippets }, actions: { onJoinOrLeaveCommunity, getMySnippets, resetSnippets } } = useCommunityStore()
  const isJoined = !!mySnippets.find(item => item.communityId === communityData.id)

  useEffect(() => {
    if (!user) {
      resetSnippets()
      return
    }
    getMySnippets(user)
  }, [getMySnippets, resetSnippets, user])

  return (
    <Button
      variant={isJoined ? 'outline' : 'solid'}
      className='h-6'
      onClick={() => onJoinOrLeaveCommunity(communityData, isJoined)}
      disabled={loading}
    >
      {isJoined ? 'Joined' : 'Join'}
    </Button>
  )
}
