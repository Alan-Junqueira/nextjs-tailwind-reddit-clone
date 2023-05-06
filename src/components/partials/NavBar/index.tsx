'use client'

import { SearchInput } from '@/components/SearchInput'
import Image from 'next/image'
import { RightContent } from './RightContent'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '@/libs/firebase/clientApp'
import { Directory } from './Directory'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useCommunityStore } from '@/store/community/useCommunityStore'


export const NavBar = () => {
  const [user] = useAuthState(auth)
  const router = useRouter()

  const { actions: { resetSnippets, getMySnippets } } = useCommunityStore()

  useEffect(() => {
    if (!user) {
      resetSnippets()
      return
    }
    getMySnippets(user)
  }, [getMySnippets, resetSnippets, user])

  return (
    <header className="flex bg-white h-11 px-3 py-2">
      <div className="flex items-center cursor-pointer" onClick={() => router.push('/')}>
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
