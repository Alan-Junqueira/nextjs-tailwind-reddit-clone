import { Post } from '@/@types/Post'
import { User } from 'firebase/auth'
import React, { HTMLAttributes, useEffect, useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { CommentInput } from './CommentInput'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, firestore } from '@/firebase/clientApp'
import { Timestamp, collection, doc, increment, serverTimestamp, writeBatch } from 'firebase/firestore'
import { Comment } from '@/@types/Comment'
import { useAuthModalStore } from '@/store/modal/useAuthModalStore'
import { getUserFromEmail } from '@/utils/get-user-from-email'
import { usePostsStore } from '@/store/post/usePostsStore'

const commentFormSchema = z.object({
  comment: z.string()
})

export type CommentFormInputs = z.infer<typeof commentFormSchema>

interface IComments extends HTMLAttributes<HTMLDivElement> {
  user?: User | null
  selectedPost: Post | null
  communityId: string
}

export const Comments = ({ communityId, selectedPost, user, ...props }: IComments) => {
  const [postComments, setPostComments] = useState<Comment[]>([]);
  const { actions: { updatePostComments } } = usePostsStore()

  const { actions: { openModal } } = useAuthModalStore()

  const commentForm = useForm<CommentFormInputs>({
    resolver: zodResolver(commentFormSchema)
  })

  const { handleSubmit, reset } = commentForm

  const handleCreateComment = async (data: CommentFormInputs) => {
    if (!user) {
      openModal('login')
      return
    }
    const { comment } = data
    try {
      const batch = writeBatch(firestore)

      // ? Create a comment document
      const commentDocRef = doc(collection(firestore, 'comments'))

      const newComment: Comment = {
        id: commentDocRef.id,
        creatorId: user.uid,
        creatorDisplayText: getUserFromEmail(user.email!),
        communityId,
        postId: selectedPost?.id!,
        postTitle: selectedPost?.title!,
        text: comment,
        createdAt: serverTimestamp() as Timestamp
      }

      batch.set(commentDocRef, newComment)

      // ? update post numberOfComments + 1
      const postDocRef = doc(firestore, 'posts', selectedPost?.id!)
      batch.update(postDocRef, {
        numberOfComments: increment(1)
      })

      await batch.commit()

      // ? update client state
      reset()

      setPostComments(prev => [newComment, ...prev])
      updatePostComments(1)
    } catch (error) {
      console.log('handleCreateComment error', error)
    }
  }

  const handleDeleteComment = async (comment: Comment) => {
    // ? Delete a comment document
    // ? update post numberOfComments + 1

    // ? update client state
  }

  const getPostComments = async () => { }

  useEffect(() => {
    getPostComments()
  })

  return (
    <div
      {...props}
      className={`
        bg-white rounded-bl rounded-br p-2
        ${props.className}
        `}>
      <form className="flex flex-col pl-2.5 pr-4 mb-6 text-xs w-full" onSubmit={handleSubmit(handleCreateComment)}>
        <FormProvider {...commentForm}>
          <CommentInput user={user} />
        </FormProvider>
      </form>
    </div>
  )
}
