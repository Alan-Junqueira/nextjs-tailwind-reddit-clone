import { RadixDropdownIconText } from '@/components/RadixDropdownIconText';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { CgProfile } from 'react-icons/cg';
import { FiChevronDown } from 'react-icons/fi';
import { TiHome } from 'react-icons/ti';

interface IDirectory extends DropdownMenu.DropdownMenuProps {
}

export const Directory = ({ ...props }: IDirectory) => {
  return (
    <DropdownMenu.Root {...props}>
      <DropdownMenu.Trigger
        className='
          flex items-center gap-1 
          cursor-pointer rounded px-[6px] 
          mr-2 md:ml-2
          hover:outline-1 hover:outline hover:outline-gray-200 focus:outline-gray-200
          w-auto lg:w-52
        '
      >
        <TiHome size={24} className='md:mr-1' />
        <p className='hidden lg:flex font-semibold text-sm'>Home</p>
        <FiChevronDown size={14} className='text-gray-800' />
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal className='h-fit'>
        <DropdownMenu.Content className='py-2 flex flex-col gap-1 bg-white border border-gray-200 mt-2 rounded-md w-52'>
          {/* <Communities /> */}
          Communities
          {/* <RadixDropdownIconText className='px-3 py-1 w-full'>
            <CgProfile className='font-medium text-xl' /> <span className='text-xs font-bold'>Profile</span>
          </RadixDropdownIconText> */}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
