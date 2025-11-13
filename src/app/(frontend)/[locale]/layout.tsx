import React, { Suspense } from 'react'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import '../styles.css'
import FontendHeader from '../navigation/header'
import Footer from '../_components/footer'
import { Open_Sans } from 'next/font/google'
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import ReactQueryProvider from '../providers/react-query-provider'

const openSans = Open_Sans({ subsets: ['latin'] })

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params

  return {
    description:
      'Learn about innovative youth employment and entrepreneurship initiatives from across the African continent at the ASPYEE portal.',
    title: 'ASPYEE Portal',
    icons: {
      icon: '/images/favicon.ico',
    },
    metadataBase: new URL('https://centre.aspyee.org'),
    alternates: {
      languages: {
        en: '/en',
        fr: '/fr',
      },
    },
  }
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound()
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages()

  return (
    <html lang={locale}>
      <body className={openSans.className}>
        <NextIntlClientProvider messages={messages}>
          <ReactQueryProvider>
            <Suspense fallback={<div className="h-20" />}>
              <FontendHeader />
            </Suspense>
            <main>
              <NuqsAdapter>{children}</NuqsAdapter>
            </main>
            <Footer />
          </ReactQueryProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
