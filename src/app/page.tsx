'use client'

import { PageContent } from "@/components/layouts/PageContent";
import { auth } from "@/firebase/clientApp";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Home() {
  const [user, loadingUser] = useAuthState(auth)

  const buildUserHomeFeed = () => { }
  const buildNoUserHomeFeed = () => { }
  const getUserPostVotes = () => { }

  useEffect(() => {
    
  },[])

  return (
    <PageContent>
      <>
        {/* <PostFeed /> */}
      </>
      <>
        {/* <Recommendations /> */}
      </>
    </PageContent>
  )
}
