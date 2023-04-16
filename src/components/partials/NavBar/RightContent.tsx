import React from 'react'
import { AuthButtons } from './AuthButtons'

interface IRightContent {
  user?: any
}

export const RightContent = ({ user }: IRightContent) => {
  return (
    <>
      {/* <AuthModal /> */}
      <div className="flex items-center justify-center">
        <AuthButtons />
      </div>
    </>
  )
}
