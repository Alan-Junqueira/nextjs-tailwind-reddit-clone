import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { FiChevronDown } from 'react-icons/fi';
import { TiHome } from 'react-icons/ti';
import { Communities } from './Communities';
import { useParams } from 'next/navigation';
import { useCommunityStore } from '@/store/community/useCommunityStore';
import { useLayoutEffect, useState } from 'react';
import { CommunitySnippet } from '@/@types/CommunitySnippet';
import Image from 'next/image';
import { FaReddit } from 'react-icons/fa';
import { useDirectoryMenuStore } from '@/store/directory/useDirectoryMenu';

interface IDirectory extends DropdownMenu.DropdownMenuProps {
}

export const Directory = ({ ...props }: IDirectory) => {
  const [actualSnippet, setActualSnippet] = useState<CommunitySnippet>({} as CommunitySnippet);
  const { state: { directoryOpen }, actions: { toggleDirectory, closeDirectory } } = useDirectoryMenuStore()

  const { communityId } = useParams()

  const { state: { mySnippets } } = useCommunityStore()

  useLayoutEffect(() => {
    if (mySnippets) {
      const snippet = {
        communityId,
        isModerator: false,
        imageUrl: ''
      }
      const snippetFiltered: CommunitySnippet[] = mySnippets.filter(snippet => snippet.communityId === communityId)

      if (snippetFiltered[0]?.isModerator) {
        snippet.isModerator = snippetFiltered[0].isModerator
      }

      if (snippetFiltered[0]?.imageUrl) {
        snippet.imageUrl = snippetFiltered[0].imageUrl
      }

      setActualSnippet(snippet)
    }
  }, [communityId, mySnippets])

  return (
    <DropdownMenu.Root {...props} open={directoryOpen} modal={false}>
      <DropdownMenu.Trigger
        className='
          flex items-center gap-1 
          cursor-pointer rounded px-[6px] 
          mr-2 md:ml-2
          hover:outline-1 hover:outline hover:outline-gray-200 focus:outline-gray-200
          w-auto lg:w-52
        '
        onClick={toggleDirectory}
      >
        {actualSnippet.imageUrl ? (
          <Image
            src={actualSnippet.imageUrl}
            alt={actualSnippet.communityId}
            width={24}
            height={24}
            className='rounded-full md:mr-1'
          />
        ) : (
          communityId ? (

            <FaReddit size={24} className={`md:mr-1 ${actualSnippet.isModerator ? 'text-brand-100' : 'text-blue-500'}`} />
          ) :
            (
              <TiHome size={24} className='text-black md:mr-1' />
            )
        )}
        <p className='hidden lg:flex font-semibold text-xs'>
          {communityId || 'Home'}
        </p>
        <FiChevronDown size={14} className='text-gray-800' />
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal className='h-fit' >
        <DropdownMenu.Content
          className='py-2 flex flex-col gap-1 bg-white border border-gray-200 mt-2 rounded-md w-52 max-h-96 overflow-y-scroll'
          onEscapeKeyDown={closeDirectory}
          onPointerDownOutside={closeDirectory}
          onInteractOutside={closeDirectory}
        >
          <Communities />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
