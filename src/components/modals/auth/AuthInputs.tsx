import { useAuthModalStore } from '@/store/modal/useAuthModalStore'
import React from 'react'
import { Login } from './Login'
import { SignUp } from './SignUp'

export const AuthInputs = () => {
  const {
    state: { view }
  } = useAuthModalStore()

  return (
    <div className="flex items-center flex-col w-full mt-4">
      {view === 'login' && <Login />}
      {view === 'signup' && <SignUp />}
    </div>
  )
}
