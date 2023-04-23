import React, { HTMLAttributes, ReactNode } from 'react'

interface IIconsContainer extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

export const IconContainer = ({ children, ...props }: IIconsContainer) => {
  return (
    <div {...props} className={`p-1 cursor-pointer rounded-md transition-all ease-in duration-200 hover:bg-gray-200 ${props.className}`}>{children}</div>
  )
}
