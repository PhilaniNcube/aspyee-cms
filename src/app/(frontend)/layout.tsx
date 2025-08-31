import React from 'react'
import './styles.css'
import FontendHeader from './navigation/header'
import { Open_Sans } from 'next/font/google'

const openSans = Open_Sans({ subsets: ['latin'] })

export const metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'Payload Blank Template',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body className={openSans.className}>
        <FontendHeader />
        <main>{children}</main>
      </body>
    </html>
  )
}
