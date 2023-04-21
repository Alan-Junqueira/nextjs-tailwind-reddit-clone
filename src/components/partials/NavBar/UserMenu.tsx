import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { User, signOut } from 'firebase/auth';
import { FiChevronDown } from 'react-icons/fi'
import { FaRedditSquare } from 'react-icons/fa'
import { VscAccount } from 'react-icons/vsc'
import { IoSparkles } from 'react-icons/io5'
import { CgProfile } from 'react-icons/cg'
import { MdOutlineLogin } from 'react-icons/md'
import { RadixDropdownIconText } from '@/components/RadixDropdownIconText';
import { auth } from '@/firebase/clientApp';
import { useAuthModalStore } from '@/store/modal/useAuthModalStore';

interface IUserMenu extends DropdownMenu.DropdownMenuProps {
  user?: User | null
}

export const UserMenu = ({ user, ...props }: IUserMenu) => {
  const { actions: { openModal } } = useAuthModalStore()
  return (
    <DropdownMenu.Root {...props}>
      <DropdownMenu.Trigger
        className='
          flex items-center gap-1 cursor-pointer rounded px-[6px]
          hover:outline-1 hover:outline hover:outline-gray-200
        '
      >
        {user ? (
          <FaRedditSquare size={24} className='text-gray-300' />
        ) : (
          <VscAccount size={24} className='text-gray-400' />
        )}
        <FiChevronDown size={14} className='text-gray-800' />
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal className='h-fit'>
        <DropdownMenu.Content className='py-2 flex flex-col gap-1 bg-white border border-gray-200 mt-2 rounded-md w-52'>
          {user ? (
            <>
              <RadixDropdownIconText separator className='px-3 py-1 w-full'>
                <CgProfile className='font-medium text-xl' /> <span className='text-xs font-bold'>Profile</span>
              </RadixDropdownIconText>
              <RadixDropdownIconText className='px-3 py-1' onClick={() => signOut(auth)} >
                <MdOutlineLogin className='font-medium text-xl' /> <span className='text-xs font-bold'>Log Out</span>
              </RadixDropdownIconText>
            </>
          ) : (
            <>
              <RadixDropdownIconText className='px-3 py-1' onClick={() => openModal('login')} >
                <MdOutlineLogin className='font-medium text-xl' /> <span className='text-xs font-bold'>Log In / Sign Up</span>
              </RadixDropdownIconText>
            </>
          )}

        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
