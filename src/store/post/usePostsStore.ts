import { Community } from '@/@types/Community'
import { firestore } from '@/firebase/clientApp'
import { User } from 'firebase/auth'
import { collection, doc, getDocs, increment, writeBatch } from 'firebase/firestore'
import { create } from 'zustand'
import { useAuthModalStore } from '../modal/useAuthModalStore'
import { Post } from '@/@types/Post'


type PostsState = {
  selectedPost: Post | null
  posts: Post[]
}

type PostsActions = {
  getPostsStore: (posts: Post[]) => void
  onVote: () => void
  onSelectPost: () => void
  onDeletePost: () => void
}

interface PostsStoreProps {
  state: PostsState,
  actions: PostsActions
}

export const usePostsStore = create<PostsStoreProps>((set, get, actions) => ({
  state: {
    selectedPost: null,
    posts: []
  },
  actions: {
    getPostsStore: (posts: Post[]) => {
      set((prev) => ({
        ...prev,
        state: {
          ...prev.state,
          posts
        }
      }))
    },
    onDeletePost: () => {

    },
    onSelectPost: () => {

    },
    onVote: () => {

    }
  }
}))
