import React, { HTMLAttributes } from 'react'

import { MdOutlineError } from 'react-icons/md'
import { BsCheckCircleFill, BsFillInfoCircleFill } from 'react-icons/bs'

interface IAlertError extends HTMLAttributes<HTMLDivElement> {
  status: 'error' | 'success' | 'warning' | 'info'
  textLabel: string
}

export const AlertError = ({ status, textLabel, ...props }: IAlertError) => {
  return (
    <div
      {...props}
      className={`
        w-full gap-2 p-3 flex items-center 
        ${status === 'error' && 'bg-red-300'}
        ${status === 'success' && 'bg-green-300'}
        ${status === 'warning' && 'bg-orange-200'}
        ${status === 'info' && 'bg-blue-300'}
        ${props.className}`
      }
    >
      {status === 'error' && <MdOutlineError size={28} className='text-red-600' />}
      {status === 'success' && <BsCheckCircleFill size={28} className='text-emerald-700' />}
      {status === 'warning' && <MdOutlineError size={28} className='text-orange-600' />}
      {status === 'info' && <BsFillInfoCircleFill size={28} className='text-blue-700' />}
      <span className='font-medium text-sm'>{textLabel}</span>
    </div>
  )
}
