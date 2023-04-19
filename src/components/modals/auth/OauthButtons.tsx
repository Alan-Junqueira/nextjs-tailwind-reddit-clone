import { Button } from '@/components/Button'
import Image from 'next/image'
import React from 'react'

export const OauthButtons = () => {
  return (
    <div className="flex flex-col gap-2 w-full mb-4">
      <Button variant="oauth">
        <Image
          src="/assets/images/googlelogo.png"
          width={20}
          height={20}
          alt="google logo"
        />
        Continue with Google
      </Button>
      <Button variant="oauth">Some Other Provider</Button>
    </div>
  )
}
