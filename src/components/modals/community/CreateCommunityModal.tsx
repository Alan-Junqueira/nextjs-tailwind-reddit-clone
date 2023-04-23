import { Button } from '@/components/Button';
import { ButtonRef } from '@/components/ButtonRef';
import * as Dialog from '@radix-ui/react-dialog';
import { GrAdd } from 'react-icons/gr';

interface ICreateCommunityModal extends Dialog.DialogProps {
}


export const CreateCommunityModal = ({ ...props }: ICreateCommunityModal) => {
  return (
    <Dialog.Root {...props}>
      <Dialog.Trigger
        className='flex w-full items-center gap-2 px-3 py-2  hover:bg-gray-200/50 bg-gray-100/80'
      >
        <GrAdd className='font-medium text-lg' />
        <span className='text-xs font-bold text-gray-800/90'>Create Community</span>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay
          className='data-[state=open]:animate-overlayShow fixed inset-0 bg-black/30' />
        <Dialog.Content
          className='
            data-[state=open]:animate-contentShow 
            fixed top-[30%] left-[50%] translate-x-[-50%] translate-y-[-50%]
            max-h-[85vh] w-[90vw] max-w-[450px] 
            rounded-[6px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none p-6
            bg-white/90
          '
        >
          teste
          <Dialog.Title />
          <Dialog.Description />
          <div className="mt-[25px] flex gap-2 justify-end">
            <Dialog.Close asChild>
              <ButtonRef className='py-1' variant='outline'>
                Cancel
              </ButtonRef>
            </Dialog.Close>
            <Dialog.Close asChild>
              <ButtonRef className='py-2'>
                Create Community
              </ButtonRef>
            </Dialog.Close>
          </div>
          <Dialog.Close className='absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:outline-none' aria-label="Close">X</Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
