import { Button } from '@/components/Button'
import { AuthButtons } from './AuthButtons'
import { AuthModal } from '@/components/modals/auth/AuthModal'
import { signOut } from 'firebase/auth'
import { auth } from '@/firebase/clientApp'

interface IRightContent {
  user: any
}

export const RightContent = ({user}: IRightContent) => {
  return (
    <>
      <AuthModal />
      {user ? <Button onClick={()=> signOut(auth)}>Logout</Button> : <AuthButtons />}
    </>
  )
}
