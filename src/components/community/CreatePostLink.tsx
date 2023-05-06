'use client'

import { FaReddit } from 'react-icons/fa'
import { Input } from '../Input'
import { IoImageOutline } from 'react-icons/io5'
import { BsLink45Deg } from 'react-icons/bs'
import { useRouter, useParams } from 'next/navigation'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '@/libs/firebase/clientApp'
import { useAuthModalStore } from '@/store/modal/useAuthModalStore'

export const CreatePostLink = () => {
  const router = useRouter()
  const { communityId } = useParams()
  const [user] = useAuthState(auth)
  const { actions: { openModal } } = useAuthModalStore()

  const handleInputClick = () => {
    if (!user) {
      openModal('login')
      return
    }
    router.push(`/r/${communityId}/submit`)
  }

  return (
    <div className='flex items-center justify-evenly gap-4 bg-white h-14 rounded border border-gray-300 p-2 mb-4'>
      <FaReddit className='text-4xl text-gray-300' />
      <Input
        placeholder='Create Post'
        className='
          text-xs bg-gray-50 border-gray-200 h-9 rounded border pl-2
          placeholder:text-gray-500
          hover:bg-white hover:border-blue-500
          focus:outline-none focus:bg-white focus:border-blue-500
        '
        onClick={handleInputClick}
      />
      <IoImageOutline className='text-2xl text-gray-400 cursor-pointer' />
      <BsLink45Deg className='text-2xl text-gray-400 cursor-pointer' />
    </div>
  )
}
