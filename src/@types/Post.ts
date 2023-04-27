import { Timestamp } from "firebase/firestore"

export interface Post {
  id?: string
  communityId: string
  creatorId: string
  creatorDisplayName: string
  title: string
  textBody: string
  numberOfComments: number
  voteStatus: number
  imageUrl?: string
  communityImageUrl?: string
  createdAt: Timestamp
}