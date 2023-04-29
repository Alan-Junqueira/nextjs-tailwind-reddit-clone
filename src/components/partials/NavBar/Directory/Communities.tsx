import { CreateCommunityModal } from '@/components/modals/community/CreateCommunityModal'
import { useCommunityStore } from '@/store/community/useCommunityStore'
import { MenuListItem } from './MenuListItem'
import { FaReddit } from 'react-icons/fa'

export const Communities = () => {
  const { state: { mySnippets } } = useCommunityStore()

  return (
    <>
      <div className='mt-3'>
        <p className='pl-3 text-[8px] font-medium text-gray-500'>MODERATING</p>
      </div>
      {mySnippets.filter(snippet => snippet.isModerator).map(snippet => (
        <MenuListItem
          key={snippet.communityId}
          icon={() => <FaReddit size={18} className='text-brand-100' />}
          displayText={`r/${snippet.communityId}`}
          communityLink={`/r/${snippet.communityId}`}
          imageUrl={snippet.imageUrl}
        />
      ))}
      <div className='mt-3'>
        <p className='pl-3 text-[8px] font-medium text-gray-500'>MY COMMUNITIES</p>
      </div>
      <CreateCommunityModal />
      {mySnippets.map(snippet => (
        <MenuListItem
          key={snippet.communityId}
          icon={() => <FaReddit size={18} className='text-blue-500' />}
          displayText={`r/${snippet.communityId}`}
          communityLink={`/r/${snippet.communityId}`}
          imageUrl={snippet.imageUrl}
        />
      ))}
    </>
  )
}
