'use client'

import { Post } from "@/@types/Post";
import { PostVote } from "@/@types/PostVote";
import { PersonalHome } from "@/components/community/PersonalHome";
import { Premium } from "@/components/community/Premium";
import { Recommendations } from "@/components/community/Recommendations";
import { PageContent } from "@/components/layouts/PageContent";
import { PostItem } from "@/components/posts/PostItem";
import { PostSkeleton } from "@/components/skeletons/PostSkeleton";
import { auth, firestore } from "@/libs/firebase/clientApp";
import { useCommunityStore } from "@/store/community/useCommunityStore";
import { usePostsStore } from "@/store/post/usePostsStore";
import { collection, getDocs, limit, orderBy, query, where } from "firebase/firestore";
import { useCallback, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);

  const [user, loadingUser] = useAuthState(auth)
  const { actions: { getPostsStore, onSelectPost, onDeletePost, onVote, changePostVotes }, state: { posts, postVotes, } } = usePostsStore()
  const { state: { mySnippets, snippetsFetched } } = useCommunityStore()

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

  const buildUserHomeFeed = useCallback(
    async () => {
      try {
        setIsLoading(true)
        if (mySnippets.length) {
          const myCommunityIds = mySnippets.map(snippet => snippet.communityId)

          const postQuery = query(collection(firestore, 'posts'),
            where('communityId', 'in', myCommunityIds),
            limit(10)
          )

          const postDocs = await getDocs(postQuery)

          const posts = postDocs.docs.map(doc => ({
            id: doc.id, ...doc.data()
          })) as Post[]

          getPostsStore(posts)

        } else {
          buildNoUserHomeFeed()
        }
      } catch (error) {
        console.log('buildUserHomeFeed error', error)
      } finally {
        setIsLoading(false)
      }
    },
    [buildNoUserHomeFeed, getPostsStore, mySnippets]
  )

  const getUserPostVotes = useCallback(
    async () => {
      try {
        const postIds = posts.map(post => post.id)
        const postVotesQuery = query(
          collection(firestore, `users/${user?.uid}/postVotes`),
          where('postId', 'in', postIds)
        )
        const postVoteDocs = await getDocs(postVotesQuery)

        const postVotes = postVoteDocs.docs.map(doc => ({
          id: doc.id, ...doc.data()
        })) as PostVote[]

        changePostVotes(postVotes)
      } catch (error) {
        console.log('getUserPostVotes error', error)
      }
    }
    ,
    [changePostVotes, posts, user?.uid]
  )

  useEffect(() => {
    if (!user && !loadingUser) buildNoUserHomeFeed()
  }, [buildNoUserHomeFeed, loadingUser, user])

  useEffect(() => {
    if (snippetsFetched) buildUserHomeFeed()
  }, [buildNoUserHomeFeed, buildUserHomeFeed, loadingUser, snippetsFetched, user])

  useEffect(() => {
    if (user && posts.length) getUserPostVotes()
  }, [getUserPostVotes, posts.length, user])


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
                user={user}
                homePage
              />
            ))}
          </div>
        )}
      </>
      <div className="flex flex-col gap-5">
        <Recommendations />
        <Premium />
        <PersonalHome />
      </div>
    </PageContent>
  )
}