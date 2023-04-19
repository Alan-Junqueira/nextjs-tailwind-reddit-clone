import { forwardRef, InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  iconLeft?: () => void
  iconRight?: () => void
}

export const InputRef = forwardRef<HTMLInputElement, InputProps>(
  ({ iconLeft, iconRight, ...props }, ref) => {
    return (
      <>
        {iconLeft && iconLeft()}
        <input
          ref={ref}
          {...props}
          className={`w-full text-gray-700 ${props.className}`}
        />
        {iconRight && iconRight()}
      </>
    )
  },
)

InputRef.displayName = 'InputRef'
