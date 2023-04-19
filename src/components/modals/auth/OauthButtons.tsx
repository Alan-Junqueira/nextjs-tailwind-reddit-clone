import { Button } from '@/components/Button'
import { auth } from '@/firebase/clientApp';
import Image from 'next/image'
import { useSignInWithGoogle } from "react-firebase-hooks/auth"
import { TextError } from './TextError';

export const OauthButtons = () => {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);

  return (
    <div className="flex flex-col gap-2 w-full mb-4">
      <Button variant="oauth" onClick={() => signInWithGoogle()} disabled={loading}>
        <Image
          src="/assets/images/googlelogo.png"
          width={20}
          height={20}
          alt="google logo"
        />
        Continue with Google
      </Button>
      <Button variant="oauth">Some Other Provider</Button>
      <TextError>{error?.message}</TextError>
    </div>
  )
}
