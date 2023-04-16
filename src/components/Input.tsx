import React, { InputHTMLAttributes } from 'react'

interface IInput extends InputHTMLAttributes<HTMLInputElement> {
  iconLeft?: () => void
  iconRight?: () => void
}

export const Input = ({ iconLeft, iconRight, ...props }: IInput) => {
  return (
    <>
      {iconLeft && iconLeft()}
      <input {...props} type="text" className={`w-full ${props.className}`} />
      {iconRight && iconRight()}
    </>
  )
}
