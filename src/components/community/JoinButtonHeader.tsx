'use client'

import React, { ButtonHTMLAttributes } from 'react'
import { Button } from '../Button'
import { useCommunityStore } from '@/store/community/useCommunityStore'
import { Community } from '@/@types/Community'

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  communityData: Community
}

export const JoinButtonHeader = ({ communityData, ...props }: IButton) => {
  const { state: { mySnippets }, actions: { onJoinOrLeaveCommunity } } = useCommunityStore()
  const isJoined = !!mySnippets.find(item => item.communityId === communityData.id)

  return (
    <Button
      {...props}
      variant={isJoined ? 'outline' : 'solid'}
      className='h-6'
      onClick={() => onJoinOrLeaveCommunity(communityData, isJoined)}
    >
      {isJoined ? 'Joined' : 'Join'}
    </Button>
  )
}
