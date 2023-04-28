import { User } from 'firebase/auth'
import React, { HTMLAttributes } from 'react'

import { useFormContext } from 'react-hook-form'
import { CommentFormInputs } from '.'
import { ButtonRef } from '@/components/ButtonRef'
import { AuthButtons } from '@/components/partials/NavBar/AuthButtons'
import { getUserFromEmail } from '@/utils/get-user-from-email'

interface ICommentInput extends HTMLAttributes<HTMLDivElement> {
  user?: User | null
}

export const CommentInput = ({ user, ...props }: ICommentInput) => {
  const { register, formState: { isSubmitting } } = useFormContext<CommentFormInputs>()
  return (
    <div
      className={`
        flex flex-col relative
        ${props.className}`
      }
    >
      {user ? (
        <>
          <p>Comment as {" "} <span className='text-down-200 mb-2'>{getUserFromEmail(user.email!)}</span></p>
          <textarea
            {...register('comment')}
            placeholder="What are your thoughts?"
            className='
              text-xs rounded 
              min-h-[160px] 
              pb-10 px-4 pt-2 
              border border-gray-300
              placeholder:text-gray-500
              hover:border-gray-500
              focus:outline-none focus:bg-white focus:border-black
            '
          />
          <div
            className="
              flex justify-end
              absolute left-1 right-[1px] bottom-[1px]
              bg-gray-100 py-1.5 px-2
              rounded-bl rounded-br
            "
          >
            <ButtonRef
              submittingText='Sending Comment'
              type='submit'
              className='h-7'
              disabled={isSubmitting}
            >
              Comment
            </ButtonRef>
          </div>
        </>
      ) : (
        <>
          <div className="flex items-center justify-between rounded-lg border border=gray-100 p-4">
            <p className='font-semibold'>Log in or sign up to leave a comment</p>
            <AuthButtons />
          </div>
        </>
      )}
    </div>
  )
}
