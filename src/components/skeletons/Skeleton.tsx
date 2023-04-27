import React, { HTMLAttributes } from 'react'

interface ISkeleton extends HTMLAttributes<HTMLDivElement> {
  rounded?: string
}

export const Skeleton = ({ rounded, ...props }: ISkeleton) => {
  return (
    <div
      className={
        `bg-gradient-to-r from-gray-200 to-gray-300 animate-pulse bg-gray-400 bg-opacity-25
        ${rounded || 'rounded-lg'}
        ${props.className}
      `}
    />
  )
}
