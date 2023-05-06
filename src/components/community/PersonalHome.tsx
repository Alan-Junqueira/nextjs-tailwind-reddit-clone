import { FaReddit } from 'react-icons/fa'
import { Button } from '../Button'

export const PersonalHome = () => {
  return (
    <div
      className='flex flex-col bg-white rounded border border-gray-300 sticky'
    >
      <div
        className="flex items-end text-white py-1.5 px-2.5 bg-blue-500 h-9 rounded-t font-semibold bg-personal-home bg-cover"
      />
      <div className="flex flex-col p-3">
        <div className="flex items-center mb-2">
          <FaReddit size={50} className='text-brand-100 mr-2' />
          <span className='font-semibold '></span>
        </div>
        <div className="flex flex-col gap-3">
          <p className='text[10px]'>Your personal Reddit frontpage, built for you.</p>
          <Button className='h-7'>Create post</Button>
          <Button variant="outline" className='h-7'>Create Community</Button>
        </div>
      </div>
    </div>
  )
}
