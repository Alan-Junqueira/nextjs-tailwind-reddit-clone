import { Skeleton } from './Skeleton'

export const CommentsSkeleton = () => {
  return (
    <div className='flex flex-col gap-4 p-6 bg-white'>
      <Skeleton rounded='rounded-full' className='w-10 h-10' />
      <Skeleton className='h-2' />
      <Skeleton className='h-2 w-4/5' />
    </div>
  )
}
