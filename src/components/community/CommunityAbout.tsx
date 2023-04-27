import { Community } from '@/@types/Community'
import moment from 'moment'
import Link from 'next/link'
import React, { HTMLAttributes } from 'react'
import { HiOutlineDotsHorizontal } from 'react-icons/hi'
import { RiCakeLine } from 'react-icons/ri'
import { Button } from '../Button'

interface ICommunityAbout extends HTMLAttributes<HTMLDivElement> {
  communityData: Community
  communityId: string
}

export const CommunityAbout = ({ communityData, communityId, ...props }: ICommunityAbout) => {
  return (
    <div
      {...props}
      className={`
        sticky top-3.5 w-full
        ${props.className}`
      }
    >
      <div className="flex justify-between items-center bg-blue-400 text-white p-3 rounded-tl rounded-tr">
        <p className='text-xs font-bold'>About Community</p>
        <HiOutlineDotsHorizontal />
      </div>
      <div className="flex flex-col p-3 bg-white rounded-bl rounded-br">
        <div className="flex">
          <div className="flex w-full p-2 text-xs font-bold">
            <div className="flex flex-col flex-grow">
              <span>{communityData.numberOfMembers.toLocaleString()}</span>
              <span>Members</span>
            </div>
            <div className="flex flex-col flex-grow">
              <span>1</span>
              <span>Online</span>
            </div>
          </div>
        </div>
        <hr className='w-full h-[1px] bg-gray-300 mb-2' />
        <div className="flex gap-2 items-center w-full p-1 font-medium text-xs">
          <RiCakeLine size={18} />
          <span>Created
            {communityData.createdAt &&
              <> {moment(new Date(communityData.createdAt.seconds * 1000)).format('MMM DD, YYYY')}</>
            }
          </span>
        </div>
        <Link href={`r/${communityId}/submit`} className='mt-3 w-full'>
          <Button className='w-full h-8'>Create Post</Button>
        </Link>
      </div>
    </div>
  )
}
