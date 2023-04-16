import { Open_Sans } from 'next/font/google'
import { ReactNode } from 'react'
import { Metadata } from 'next'

import './globals.css'

import { NavBar } from '@/components/partials/NavBar'

const openSans = Open_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '700'],
})

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={`${openSans.className} bg-gray-50`}>
        <NavBar />
        <div>{children}</div>
      </body>
    </html>
  )
}
