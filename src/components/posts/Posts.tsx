'use client'

import { Community } from '@/@types/Community'
import { Post } from '@/@types/Post';
import { auth, firestore } from '@/libs/firebase/clientApp';
import { usePostsStore } from '@/store/post/usePostsStore';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { HTMLAttributes, useCallback, useEffect, useState } from 'react'
import { PostItem } from './PostItem';
import { useAuthState } from 'react-firebase-hooks/auth';
import { PostSkeleton } from '../skeletons/PostSkeleton';

interface IPosts extends HTMLAttributes<HTMLDivElement> {
  communityData: Community
}

export const Posts = ({ communityData, ...props }: IPosts) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [user] = useAuthState(auth)

  const { actions: { getPostsStore, onDeletePost, onSelectPost, onVote, getCommunityPostsVotesStore }, state: { posts, postVotes } } = usePostsStore()

  const getPosts = useCallback(
    async () => {
      try {
        setIsLoading(true)
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

  useEffect(() => {
    getPosts()
    if (user) {
      getCommunityPostsVotesStore(communityData.id, user)
    }
  }, [communityData.id, getCommunityPostsVotesStore, getPosts, user])

  return (
    <>
      {isLoading ? (
        <div {...props} className='flex flex-col gap-3'>
          <PostSkeleton />
          <PostSkeleton />
        </div>
      ) : (

        <div {...props} className='flex flex-col gap-3'>
          {posts.map((post) => (
            <PostItem
              key={post.id}
              post={post}
              onDeletePost={onDeletePost}
              onSelectPost={onSelectPost}
              onVote={onVote}
              userIsCreator={user?.uid === post.creatorId}
              userVoteValue={postVotes.find(vote => vote.postId === post.id)?.voteValue}
              user={user}
            />
          ))}
        </div >
      )}
    </>
  )
}
