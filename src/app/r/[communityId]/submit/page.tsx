'use client'

import { CommunityAbout } from "@/components/community/CommunityAbout";
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

  useEffect(() => {
    getCurrentCommunity(communityId)
  }, [communityId, getCurrentCommunity])

  return (
    <PageContent>
      <>
        <div className="py-3.5 border-b border-b-white">
          <p>Create a post</p>
        </div>
        {user && <NewPostForm user={user} communityImageUrl={currentCommunity?.imageUrl} />}
      </>
      <>
        {currentCommunity &&
          <CommunityAbout communityData={currentCommunity} />
        }
      </>
    </PageContent>
  )
}