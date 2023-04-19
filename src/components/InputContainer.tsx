import { HTMLAttributes, ReactNode } from 'react'

interface IInputContainer extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

export const InputContainer = ({ children, ...props }: IInputContainer) => {
  return <div {...props} className={`flex flex-col gap-1 relative ${props.className}`}>{children}</div>
}
