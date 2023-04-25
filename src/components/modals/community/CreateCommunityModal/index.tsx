import { ButtonRef } from '@/components/ButtonRef';
import { InputContainer } from '@/components/InputContainer';
import { InputRef } from '@/components/InputRef';
import { zodResolver } from '@hookform/resolvers/zod';
import * as Dialog from '@radix-ui/react-dialog';

import { useEffect, useRef } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { GrAdd } from 'react-icons/gr';
import { z } from 'zod';

import { AiOutlineClose } from 'react-icons/ai'
import { CheckBox } from './CheckBox';
import { doc, runTransaction, serverTimestamp } from 'firebase/firestore';
import { auth, firestore } from '@/firebase/clientApp';
import { useAuthState } from 'react-firebase-hooks/auth';

interface ICreateCommunityModal extends Dialog.DialogProps {
}

const communityFormSchema = z.object({
  communityName: z.string()
    .min(3, { message: "Community names must be between 3-21 characters" })
    .refine((value) => !/[ `!@#$%^&*()+\-=[\]{};':"\\|,.<>/?~]/.test(value), {
      message: 'Community names must only contain letters, numbers, or underscores.'
    }),
  communityType: z.enum(['private', 'public', 'restricted'])
})

type CommunityFormInputs = z.infer<typeof communityFormSchema>

export const CreateCommunityModal = ({ ...props }: ICreateCommunityModal) => {
  const [user] = useAuthState(auth)

  const createCommunityForm = useForm<CommunityFormInputs>({
    resolver: zodResolver(communityFormSchema),
    defaultValues: {
      communityType: 'public'
    }
  })
  const { register, handleSubmit, formState: { isSubmitting, errors }, watch, setFocus, setError } = createCommunityForm

  const communityDigits = watch().communityName
  const MAX_COMMUNITY_DIGITS = 21

  const closeButton = useRef<HTMLButtonElement | null>(null)

  const handleCreateCommunity = async (data: CommunityFormInputs) => {
    try {
      const { communityName, communityType } = data

      //* firestore database instanced --> collection --> id dentro da collection(communityName é único)
      const communityDocRef = doc(firestore, 'communities', communityName)

      await runTransaction(firestore, async (transaction) => {
        const communityDoc = await transaction.get(communityDocRef)

        // ? Check if community exists in db
        if (communityDoc.exists()) {
          setError('communityName', { message: `Sorry, r/${communityName} is taken. Try another` })
          return
        }

        //* setDoc --> Create a new document or edit an existing one
        transaction.set(communityDocRef, {
          creatorId: user?.uid,
          createdAt: serverTimestamp(),
          numberOfMembers: 1,
          privacyType: communityType
        })

        // ? Create communitySnippet(sub collection) on user
        transaction.set(doc(firestore, `users/${user?.uid}/communitySnippets`, communityName), {
          communityId: communityName,
          isModerator: true
        })

        closeButton.current?.click()
      })
    } catch (error: any) {
      console.log('handleCreateCommunity error', error)
      setError('root', error.message)
    }
  }

  useEffect(() => { setFocus('communityName') }, [setFocus])
  return (
    <Dialog.Root {...props} >
      <Dialog.Trigger
        className='flex w-full items-center gap-2 px-3 py-2  hover:bg-gray-200/50 bg-gray-100/80 outline-gray-300/50'
      >
        <GrAdd className='font-medium text-lg' />
        <span className='text-xs font-bold text-gray-800/90'>Create Community</span>
      </Dialog.Trigger>
      <Dialog.Portal >
        <Dialog.Overlay
          className='data-[state=open]:animate-overlayShow fixed inset-0 bg-black/30' />
        <Dialog.Content
          className='
            data-[state=open]:animate-contentShow 
            fixed top-[40%] left-[50%] translate-x-[-50%] translate-y-[-50%]
            max-h-[85vh] w-[90vw] max-w-[450px] 
            rounded-[6px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none pt-3
            bg-white overflow-hidden
            '
          asChild
        >
          <form onSubmit={handleSubmit(handleCreateCommunity)}>
            <Dialog.Title className='text-sm font-bold pb-2 mb-3 border-b border-b-gray-300/50 px-2'>Create a community</Dialog.Title>
            <div className='py-3 flex flex-col px-2'>
              <Dialog.Description className='font-semibold text-sm'>Name</Dialog.Description>
              <Dialog.Description className='text-xs text-gray-500'>
                Community names including capitalization cannot be changed
              </Dialog.Description>
              <InputContainer className='mt-5'>
                <Dialog.Description className='absolute left-2 top-1.5 text-gray-400'>r/</Dialog.Description>
                <InputRef
                  {...register('communityName')}
                  className='px-6 outline-none rounded border border-gray-300/50 border-solid text-sm py-2'
                  maxLength={MAX_COMMUNITY_DIGITS}
                />
                <Dialog.Description
                  className={`
                  ${communityDigits && MAX_COMMUNITY_DIGITS - communityDigits.length === 0 ? 'text-red-600' : 'text-gray-500'}
                  text-xs -mt-1
                `}>
                  {communityDigits ? MAX_COMMUNITY_DIGITS - communityDigits.length : MAX_COMMUNITY_DIGITS}{' '}
                  Characters remaining
                </Dialog.Description>
                <Dialog.Description className='text-xs text-red-600 -mt-1'>{errors.communityName?.message}</Dialog.Description>
              </InputContainer>
              <div className='my-4'>
                <Dialog.Description className='font-semibold text-base'>Community Type</Dialog.Description>
                <FormProvider {...createCommunityForm}>
                  <CheckBox />
                </FormProvider>

              </div>
            </div>
            <div className="mt-[25px] flex gap-3 justify-end bg-gray-100 p-4">
              <Dialog.Close asChild>
                <ButtonRef className='h-7' variant='outline' submittingText="canceling">
                  Cancel
                </ButtonRef>
              </Dialog.Close>
              <ButtonRef className='h-7' type='submit' disabled={isSubmitting} submittingText="creating">
                Create Community
              </ButtonRef>
            </div>
            <Dialog.Close className="
              text-gray-900 
              absolute top-[10px] right-[10px] 
              h-[30px] w-[30px] 
              appearance-none 
              flex items-center justify-center 
              rounded-lg
              hover:bg-gray-300
              border-[1px] border-solid
              focus:border-blue-500
              outline-none
              " aria-label="Close"
              ref={closeButton}
            >
              <AiOutlineClose />
            </Dialog.Close>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root >
  )
}
