'use client'

import { DoubleArrowUpIcon } from '@radix-ui/react-icons'
import { useEffect, useState } from 'react'

export const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  function handleScroll() {
    setIsVisible(window.scrollY > 300)
  }

  function handleClick() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  return (
    <>
      {isVisible && (
        <button
          onClick={handleClick}
          className="
            flex justify-center items-center 
            fixed bottom-6 right-6 
            w-12 h-12 rounded-full 
            bg-brand-100 z-20 
            border-2 border-orange-600
            hover:bg-opacity-80 hover:border-opacity-80
            transition-all duration-300 ease-in-out
          "
        >
          <DoubleArrowUpIcon className="text-gray-100" />
        </button>
      )}
    </>
  )
}