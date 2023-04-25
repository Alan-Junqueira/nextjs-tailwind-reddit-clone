import { Community } from "@/@types/Community"
import { CommunityNotFound } from "@/components/community/CommunityNotFound"
import { JoinButtonHeader } from "@/components/community/JoinButtonHeader"
import { PageContent } from "@/components/layouts/PageContent"
import { firestore } from "@/firebase/clientApp"
import { doc, getDoc } from "firebase/firestore"
import safeJsonStringify from 'safe-json-stringify'

type CommunityIdProps = {
  params: {
    communityId: string
  }
}

async function getCommunityData(communityId: string) {
  const communityDocRef = doc(firestore, 'communities', communityId)
  const communityDoc = await getDoc(communityDocRef)

  const communityData = communityDoc.exists() ? JSON.parse(
    safeJsonStringify({ id: communityDoc.id, ...communityDoc.data() })) : ''

  return communityData
}

export async function generateMetadata({ params }: CommunityIdProps) {
  return {
    title: `${params.communityId} | Community`,
    description: `Posts from ${params.communityId}`
  }
}

export default async function CommunityIdPage({ params: { communityId } }: CommunityIdProps) {
  const communityData = await getCommunityData(communityId) as Community

  if (!communityData.id) {
    return (
      <CommunityNotFound />
    )
  }

  return (
    <PageContent>
      <>
        <p>LHS</p>
        <p>teste</p>
      </>

      <>RHS</>
    </PageContent>
  )
}