import React from 'react'
import { Input } from './Input'
import { AiOutlineSearch } from 'react-icons/ai'

interface ISearchInput {
  // user: string
}

export const SearchInput = () => {
  return (
    <div className="flex items-center grow mr-2 gap-2 relative">
      <Input
        iconLeft={() => (
          <AiOutlineSearch className="text-gray-400 bg-gray-50 absolute left-1" />
        )}
        placeholder="Search Reddit"
        className="
          text-xs 
          h-9 rounded-lg px-6 border-[1px]
          placeholder:text-gray-500
          hover:bg-white hover:border-[1px] hover:border-blue-500
          focus:outline-none focus:border-[1px] focus:border-blue-500
        "
      />
    </div>
  )
}
