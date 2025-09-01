import React from 'react'
import './styles.css'
import FontendHeader from './navigation/header'
import Footer from './_components/footer'
import { Open_Sans } from 'next/font/google'
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import './global.css';

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
        <main>
          <NuqsAdapter>{children}</NuqsAdapter>
        </main>
        <Footer />
      </body>
    </html>
  )
}
