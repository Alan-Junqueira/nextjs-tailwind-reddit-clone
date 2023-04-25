import * as RadioGroup from '@radix-ui/react-radio-group';
import { CheckIcon } from '@radix-ui/react-icons';
import { useFormContext, Controller } from 'react-hook-form'

import { BsFillEyeFill, BsFillPersonFill } from 'react-icons/bs'
import { HiLockClosed } from 'react-icons/hi'

export const CheckBox = () => {
  const { register, control, watch } = useFormContext()
  return (
    <Controller
      control={control}
      name="communityType"
      render={({ field }) => {
        return (
          <RadioGroup.Root
            onValueChange={field.onChange}
            value={field.value}
            defaultValue="public"
            className='flex flex-col gap-2'
          >
            <RadioGroup.Item
              className="flex items-center gap-2 focus:outline-gray-200"
              value='public'
              {...register('communityType')}
            >
              <div className='bg-white w-5 h-5 relative rounded border border-gray-300 overflow-hidden'>
                {watch().communityType === 'public' && (
                  <CheckIcon className='w-full h-full absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] bg-blue-500 text-white/80' />
                )
                }
              </div>
              <BsFillPersonFill className='text-gray-500' />
              <span className='text-xs'>Public</span>
              <p
                className='text-start text-[10px] pt-1 text-gray-500'>
                Anyone can view, post, and comment to this community
              </p>
            </RadioGroup.Item>
            <RadioGroup.Item
              className="flex items-center gap-2 focus:outline-gray-200"
              value='restricted'
              {...register('communityType')}
            >
              <div className='bg-white w-5 h-5 relative rounded border border-gray-300 overflow-hidden'>
                {watch().communityType === 'restricted' && (
                  <CheckIcon className='w-full h-full absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] bg-blue-500 text-white/80' />
                )
                }
              </div>
              <BsFillEyeFill className='text-gray-500' />
              <span className='text-xs'>Restricted</span>
              <p
                className='text-start text-[10px] pt-1 text-gray-500'>
                Anyone can view this community, but only approved users can post
              </p>
            </RadioGroup.Item>
            <RadioGroup.Item
              className="flex items-center gap-2 focus:outline-gray-200"
              value='private'
              {...register('communityType')}
            >
              <div className='bg-white w-5 h-5 relative rounded border border-gray-300 overflow-hidden'>
                {watch().communityType === 'private' && (
                  <CheckIcon className='w-full h-full absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] bg-blue-500 text-white/80' />
                )
                }
              </div>
              <HiLockClosed className='text-gray-500' />
              <span className='text-xs'>Private</span>
              <p
                className='text-start text-[10px] pt-1 text-gray-500'>
                Only approved users can view and submit to this community
              </p>
            </RadioGroup.Item>
          </RadioGroup.Root>
        )
      }}
    />
  )
}
