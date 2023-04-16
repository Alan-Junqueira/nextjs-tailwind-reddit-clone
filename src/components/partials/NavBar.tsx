import Image from 'next/image'
import React from 'react'

export const NavBar = () => {
  return (
    <header className="flex bg-white h-11 px-3 py-2">
      <div className="flex items-center">
        <Image
          src="/assets/images/redditFace.svg"
          alt="reddit logo"
          width={32}
          height={32}
        />
        <Image
          src="/assets/images/redditText.svg"
          alt="reddit logo"
          width={48}
          height={48}
          className="hidden md:block"
        />
      </div>
    </header>
  )
}
