import React, { HTMLAttributes, ReactNode } from 'react'

interface IPageContent extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode[]
}

export const PageContent = ({ children, ...props }: IPageContent) => {
  return (
    <div {...props} className={`flex justify-center py-4  ${props.className}`}>
      <div className="flex w-11/12 justify-center max-w-4xl md:gap-6 ">
        <div className="flex w-full md:w-8/12 flex-col">
          {children[0]}
        </div>
        <div className="hidden md:flex flex-grow">
          {children[1]}
        </div>
      </div>
    </div>
  )
}
