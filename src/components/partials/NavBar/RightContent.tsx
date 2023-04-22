import { AuthButtons } from './AuthButtons'
import { AuthModal } from '@/components/modals/auth/AuthModal'
import { User, signOut } from 'firebase/auth'
import { auth } from '@/firebase/clientApp'
import { Icons } from './Icons'
import { UserMenu } from './UserMenu'
import { HTMLAttributes } from 'react'

interface IRightContent extends HTMLAttributes<HTMLDivElement> {
  user?: User | null
}

export const RightContent = ({ user, ...props }: IRightContent) => {
  return (
    <>
      <AuthModal />
      <div {...props} className={`${props.className} ${!user ? 'justify-end' : 'justify-center'} flex items-center `}>
        {user ? <Icons /> : <AuthButtons />}
        <UserMenu user={user} />
      </div>
    </>
  )
}
