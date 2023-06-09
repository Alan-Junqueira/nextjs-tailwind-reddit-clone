'use client'

import React, { useEffect, useState } from 'react'
import { Button } from '../Button'
import { useCommunityStore } from '@/store/community/useCommunityStore'
import { Community } from '@/@types/Community'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '@/libs/firebase/clientApp'
import { useAuthModalStore } from '@/store/modal/useAuthModalStore'

interface IJoinButtonHeader {
  communityData: Community
}

export const JoinButtonHeader = ({ communityData }: IJoinButtonHeader) => {
  const [user, userLoading] = useAuthState(auth)
  const [toggleCommunityLoading, setToggleCommunityLoading] = useState<boolean>(false);

  const { state: { mySnippets }, actions: { onJoinOrLeaveCommunity, getMySnippets, resetSnippets } } = useCommunityStore()
  const { actions: { openModal } } = useAuthModalStore()

  const isJoined = !!mySnippets.find(item => item.communityId === communityData.id)

  const handleToggleCommunity = () => {
    if (!user) {
      openModal('login')
      return
    }
    try {
      setToggleCommunityLoading(true)
      onJoinOrLeaveCommunity(communityData, user, isJoined)
    } catch (error) {
      console.log('handleToggleCommunity error', error)
    } finally {
      setToggleCommunityLoading(false)
    }
  }

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
      className='h-7'
      onClick={handleToggleCommunity}
      disabled={userLoading || toggleCommunityLoading}
    >
      {isJoined ? 'Joined' : 'Join'}
    </Button>
  )
}
