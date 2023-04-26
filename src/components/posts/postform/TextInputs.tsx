import { Button } from '@/components/Button'
import { InputRef } from '@/components/InputRef'
import React, { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { NewPostFormInputs } from '../NewPostForm'
import { ButtonRef } from '@/components/ButtonRef'

export const TextInputs = () => {
  const { register, formState: { isSubmitting, errors }, setFocus, getValues } = useFormContext<NewPostFormInputs>()

  useEffect(() => { setFocus('title') }, [setFocus])

  return (
    <div className='flex flex-col gap-3 w-full'>
      <InputRef
        className='
          rounded text-xs py-2 px-4
          border border-gray-300
          focus:outline-none focus:border-black focus:bg-white
          hover:border-blue-500
          placeholder:text-gray-500
        '
        placeholder='Title'
        {...register('title')}
      />
      <textarea
        className='
          rounded text-xs py-2 px-4
          border border-gray-300 h-24
          focus:outline-none focus:border-black focus:bg-white
          hover:border-blue-500
          placeholder:text-gray-500
        '
        placeholder='Text (optional)'
        rows={5}
        {...register('textBody')}
      />
      <div className="flex justify-end">
        <ButtonRef
          submittingText='Posting'
          type='submit'
          className=' h-9 px-8'
          disabled={isSubmitting}
        >
          Post
        </ButtonRef>
      </div>
    </div>
  )
}
