'use client'

import { useAuthModalStore } from '@/store/modal/useAuthModalStore'
import * as Dialog from '@radix-ui/react-dialog'
import { useEffect } from 'react'
import { AiOutlineClose } from 'react-icons/ai'

export const AuthModal = () => {
  const {
    actions: { closeModal },
    state: { open, view },
  } = useAuthModalStore()

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      console.log(e)
      if (e.code === 'Escape') {
        closeModal()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])
  return (
    <Dialog.Root open={open && open}>
      <Dialog.Trigger></Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="data-[state=open]:animate-overlayShow fixed inset-0 bg-black bg-opacity-70" />
        <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
          <Dialog.Title>Modal Title {view}</Dialog.Title>
          <Dialog.Description>Modal description</Dialog.Description>
          <Dialog.Close
            onClick={closeModal}
            className="text-gray-900 hover:bg-gray-300 absolute top-[10px] right-[10px] h-[25px] w-[25px] appearance-none flex items-center justify-center rounded-full"
          >
            <AiOutlineClose />
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
