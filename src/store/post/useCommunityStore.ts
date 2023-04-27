import { Community } from '@/@types/Community'
import { firestore } from '@/firebase/clientApp'
import { User } from 'firebase/auth'
import { collection, doc, getDocs, increment, writeBatch } from 'firebase/firestore'
import { create } from 'zustand'
import { useAuthModalStore } from '../modal/useAuthModalStore'
import { Post } from '@/@types/Post'


type PostState = {
  selectedPost: Post | null
  posts: Post[]
}

type CommunityActions = {

}

interface CommunityStoreProps {
  state: PostState,
  actions: CommunityActions
}

export const useCommunityStore = create<CommunityStoreProps>((set, get, actions) => ({
  state: {
    selectedPost: null,
    posts: []
  },
  actions: {
  }
}))
