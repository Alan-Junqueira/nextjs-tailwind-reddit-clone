import React, { ButtonHTMLAttributes, ReactNode } from 'react'

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'solid' | 'outline' | 'oauth'
  size?: 'sm' | 'md'
  children: ReactNode
}

const buttonConfig = {
  sizes: {
    sm: 'text-2',
    md: 'text-[10px]',
  },
  variants: {
    solid: 'text-white bg-blue-500 hover:bg-blue-400',
    outline: 'text-blue-500 border-[1px] border-solid border-blue-500',
    oauth: 'h-9 border[1px] border-solid border-gray-300 hover:bg-gray-50',
  },
}

export const Button = ({ variant, size, children, ...props }: IButton) => {
  return (
    <button
      {...props}
      className={`
      flex items-center justify-center
      rounded-[60px] text-xs font-bold
      focus:shadow-none 
      ${size && buttonConfig.sizes[size]} 
      ${variant && buttonConfig.variants[variant]}
      ${props.className}
      `}
    >
      {children}
    </button>
  )
}
