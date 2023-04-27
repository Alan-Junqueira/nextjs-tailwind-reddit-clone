import React from 'react'
import { Skeleton } from './Skeleton'

export const PostSkeleton = () => {
  return (
    <div className='flex flex-col gap-3 bg-white rounded pt-6 px-4 pb-4'>
      <Skeleton className='w-1/2 h-2' />
      <Skeleton className='w-full h-2' />
      <Skeleton className='w-full h-2' />
      <Skeleton className='w-full h-2' />
      <Skeleton className='w-3/4 h-2' />
      <Skeleton className='w-full h-52' />
    </div>
  )
}
