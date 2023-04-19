import { HTMLAttributes, ReactNode } from 'react'

interface ITextError extends HTMLAttributes<HTMLParagraphElement> {
  children?: ReactNode
}

export const TextError = ({ children, ...props }: ITextError) => {
  return (
    <p {...props} className={`text-xs text-red-600 ${props.className}`}>
      {children}
    </p>
  )
}
