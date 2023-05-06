import { Post } from '@/@types/Post'
import { User } from 'firebase/auth'
import { HTMLAttributes, useCallback, useEffect, useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { CommentInput } from './CommentInput'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { firestore } from '@/libs/firebase/clientApp'
import { Timestamp, collection, doc, getDocs, increment, orderBy, query, serverTimestamp, where, writeBatch } from 'firebase/firestore'
import { Comment } from '@/@types/Comment'
import { useAuthModalStore } from '@/store/modal/useAuthModalStore'
import { getUserFromEmail } from '@/utils/get-user-from-email'
import { usePostsStore } from '@/store/post/usePostsStore'
import { CommentItem } from './CommentItem'
import { CommentsSkeleton } from '@/components/skeletons/CommentsSkeleton'

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
  const [isFetchingComments, setIsFetchingComments] = useState(false);

  const [commentDeletingId, setCommentDeletingId] = useState('');

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

      newComment.createdAt = { seconds: Date.now() / 1000 } as Timestamp

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
    try {
      setCommentDeletingId(comment.id)
      const batch = writeBatch(firestore)

      // ? Delete a comment document
      const commentDocRef = doc(firestore, 'comments', comment.id)
      batch.delete(commentDocRef)

      // ? update post numberOfComments - 1
      const postDocRef = doc(firestore, 'posts', selectedPost?.id!)
      batch.update(postDocRef, {
        numberOfComments: increment(-1)
      })

      await batch.commit()

      // ? update client state
      setPostComments(prev => prev.filter(item => item.id !== comment.id))
      updatePostComments(-1)

    } catch (error) {
      console.log('handleDeleteComment error', error)
    } finally {
      setCommentDeletingId('')
    }
  }

  const getPostComments = useCallback(
    async () => {
      if (!selectedPost) return
      try {
        setIsFetchingComments(true)
        const commentsQuery = query(collection(firestore, 'comments'),
          where('postId', '==', selectedPost.id),
          orderBy('createdAt', 'desc')
        )

        const commentDocs = await getDocs(commentsQuery)
        const comments = commentDocs.docs.map(doc => ({
          id: doc.id, ...doc.data()
        }))

        setPostComments(comments as Comment[])

      } catch (error) {
        console.log('getPostComments error', error)
      } finally {
        setIsFetchingComments(false)
      }
    },
    [selectedPost]
  )

  useEffect(() => {
    getPostComments()
  }, [getPostComments])

  return (
    <div
      {...props}
      className={`
        bg-white rounded-bl rounded-br p-2
        ${props.className}
        `}>
      <form className="flex flex-col pl-2.5 pr-4 mb-6 text-xs w-full" onSubmit={handleSubmit(handleCreateComment)}>
        {!isFetchingComments && (
          <FormProvider {...commentForm}>
            <CommentInput user={user} />
          </FormProvider>
        )}
      </form>
      <div className="flex flex-col gap-6 p-2">
        {isFetchingComments ? (
          [1, 2, 3].map(item => <CommentsSkeleton key={item} />)
        ) : (
          postComments.length === 0 ? (
            <>
              <div className="flex flex-col justify-center items-center border-t border-t-gray-100 p-20">
                <p className='font-bold opacity-30'>No Comments yet</p>
              </div>
            </>
          ) : (
            postComments.map(comment => (
              <CommentItem
                key={comment.id}
                comment={comment}
                handleDeleteComment={handleDeleteComment}
                isDeleting={commentDeletingId === comment.id}
                userId={user?.uid}
              />
            ))
          )
        )}
      </div>
    </div>
  )
}
