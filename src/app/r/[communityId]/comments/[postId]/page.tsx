'use client'

import { Post } from "@/@types/Post";
import { CommunityAbout } from "@/components/community/CommunityAbout";
import { PageContent } from "@/components/layouts/PageContent";
import { Comments } from "@/components/posts/Comments";
import { PostItem } from "@/components/posts/PostItem";
import { auth, firestore } from "@/libs/firebase/clientApp";
import { useCommunityStore } from "@/store/community/useCommunityStore";
import { usePostsStore } from "@/store/post/usePostsStore";
import { doc, getDoc } from "firebase/firestore";
import { useParams } from "next/navigation";
import { useCallback, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

export default function PostIdPage() {
  const { communityId, postId } = useParams()

  const [user] = useAuthState(auth)
  const { actions: { onVote, onDeletePost, onSelectPost, getCommunityPostVoteStore }, state: { selectedPost, postVotes } } = usePostsStore()
  const { actions: { getCurrentCommunity }, state: { currentCommunity } } = useCommunityStore()

  const fetchPost = useCallback(
    async (postId: string) => {
      try {
        const postDocRef = doc(firestore, 'posts', postId)
        const postDoc = await getDoc(postDocRef)

        const post = { id: postDoc.id, ...postDoc.data() }
        onSelectPost(post as Post)
      } catch (error) {
        console.log('fetchPost error', error)
      }
    },
    [onSelectPost]
  )

  useEffect(() => {
    if (postId && !selectedPost) {
      fetchPost(postId)
    }
  }, [fetchPost, postId, selectedPost])

  useEffect(() => {
    if (!currentCommunity) {
      getCurrentCommunity(communityId)
    }
  }, [communityId, currentCommunity, getCurrentCommunity])

  useEffect(() => {
    if (user && postId) {
      getCommunityPostVoteStore(user, postId)
    }
  }, [getCommunityPostVoteStore, postId, user])

  return (
    <PageContent>
      <>
        {selectedPost &&
          <PostItem
            post={selectedPost}
            onVote={onVote}
            onDeletePost={onDeletePost}
            userVoteValue={postVotes.find(vote => vote.postId === selectedPost.id)?.voteValue}
            userIsCreator={user?.uid === selectedPost?.creatorId}
            user={user}
          />
        }
        <Comments user={user} communityId={communityId} selectedPost={selectedPost} />
      </>
      <>
        {currentCommunity &&
          <CommunityAbout communityData={currentCommunity} />
        }
      </>
    </PageContent>
  )
}