import { Community } from '@/@types/Community'
import { firestore, storage } from '@/firebase/clientApp'
import { User } from 'firebase/auth'
import { collection, deleteDoc, doc, getDocs, increment, writeBatch } from 'firebase/firestore'
import { create } from 'zustand'
import { useAuthModalStore } from '../modal/useAuthModalStore'
import { Post } from '@/@types/Post'
import { deleteObject, ref } from 'firebase/storage'


type PostsState = {
  selectedPost: Post | null
  posts: Post[]
}

type PostsActions = {
  getPostsStore: (posts: Post[]) => void
  onVote: () => void
  onSelectPost: () => void
  onDeletePost: (post: Post) => Promise<boolean>
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
    onDeletePost: async (post: Post): Promise<boolean> => {
      try {
        // ? Check if image, delete if exists
        if (post.imageUrl) {
          const imageRef = ref(storage, `posts/${post.id}/image`)
          await deleteObject(imageRef)
        }

        // ? Delete post document from firestore
        const postDocRef = doc(firestore, 'posts', post.id!)
        await deleteDoc(postDocRef)

        // ? Update state

        set((prev) => ({
          ...prev,
          state: {
            ...prev.state,
            posts: prev.state.posts.filter(prevPost => prevPost.id !== post.id)
          }
        }))

        return true
      } catch (error) {
        return false
      }
    },
    onSelectPost: () => {

    },
    onVote: () => {

    }
  }
}))
