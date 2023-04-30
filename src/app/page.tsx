'use client'

import { Post } from "@/@types/Post";
import { PageContent } from "@/components/layouts/PageContent";
import { PostItem } from "@/components/posts/PostItem";
import { PostSkeleton } from "@/components/skeletons/PostSkeleton";
import { auth, firestore } from "@/firebase/clientApp";
import { usePostsStore } from "@/store/post/usePostsStore";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { useCallback, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);

  const [user, loadingUser] = useAuthState(auth)
  const { actions: { getPostsStore, onSelectPost, onDeletePost, onVote }, state: { posts, postVotes } } = usePostsStore()

  const buildUserHomeFeed = () => { }

  const buildNoUserHomeFeed = useCallback(
    async () => {
      try {
        setIsLoading(true)
        const postQuery = query(collection(firestore, 'posts'),
          orderBy('voteStatus', 'desc'),
          limit(10)
        )

        const postDocs = await getDocs(postQuery)
        const posts = postDocs.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Post[]

        getPostsStore(posts)

      } catch (error) {
        console.log('buildUserHomeFeed error: ', error)
      } finally {
        setIsLoading(false)
      }
    },
    [getPostsStore]
  )


  const getUserPostVotes = () => { }

  useEffect(() => {
    if (!user && !loadingUser) buildNoUserHomeFeed()
  }, [buildNoUserHomeFeed, loadingUser, user])

  return (
    <PageContent>
      <>
        {isLoading ? (
          <>
            <PostSkeleton />
            <PostSkeleton />
          </>
        ) : (
          <div className="flex gap-1 flex-col">
            {posts.map(post => (
              <PostItem
                key={post.id}
                post={post}
                onDeletePost={onDeletePost}
                onSelectPost={onSelectPost}
                onVote={onVote}
                userVoteValue={postVotes.find(vote => vote.postId === post.id)?.voteValue}
                userIsCreator={user?.uid === post.creatorId}
                homePage
              />
            ))}
          </div>
        )}
      </>
      <>
        {/* <Recommendations /> */}
      </>
    </PageContent>
  )
}
