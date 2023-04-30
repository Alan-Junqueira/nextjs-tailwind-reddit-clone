import React from 'react'
import { Skeleton } from './Skeleton'

export const TopCommunitiesSkeleton = () => {
  return (
    <div className='flex flex-col gap-4 mt-2 p-3'>
      <div className="flex justify-between items-center">
        <Skeleton rounded="rounded-full" className='h-5 w-5' />
        <Skeleton className='h-2.5 w-3/4' />
      </div>
      <div className="flex justify-between items-center">
        <Skeleton rounded="rounded-full" className='h-5 w-5' />
        <Skeleton className='h-2.5 w-3/4' />
      </div>
      <div className="flex justify-between items-center">
        <Skeleton rounded="rounded-full" className='h-5 w-5' />
        <Skeleton className='h-2.5 w-3/4' />
      </div>
      <div className="flex justify-between items-center">
        <Skeleton rounded="rounded-full" className='h-5 w-5' />
        <Skeleton className='h-2.5 w-3/4' />
      </div>
      <div className="flex justify-between items-center">
        <Skeleton rounded="rounded-full" className='h-5 w-5' />
        <Skeleton className='h-2.5 w-3/4' />
      </div>
    </div>
  )
}
