'use client'

import { Community } from '@/@types/Community'
import { Post } from '@/@types/Post';
import { firestore } from '@/firebase/clientApp';
import { usePostsStore } from '@/store/post/usePostsStore';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { HTMLAttributes, useEffect, useState } from 'react'

interface IPosts extends HTMLAttributes<HTMLDivElement> {
  communityData: Community
}

export const Posts = ({ communityData, ...props }: IPosts) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { actions: { getPostsStore } } = usePostsStore()


  const getPosts = async () => {
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

      console.log('posts', posts)

    } catch (error: any) {
      console.log('getPosts error', error.message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => { getPosts() }, [])

  return (
    <div {...props}>Posts</div>
  )
}
