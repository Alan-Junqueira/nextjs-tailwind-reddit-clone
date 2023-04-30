import { GiCheckedShield} from 'react-icons/gi'
import { Button } from '../Button'

export const Premium = () => {
  return (
    <div className='flex flex-col bg-white rounded cursor-pointer p-3 border border-gray-300'>
      <div className="flex mb-2 gap-1">
        <GiCheckedShield size={26} className='text-brand-100 mt-2'/>
        <div className="flex gap-1 text-[10px]">
          <span className='font-semibold'>Reddit Premium</span>
          <p>The best Reddit experience, with monthly Coins</p>
        </div>
      </div>
      <Button className='h-7 bg-brand-100'>
        Try Now
      </Button>
    </div>
  )
}
