import Link from 'next/link'
import React, { HTMLAttributes } from 'react'
import { Button } from '../Button'

interface ICommunityNotFound extends HTMLAttributes<HTMLDivElement> { }

export const CommunityNotFound = ({ ...props }: ICommunityNotFound) => {
  return (
    <div {...props} className='flex flex-col justify-center items-center gap-4 min-h-[60vh]'>
      <p className='text-gray-700'>Sorry, that community does not exist or has been banned</p>
      <Link href='/'><Button className='h-8'>GO HOME</Button></Link>
    </div>
  )
}
