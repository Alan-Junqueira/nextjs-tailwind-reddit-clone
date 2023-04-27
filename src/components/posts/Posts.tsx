'use client'

import { Community } from '@/@types/Community'
import { Post } from '@/@types/Post';
import { auth, firestore } from '@/firebase/clientApp';
import { usePostsStore } from '@/store/post/usePostsStore';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { HTMLAttributes, useCallback, useEffect, useState } from 'react'
import { PostItem } from './PostItem';
import { useAuthState } from 'react-firebase-hooks/auth';

interface IPosts extends HTMLAttributes<HTMLDivElement> {
  communityData: Community
}

export const Posts = ({ communityData, ...props }: IPosts) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [user] = useAuthState(auth)

  const { actions: { getPostsStore, onDeletePost, onSelectPost, onVote }, state: { posts } } = usePostsStore()

  const getPosts = useCallback(
    async () => {
      try {
        const postsQuery = query(
          collection(firestore, 'posts'),
          where('communityId', '==', communityData.id),
          orderBy('createdAt', 'desc'))

        const postDocs = await getDocs(postsQuery)
        const posts = postDocs.docs.map(doc => ({
          id: doc.id, ...doc.data()
        }))

        getPostsStore(posts as Post[])

      } catch (error: any) {
        console.log('getPosts error', error.message)
      } finally {
        setIsLoading(false)
      }
    },
    [communityData.id, getPostsStore]
  )

  useEffect(() => { getPosts() }, [getPosts])

  return (
    <div {...props} className='flex flex-col gap-2'>
      {posts.map((post) => (
        <PostItem
          post={post}
          key={post.id}
          onDeletePost={onDeletePost}
          onSelectPost={onSelectPost}
          onVote={onVote}
          userIsCreator={user?.uid === post.creatorId}
          userVoteValue={undefined}
        />
      ))}
    </div>
  )
}
