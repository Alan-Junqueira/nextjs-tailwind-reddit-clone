'use client'

import { PageContent } from "@/components/layouts/PageContent";
import { PostItem } from "@/components/posts/PostItem";
import { auth } from "@/firebase/clientApp";
import { usePostsStore } from "@/store/post/usePostsStore";
import { useAuthState } from "react-firebase-hooks/auth";

export default function PostIdPage() {
  const [user] = useAuthState(auth)
  const { actions: { onVote, onDeletePost }, state: { selectedPost, postVotes } } = usePostsStore()

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
      </>
      <></>
    </PageContent>
  )
}