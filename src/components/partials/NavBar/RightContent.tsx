import { Button } from '@/components/Button'
import { AuthButtons } from './AuthButtons'
import { AuthModal } from '@/components/modals/auth/AuthModal'
import { User, signOut } from 'firebase/auth'
import { auth } from '@/firebase/clientApp'
import { Icons } from './Icons'

interface IRightContent {
  user?: User | null
}

export const RightContent = ({ user }: IRightContent) => {
  return (
    <>
      <AuthModal />
      <div className='flex items-center justify-center'>
        {user ? <Icons /> : <AuthButtons />}
        {/* <Menu /> */}
      </div>
    </>
  )
}
