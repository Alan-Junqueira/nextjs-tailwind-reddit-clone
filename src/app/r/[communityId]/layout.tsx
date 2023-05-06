import { ReactNode } from 'react'
import { Metadata } from 'next'
import { CommunityHeader } from '@/components/community/CommunityHeader'
import { doc, getDoc } from 'firebase/firestore'
import { firestore } from '@/libs/firebase/clientApp'
import safeJsonStringify from 'safe-json-stringify'

export const metadata: Metadata = {
  title: {
    default: 'Community',
    template: '% | Community'
  },
  description: "Posts from community"
}

interface ICommunityIdLayout {
  params: {
    communityId: string
  },
  children: ReactNode[]
}

export default async function CommunityIdLayout({ children, params: { communityId } }: ICommunityIdLayout) {
  const communityDocRef = doc(firestore, 'communities', communityId)
  const communityDoc = await getDoc(communityDocRef)

  const communityData = communityDoc.exists() ? JSON.parse(
    safeJsonStringify({ id: communityDoc.id, ...communityDoc.data() })) : ''
  return (
    <>
      <CommunityHeader communityData={communityData} />
      {children}
    </>
  )
}
