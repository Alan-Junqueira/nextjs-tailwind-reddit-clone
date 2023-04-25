'use client'

import React, { ButtonHTMLAttributes } from 'react'
import { Button } from '../Button'

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  isJoined: boolean
}

export const JoinButtonHeader = ({ isJoined, ...props }: IButton) => {
  return (
    <Button
      variant={isJoined ? 'outline' : 'solid'}
      className='h-6'
      onClick={() => { }}
    >
      {isJoined ? 'Joined' : 'Join'}
    </Button>
  )
}
