import { Timestamp } from "firebase/firestore"

export interface Comment {
  id: string
  creatorId: string
  creatorDisplayText: string
  communityId: string
  postId: string
  postTitle: string
  text: string
  createdAt: Timestamp
}