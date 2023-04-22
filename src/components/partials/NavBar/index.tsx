'use client'

import { SearchInput } from '@/components/SearchInput'
import Image from 'next/image'
import React from 'react'
import { RightContent } from './RightContent'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '@/firebase/clientApp'
import { Directory } from './Directory'

export const NavBar = () => {
  const [user, loading, error] = useAuthState(auth)

  return (
    <header className="flex bg-white h-11 px-3 py-2">
      <div className="flex items-center ">
        <Image
          src="/assets/images/redditFace.svg"
          alt="reddit logo"
          width={32}
          height={32}
        />
        <Image
          src="/assets/images/redditText.svg"
          alt="reddit logo"
          width={48}
          height={48}
          className="hidden md:block"
        />
      </div>
      {user && <Directory />}
      <SearchInput user={user} />
      <RightContent user={user} />
    </header>
  )
}
