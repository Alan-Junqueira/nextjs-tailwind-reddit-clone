import React, { ButtonHTMLAttributes, ReactNode } from 'react'

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'solid' | 'outline' | 'oauth'
  size?: 'sm' | 'md'
  children: ReactNode
}

export const Button = ({ variant, size, children, ...props }: IButton) => {
  const buttonConfig = {
    sizes: {
      sm: 'text-2',
      md: 'text-[10px]',
    },
    variants: {
      solid: 'text-white bg-blue-500 hover:bg-blue-400',
      outline: 'text-blue-500 border-[1px] border-solid border-blue-500',
      oauth: 'h-9 border-[1px] border-solid border-gray-300 hover:bg-gray-50',
    },
  }

  return (
    <button
      {...props}
      className={`
      flex items-center justify-center
      gap-4
      rounded-[60px] text-xs font-bold
      transition-all ease-in duration-200
      py-3 px-4
      focus:shadow-none 
      ${size && buttonConfig.sizes[size]} 
      ${variant ? buttonConfig.variants[variant] : buttonConfig.variants.solid}
      ${props.className}
      `}
    >
      {children}
    </button>
  )
}