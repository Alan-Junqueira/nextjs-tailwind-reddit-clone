import { Button } from '@/components/Button'
import { auth, firestore } from '@/libs/firebase/clientApp';
import Image from 'next/image'
import { useSignInWithGoogle } from "react-firebase-hooks/auth"
import { TextError } from './TextError';
import { useEffect } from 'react';
import { doc, setDoc } from 'firebase/firestore';
import { User } from 'firebase/auth';

export const OauthButtons = () => {
  const [signInWithGoogle, userCredentials, loading, error] = useSignInWithGoogle(auth);


  const createUserDocument = async (user: User) => {
    const userDocRef = doc(firestore, 'users', user.uid)
    await setDoc(userDocRef, JSON.parse(JSON.stringify(user)))
  }

  useEffect(() => {
    if (userCredentials) {
      createUserDocument(userCredentials.user)
    }
  }, [userCredentials])

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
