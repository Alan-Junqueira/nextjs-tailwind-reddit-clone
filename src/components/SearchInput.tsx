import React, { HTMLAttributes } from 'react'
import { Input } from './Input'
import { AiOutlineSearch } from 'react-icons/ai'
import { User } from 'firebase/auth'

interface ISearchInput extends HTMLAttributes<HTMLDivElement> {
  user?: User | null
}

export const SearchInput = ({ user, ...props }: ISearchInput) => {
  return (
    <div {...props} className={`${props.className} ml-2 md:ml-0 flex flex-1 items-center justify-center grow mr-2`}>
      <div className={`relative w-full ${!user && 'max-w-xl'}`}>
        <Input
          iconLeft={() => (
            <AiOutlineSearch className="text-gray-400 bg-gray-50 absolute left-1 top-2.5" />
          )}
          placeholder="Search Reddit"
          className={`
          text-xs bg-gray-50 text-gray-700 
          h-9 rounded-lg px-6 border-[1px] 
          placeholder:text-gray-500 
          hover:bg-white hover:border[1px] 
          hover:border-blue-500 
          focus:outline-none focus:border-[1px] focus:border-blue-500 
          `}
        />
      </div>
    </div>
  )
}
