'use client'

/**
 * Language Switcher Component
 *
 * Allows users to switch between available languages on the frontend.
 * Can be placed in your navigation or header.
 */

import { usePathname, useRouter } from 'next/navigation'
import {
  locales,
  localeConfig,
  type SupportedLocale,
  getLocaleFromPathname,
  addLocaleToPath,
  removeLocaleFromPath,
} from '@/lib/i18n'

interface LanguageSwitcherProps {
  currentLocale?: SupportedLocale
  className?: string
}

export function LanguageSwitcher({ currentLocale, className = '' }: LanguageSwitcherProps) {
  const pathname = usePathname()
  const router = useRouter()

  // Get current locale from pathname if not provided
  const locale = currentLocale || getLocaleFromPathname(pathname)

  const handleLocaleChange = (newLocale: SupportedLocale) => {
    // Remove current locale from path and add new one
    const pathWithoutLocale = removeLocaleFromPath(pathname)
    const newPath = addLocaleToPath(pathWithoutLocale, newLocale)
    router.push(newPath)
  }

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <label htmlFor="language-select" className="text-sm font-medium">
        Language:
      </label>
      <select
        id="language-select"
        value={locale}
        onChange={(e) => handleLocaleChange(e.target.value as SupportedLocale)}
        className="border rounded px-2 py-1 text-sm bg-white"
      >
        {locales.map((loc) => (
          <option key={loc} value={loc}>
            {localeConfig[loc].flag} {localeConfig[loc].label}
          </option>
        ))}
      </select>
    </div>
  )
}

/**
 * Alternative: Button-based language switcher
 */
export function LanguageSwitcherButtons({ currentLocale, className = '' }: LanguageSwitcherProps) {
  const pathname = usePathname()
  const router = useRouter()

  const locale = currentLocale || getLocaleFromPathname(pathname)

  const handleLocaleChange = (newLocale: SupportedLocale) => {
    const pathWithoutLocale = removeLocaleFromPath(pathname)
    const newPath = addLocaleToPath(pathWithoutLocale, newLocale)
    router.push(newPath)
  }

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {locales.map((loc) => (
        <button
          key={loc}
          onClick={() => handleLocaleChange(loc)}
          className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
            locale === loc
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
          aria-label={`Switch to ${localeConfig[loc].label}`}
        >
          {localeConfig[loc].flag} {loc.toUpperCase()}
        </button>
      ))}
    </div>
  )
}

// Example usage:
/*
// In your navigation component:
import { LanguageSwitcher } from '@/components/language-switcher'

export function Navigation() {
  return (
    <nav>
      <div className="flex items-center justify-between">
        <Logo />
        <div className="flex items-center gap-4">
          <NavLinks />
          <LanguageSwitcher />
        </div>
      </div>
    </nav>
  )
}
*/
