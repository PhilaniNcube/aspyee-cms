import React, { Suspense } from 'react'
import { routing } from '@/i18n/routing'
import { redirect } from 'next/navigation'

export const metadata = {
  description:
    'Learn about innovative youth employment and entrepreneurship initiatives from across the African continent at the ASPYEE portal.',
  title: 'ASPYEE Portal',
  icons: {
    icon: '/images/favicon.ico',
  },
  metadataBase: new URL('https://centre.aspyee.org'),
}

// This layout serves as a redirect wrapper
// The actual rendering happens in [locale]/layout.tsx
export default function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  // The middleware will handle redirects, but this is a fallback
  // In case someone accesses the root directly
  return (
    <>
      <Suspense>{children}</Suspense>
    </>
  )
}
