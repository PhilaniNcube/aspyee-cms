'use client'

/**
 * Language Switcher Component with next-intl
 *
 * Allows users to switch between available languages on the frontend.
 * Can be placed in your navigation or header.
 */

import { useRouter, usePathname } from '@/i18n/routing'
import { useLocale } from 'next-intl'
import { routing } from '@/i18n/routing'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface LanguageSwitcherProps {
  className?: string
}

const localeNames: Record<string, { label: string; flag: string }> = {
  en: { label: 'English', flag: '🇬🇧' },
  fr: { label: 'Français', flag: '🇫🇷' },
}

export function LanguageSwitcher({ className = '' }: LanguageSwitcherProps) {
  const router = useRouter()
  const pathname = usePathname()
  const locale = useLocale()

  const handleLocaleChange = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale })
  }

  return (
    <Select value={locale} onValueChange={handleLocaleChange}>
      <SelectTrigger
        className={`w-[140px] border rounded px-3 py-2 text-sm bg-transparent ${className}`}
      >
        <SelectValue>
          {localeNames[locale].flag} {localeNames[locale].label}
        </SelectValue>
      </SelectTrigger>
      <SelectContent className="border rounded bg-white">
        <SelectGroup>
          <SelectLabel>Language</SelectLabel>
          {routing.locales.map((loc) => (
            <SelectItem key={loc} value={loc}>
              {localeNames[loc].flag} {localeNames[loc].label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

/**
 * Alternative: Button-based language switcher
 */
export function LanguageSwitcherButtons({ className = '' }: LanguageSwitcherProps) {
  const router = useRouter()
  const pathname = usePathname()
  const locale = useLocale()

  const handleLocaleChange = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale })
  }

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {routing.locales.map((loc) => (
        <button
          key={loc}
          onClick={() => handleLocaleChange(loc)}
          className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
            locale === loc
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
          aria-label={`Switch to ${localeNames[loc].label}`}
        >
          {localeNames[loc].flag} {loc.toUpperCase()}
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
