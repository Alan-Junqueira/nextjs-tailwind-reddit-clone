import React, { ReactNode, ButtonHTMLAttributes } from 'react'
import { Item, Separator } from '@radix-ui/react-dropdown-menu';

interface IRadixDropdownIconText extends ButtonHTMLAttributes<HTMLButtonElement> {
  separator?: boolean
  children: ReactNode[]
}

export const RadixDropdownIconText = ({ separator, children, className, ...props }: IRadixDropdownIconText) => {
  return (
    <>
      <Item className='hover:outline-0'>
        <button {...props} className={`w-full flex items-center gap-2 text-gray-900 hover:bg-blue-500 hover:text-white ${className}`}>
          {children.map((child) => child)}
        </button>
      </Item>
      {separator && <Separator className='h-[2px] bg-gray-100' />}
    </>
  )
}
