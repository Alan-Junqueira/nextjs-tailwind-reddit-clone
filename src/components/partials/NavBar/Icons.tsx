import { BsArrowUpRightCircle, BsChatDots } from 'react-icons/bs'
import { GrAdd } from 'react-icons/gr'
import { IoFilterCircleOutline, IoNotificationsOutline, IoVideocamOutline } from 'react-icons/io5'
import { IconContainer } from './IconContainer'

export const Icons = () => {
  return (
    <div className='flex'>
      <div className='hidden md:flex pr-[6px] items-center gap-[6px] border-r border-solid border-gray-200'>
        <IconContainer >
          <BsArrowUpRightCircle size={20} />
        </IconContainer>
        <IconContainer >
          <IoFilterCircleOutline size={22} />
        </IconContainer>
        <IconContainer >
          <IoVideocamOutline size={22} />
        </IconContainer>
      </div>
      <>
        <div className='flex pr-[6px] items-center gap-[6px]'>
          <IconContainer className='ml-[6px]'>
            <BsChatDots size={20} />
          </IconContainer>
          <IconContainer >
            <IoNotificationsOutline size={20} />
          </IconContainer>
          <IconContainer >
            <GrAdd size={20} />
          </IconContainer>
        </div>
      </>
    </div>
  )
}
