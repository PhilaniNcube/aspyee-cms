import React from 'react'
import './styles.css'
import FontendHeader from './navigation/header'
import Footer from './_components/footer'
import { Open_Sans } from 'next/font/google'
import { NuqsAdapter } from 'nuqs/adapters/next/app'

const openSans = Open_Sans({ subsets: ['latin'] })

export const metadata = {
  description:
    'Learn about innovative youth employment and entrepreneurship initiatives from across the African continent at the ASPYEE portal.',
  title: 'ASPYEE Portal',
  icons: {
    icon: '/images/favicon.ico',
  },
  metadataBase: new URL('https://centre.aspyee.org'),
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
