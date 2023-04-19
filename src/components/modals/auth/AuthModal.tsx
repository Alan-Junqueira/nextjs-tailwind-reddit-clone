'use client'

import { useAuthModalStore } from '@/store/modal/useAuthModalStore'
import { changeFirstLetterToUppercase } from '@/utils/change-first-letter-to-uppercase'
import * as Dialog from '@radix-ui/react-dialog'
import { useEffect } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { AuthInputs } from './AuthInputs'
import { OauthButtons } from './OauthButtons'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '@/firebase/clientApp'

export const AuthModal = () => {
  const [user, loading, error] = useAuthState(auth)
  const {
    actions: { closeModal },
    state: { open, view },
  } = useAuthModalStore()

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Escape') {
        closeModal()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [closeModal])

  useEffect(() => {
    if(user) closeModal()
    console.log(user)
  },[closeModal, user])

  const title = changeFirstLetterToUppercase(view)

  return (
    <Dialog.Root open={open && open}>
      <Dialog.Portal>
        <Dialog.Overlay
          className="
            data-[state=open]:animate-overlayShow 
            fixed inset-0 
            bg-black bg-opacity-70
          "
        />
        <Dialog.Content
          className="
            pb-6
            data-[state=open]:animate-contentShow
            fixed top-[40%] left-[50%] translate-x-[-50%] translate-y-[-50%] 
            max-h-[85vh] w-[90vw] max-w-[450px] 
            rounded-[6px] 
            bg-white p-[25px] 
            shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px]
            focus:outline-none
          "
        >
          <Dialog.Title className="font-bold text-lg text-center mb-6">
            {title}
          </Dialog.Title>
          <div className="flex flex-col items-center justify-center">
            <div
              className="
                flex flex-col items-center justify-center 
                w-9/12
                
              "
            >
              <OauthButtons />
              <p className="gray-500 font-bold">OR</p>
              <AuthInputs />
              {/* <ResetPassword /> */}
            </div>
          </div>
          <Dialog.Close
            onClick={closeModal}
            className="
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
            "
          >
            <AiOutlineClose size={15} />
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
