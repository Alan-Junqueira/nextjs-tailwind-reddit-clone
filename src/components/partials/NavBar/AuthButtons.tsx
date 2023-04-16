import { Button } from '@/components/Button'
import React from 'react'

export const AuthButtons = () => {
  return (
    <>
      <Button
        size="sm"
        variant="outline"
        className="h-7 hidden sm:flex w-16 md:w-28 mr-2"
      // onClick={()=>{}}
      >
        Log In
      </Button>
      <Button
        // size="sm"
        variant="solid"
        className="h-7 hidden sm:flex w-16 md:w-28 mr-2"
      >
        Sign Up
      </Button>
    </>
  )
}
