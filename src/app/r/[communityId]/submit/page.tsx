'use client'

import { PageContent } from "@/components/layouts/PageContent";
import { NewPostForm } from "@/components/posts/NewPostForm";
import { auth } from "@/firebase/clientApp";
import { useCommunityStore } from "@/store/community/useCommunityStore";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

export default function CommunityIdSubmitPage() {
  const [user] = useAuthState(auth)
  const { communityId } = useParams()

  const { actions: { getCurrentCommunity }, state: { currentCommunity } } = useCommunityStore()
  console.log(currentCommunity)

  useEffect(() => {
    getCurrentCommunity(communityId)
  },[communityId, getCurrentCommunity])
  
  return (
    <PageContent>
      <>
        <div className="py-3.5 border-b border-b-white">
          <p>Create a post</p>
        </div>
        {user && <NewPostForm user={user} />}
      </>
      <>
        {/* <CommunityAbout /> */}
      </>
    </PageContent>
  )
}