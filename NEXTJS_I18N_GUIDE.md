# Next.js Internationalization with next-intl

This project now uses **next-intl** for internationalization, which is the recommended solution for Next.js 15+ App Router.

## 🌍 Supported Languages

- **English (en)** - Default
- **French (fr)**
- **Spanish (es)**

## 📁 Project Structure

```
src/
├── i18n/
│   ├── request.ts         # Request configuration for next-intl
│   └── routing.ts         # Routing configuration and navigation helpers
├── middleware.ts          # Locale detection and routing middleware
├── app/
│   └── (frontend)/
│       ├── layout.tsx     # Root layout (redirect wrapper)
│       └── [locale]/      # All routes are under [locale]
│           ├── layout.tsx # Main layout with NextIntlClientProvider
│           ├── page.tsx
│           ├── blogs/
│           ├── events/
│           └── ...other routes
messages/
├── en.json                # English translations
├── fr.json                # French translations
└── es.json                # Spanish translations
```

## 🚀 Quick Start

### 1. Using Translations in Components

#### Server Components
```tsx
import { useTranslations } from 'next-intl'

export default function MyServerComponent() {
  const t = useTranslations('navigation')
  
  return (
    <nav>
      <h1>{t('home')}</h1>
      <p>{t('resources')}</p>
    </nav>
  )
}
```

#### Client Components
```tsx
'use client'

import { useTranslations } from 'next-intl'

export function MyClientComponent() {
  const t = useTranslations('common')
  
  return <button>{t('search')}</button>
}
```

### 2. Navigation with Locale-aware Links

Always use the `Link` component from `@/i18n/routing` instead of `next/link`:

```tsx
import { Link } from '@/i18n/routing'

export function Navigation() {
  return (
    <nav>
      <Link href="/">Home</Link>
      <Link href="/resources">Resources</Link>
      <Link href="/blogs">Blogs</Link>
    </nav>
  )
}
```

### 3. Programmatic Navigation

```tsx
'use client'

import { useRouter, usePathname } from '@/i18n/routing'

export function MyComponent() {
  const router = useRouter()
  const pathname = usePathname()
  
  const handleClick = () => {
    router.push('/resources')
  }
  
  return <button onClick={handleClick}>Go to Resources</button>
}
```

### 4. Get Current Locale

```tsx
'use client'

import { useLocale } from 'next-intl'

export function LocaleDisplay() {
  const locale = useLocale() // 'en', 'fr', or 'es'
  
  return <p>Current locale: {locale}</p>
}
```

### 5. Language Switcher

Already implemented in `src/components/language-switcher.tsx`:

```tsx
import { LanguageSwitcher } from '@/components/language-switcher'

// In your header/navigation
<LanguageSwitcher />

// Or use the button variant
<LanguageSwitcherButtons />
```

## 📝 Adding Translations

Edit the JSON files in the `messages/` folder:

**messages/en.json:**
```json
{
  "mySection": {
    "title": "My Title",
    "description": "My Description"
  }
}
```

**messages/fr.json:**
```json
{
  "mySection": {
    "title": "Mon Titre",
    "description": "Ma Description"
  }
}
```

Then use in your component:
```tsx
const t = useTranslations('mySection')
return <h1>{t('title')}</h1>
```

## 🔤 Translations with Parameters

**messages/en.json:**
```json
{
  "greeting": "Hello {name}!",
  "itemCount": "You have {count} items"
}
```

**Usage:**
```tsx
const t = useTranslations('common')
<p>{t('greeting', { name: 'John' })}</p>
<p>{t('itemCount', { count: 5 })}</p>
```

## 🌐 URL Structure

All URLs now include the locale prefix:
- English: `/en/resources`, `/en/blogs`, `/en/events`
- French: `/fr/resources`, `/fr/blogs`, `/fr/events`
- Spanish: `/es/resources`, `/es/blogs`, `/es/events`

The middleware automatically:
- Detects the user's preferred language
- Redirects root path `/` to `/en/` (default locale)
- Preserves the locale when navigating

## 🔧 Configuration

### Change Default Locale

Edit `src/i18n/routing.ts`:
```typescript
export const routing = defineRouting({
  locales: ['en', 'fr', 'es'],
  defaultLocale: 'fr', // Change this
})
```

### Add New Language

1. Add locale to `src/i18n/routing.ts`:
```typescript
locales: ['en', 'fr', 'es', 'de'],
```

2. Create `messages/de.json` with translations

3. Update `generateStaticParams` in `src/app/(frontend)/[locale]/layout.tsx` (it's already dynamic)

### Change Locale Prefix Strategy

In `src/i18n/routing.ts`:
```typescript
export const routing = defineRouting({
  locales: ['en', 'fr', 'es'],
  defaultLocale: 'en',
  localePrefix: 'as-needed', // 'always' | 'as-needed' | 'never'
})
```

- `'always'`: All URLs have locale prefix (current: `/en/`, `/fr/`, `/es/`)
- `'as-needed'`: Default locale has no prefix (e.g., `/`, `/fr/`, `/es/`)
- `'never'`: No locale prefixes (use with domain-based routing)

## 🎯 Best Practices

1. **Always use `Link` from `@/i18n/routing`** for internal links
2. **Keep translation keys organized** by feature/section
3. **Use meaningful key names** (e.g., `navigation.home` not `nav1`)
4. **Add missing translations** - next-intl will warn in development
5. **Use parameters** for dynamic content instead of string concatenation

## 🔍 SEO & Metadata

Add alternate language links in your layout:

```tsx
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  
  return {
    title: 'ASPYEE Portal',
    alternates: {
      languages: {
        en: '/en',
        fr: '/fr',
        es: '/es',
      },
    },
  }
}
```

## 🚨 Common Issues

### Issue: Translations not found
- Check that the key exists in all language files
- Verify the namespace matches (e.g., `useTranslations('navigation')`)
- Restart the dev server after adding new translation files

### Issue: Links don't preserve locale
- Use `Link` from `@/i18n/routing`, not `next/link`
- Use `useRouter` and `usePathname` from `@/i18n/routing`, not `next/navigation`

### Issue: Middleware conflicts
- The middleware matcher excludes `/api`, `/admin`, `/_next`, and static files
- Adjust `src/middleware.ts` if you need different rules

## 📚 Resources

- [next-intl Documentation](https://next-intl-docs.vercel.app/)
- [Next.js Internationalization](https://nextjs.org/docs/app/building-your-application/routing/internationalization)
- [Example Usage](./src/app/(frontend)/[locale]/example-usage.tsx)

## 🔄 Migration Checklist

If you're updating existing components:

- [ ] Replace `import { Link } from 'next/link'` with `import { Link } from '@/i18n/routing'`
- [ ] Replace `import { useRouter, usePathname } from 'next/navigation'` with `import { useRouter, usePathname } from '@/i18n/routing'`
- [ ] Add `useTranslations()` calls for any hardcoded text
- [ ] Add translations to JSON files for all supported languages
- [ ] Test each page in all three languages

## ✨ Next Steps

1. Add translations to your existing components
2. Update hardcoded text to use translation keys
3. Test the language switcher on different pages
4. Add more languages if needed
5. Configure SEO metadata with alternate language links
