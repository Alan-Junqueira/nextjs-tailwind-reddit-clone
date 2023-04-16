'use client'

import { Button } from '@/components/Button'
import { useAuthModalStore } from '@/store/modal/useAuthModalStore'
import React from 'react'

export const AuthButtons = () => {
  const {
    actions: { openModal },
  } = useAuthModalStore()

  return (
    <div className="flex">
      <Button
        size="sm"
        variant="outline"
        className="h-7 hidden sm:flex w-16 md:w-28 mr-2"
        onClick={() => openModal('login')}
      >
        Log In
      </Button>
      <Button
        // size="sm"
        variant="solid"
        className="h-7 hidden sm:flex w-16 md:w-28 mr-2"
        onClick={() => openModal('signup')}
      >
        Sign Up
      </Button>
    </div>
  )
}
