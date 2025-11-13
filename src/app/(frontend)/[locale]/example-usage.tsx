/**
 * Example: Using next-intl in Components
 *
 * This file demonstrates how to use translations in your components.
 */

// For Client Components (with 'use client' directive)
'use client'

import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'

export function ClientComponentExample() {
  const t = useTranslations('navigation')

  return (
    <nav>
      <Link href="/">{t('home')}</Link>
      <Link href="/resources">{t('resources')}</Link>
      <Link href="/blogs">{t('blogs')}</Link>
    </nav>
  )
}

// For Server Components
// In server components, use the same pattern but without 'use client':
/*
import { useTranslations } from 'next-intl'

export default function ServerComponentExample() {
  const t = useTranslations('common')
  
  return (
    <div>
      <h1>{t('home')}</h1>
      <p>{t('loading')}</p>
    </div>
  )
}
*/

// Using with parameters
/*
const t = useTranslations('footer')
return <p>{t('copyright', { year: new Date().getFullYear() })}</p>
// Output: © 2025 ASPYEE. All rights reserved.
*/

// Using in forms
/*
const t = useTranslations('forms')
return (
  <form>
    <button type="submit">{t('submit')}</button>
    <button type="button">{t('cancel')}</button>
  </form>
)
*/

// For navigation links, use the Link component from i18n/routing
// It automatically adds the locale prefix
/*
import { Link } from '@/i18n/routing'

<Link href="/resources">Resources</Link>
// Will navigate to /en/resources, /fr/resources, or /es/resources
*/
