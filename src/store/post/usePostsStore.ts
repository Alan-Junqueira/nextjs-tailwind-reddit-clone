import { firestore, storage } from '@/firebase/clientApp'
import { User } from 'firebase/auth'
import { collection, deleteDoc, doc, getDocs, query, where, writeBatch } from 'firebase/firestore'
import { create } from 'zustand'
import { Post } from '@/@types/Post'
import { deleteObject, ref } from 'firebase/storage'
import { PostVote } from '@/@types/PostVote'

type PostsState = {
  selectedPost: Post | null
  posts: Post[]
  postVotes: PostVote[]
}

type PostsActions = {
  getPostsStore: (posts: Post[]) => void
  onVote: (post: Post, vote: number, communityId: string, user: User) => void
  onSelectPost: (post: Post) => void
  onDeletePost: (post: Post) => Promise<boolean>
  getCommunityPostsVotesStore: (communityId: string, user: User) => void
  clearPostVotesStore: () => void
  getCommunityPostVoteStore: (user: any, postId: string) => void
  updatePostComments: (amount: number) => void
  changePostVotes: (postVotes: PostVote[]) => void
}

interface PostsStoreProps {
  state: PostsState,
  actions: PostsActions
}

export const usePostsStore = create<PostsStoreProps>((set, get, actions) => ({
  state: {
    selectedPost: null,
    posts: [],
    postVotes: []
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
    getCommunityPostsVotesStore: async (communityId: string, user: User) => {
      if (!communityId) return
      const postVotesQuery = query(
        collection(firestore, 'users', `${user.uid}/postVotes`),
        where('communityId', '==', communityId))

      const postVotesDocs = await getDocs(postVotesQuery)
      const postVotes = postVotesDocs.docs.map(doc => ({
        id: doc.id, ...doc.data()
      }))

      set((prev) => ({
        ...prev,
        state: {
          ...prev.state,
          postVotes: postVotes as PostVote[]
        }
      }))
    },
    getCommunityPostVoteStore: async (user: User, postId: string) => {
      const postVotesCollectionRef = collection(firestore, 'users', user.uid, 'postVotes');
      const postVotesQuery = query(postVotesCollectionRef, where('postId', '==', postId));
      const postVotesResult = await getDocs(postVotesQuery);

      const postVote: PostVote[] = []

      postVotesResult.forEach((doc) => {
        postVote.push(doc.data() as PostVote);
      });

      set(prev => ({
        ...prev,
        state: {
          ...prev.state,
          postVotes: postVote
        }
      }))
    },
    updatePostComments: (amount: number) => {
      set(prev => ({
        ...prev,
        state: {
          ...prev.state,
          selectedPost: {
            ...prev.state.selectedPost as Post,
            numberOfComments: prev.state.selectedPost!.numberOfComments + amount
          }
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
    onSelectPost: (post: Post) => {
      set(prev => ({
        ...prev,
        state: {
          ...prev.state,
          selectedPost: post
        }
      }))
    },
    onVote: async (post: Post, vote: number, communityId: string, user: User) => {
      // ? Check for a user => if not, open auth modal

      try {
        const { voteStatus } = post
        const existingVote = get().state.postVotes.find(vote => vote.postId === post.id)

        console.log(existingVote)

        const batch = writeBatch(firestore)
        const updatedPost: Post = { ...post }
        const updatedPosts = [...get().state.posts]
        let updatedPostVotes: PostVote[] = [...get().state.postVotes]
        let voteChange = vote

        // * New Vote
        if (!existingVote) {
          // ? Create a new postVote document
          const postVoteRef = doc(collection(firestore, 'users', `${user.uid}/postVotes`))

          const newVote: PostVote = {
            id: postVoteRef.id,
            postId: post.id!,
            communityId,
            voteValue: vote
          }

          batch.set(postVoteRef, newVote)

          // ? Add/subtract 1 to/from post.voteStatus
          updatedPost.voteStatus = voteStatus + vote
          // eslint-disable-next-line no-unused-vars
          updatedPostVotes = [...updatedPostVotes, newVote]

          // ? existing vote - They have vote on the post before
        } else {
          const postVoteRef = doc(firestore, 'users', `${user.uid}/postVotes/${existingVote.id}`)

          // ? Removing their vote (up => neutral OR down => neutral)
          if (existingVote.voteValue === vote) {
            // ? Add/Subtract 1 to/from post.voteStatus
            updatedPost.voteStatus = voteStatus - vote
            // eslint-disable-next-line no-unused-vars
            updatedPostVotes = updatedPostVotes.filter(vote => vote.id !== existingVote.id)

            // ? delete the post document
            batch.delete(postVoteRef)

            // eslint-disable-next-line no-unused-vars
            voteChange *= -1;
            // ? Flipping their vote (up => down OR down => up)
          } else {
            // ? Add/Subtract 2 to/from post.voteStatus
            updatedPost.voteStatus = voteStatus + 2 * vote

            const voteIndex = get().state.postVotes.findIndex(vote => vote.id === existingVote.id)

            updatedPostVotes[voteIndex] = {
              ...existingVote,
              voteValue: vote
            }

            // ? Updating the existing postVote document
            batch.update(postVoteRef, {
              voteValue: vote
            })

            // eslint-disable-next-line no-unused-vars
            voteChange = 2 * vote
          }
        }

        // ? Update post document
        const postRef = doc(firestore, 'posts', post.id!)
        batch.update(postRef, { voteStatus: voteStatus + voteChange })

        await batch.commit()

        // ? Update state with updated values
        const postIndex = get().state.posts.findIndex(item => item.id === post.id)
        updatedPosts[postIndex] = updatedPost

        set((prev) => ({
          ...prev,
          state: {
            ...prev.state,
            posts: updatedPosts,
            postVotes: updatedPostVotes
          }
        }))

        if (get().state.selectedPost) {
          set((prev) => ({
            ...prev,
            state: {
              ...prev.state,
              selectedPost: updatedPost
            }
          }))
        }

      } catch (error) {
        console.log('onVote error', error)
      }

    },
    clearPostVotesStore: () => {
      set((prev) => ({
        ...prev,
        state: {
          ...prev.state,
          postVotes: []
        }
      }))
    },
    changePostVotes: (postVotes: PostVote[]) => {
      set((prev) => ({
        ...prev,
        state: {
          ...prev.state,
          postVotes
        }
      }))
    }
  }
}))
