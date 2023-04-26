'use client'

import { Community } from '@/@types/Community'
import Image from 'next/image'
import React, { HTMLAttributes } from 'react'
import { FaReddit } from 'react-icons/fa'
import { JoinButtonHeader } from './JoinButtonHeader'

interface ICommunityHeader extends HTMLAttributes<HTMLDivElement> {
  communityData: Community
}

export const CommunityHeader = ({ communityData, ...props }: ICommunityHeader) => {
  return (
    <div {...props} className={`flex- flex-col w-full h-36 ${props.className}`}>
      <div className='h-1/2 bg-blue-400' />
      <div className="flex justify-center bg-white flex-grow">
        <div className="flex w-11/12 max-w-4xl">
          <div className='relative -top-3 border-4 border-white rounded-full w-16 h-16'>
            {communityData.imageUrl ? (
              <Image src='' alt='' width={64} height={64} />
            ) : (

              <FaReddit className='w-full h-auto text-blue-400 ' />
            )}
          </div>
          <div className="flex py-4 px-2.5">
            <div className="flex flex-col mr-6">
              <p className='font-extrabold text-base'>{communityData.id}</p>
              <p className='font-semibold text-xs text-gray-400'>r/{communityData.id}</p>
            </div>
            <JoinButtonHeader communityData={communityData} />
          </div>
        </div>
      </div>
    </div>
  )
}
