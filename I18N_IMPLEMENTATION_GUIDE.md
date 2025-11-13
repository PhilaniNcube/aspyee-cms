# ASPYEE i18n Implementation Guide

## ✅ Setup Complete

Your Next.js application now has full internationalization support for **English** and **French** using **next-intl**.

## 🌍 Supported Languages

- **English (en)** - `/en/*` - Default language
- **French (fr)** - `/fr/*`

## 📁 Project Structure

```
aspyee-cms/
├── messages/
│   ├── en.json          # English translations
│   └── fr.json          # French translations
├── src/
│   ├── i18n/
│   │   ├── request.ts   # Request configuration
│   │   ├── routing.ts   # Routing & navigation helpers
│   │   └── types.ts     # TypeScript type definitions
│   ├── proxy.ts    # Locale detection & routing
│   ├── app/
│   │   └── (frontend)/
│   │       ├── [locale]/          # All localized routes
│   │       │   ├── layout.tsx     # Localized layout with NextIntlClientProvider
│   │       │   ├── page.tsx
│   │       │   ├── blogs/
│   │       │   ├── events/
│   │       │   ├── knowledge-centre/
│   │       │   └── ...
│   │       ├── layout.tsx         # Root layout
│   │       ├── navigation/        # Shared navigation
│   │       ├── _components/       # Shared components
│   │       └── providers/         # Shared providers
│   └── components/
│       └── language-switcher.tsx  # Language switcher component
```

## 🚀 How to Use Translations

### 1. In Server Components

```tsx
import { useTranslations } from 'next-intl'

export default function MyServerComponent() {
  const t = useTranslations('navigation')
  
  return (
    <div>
      <h1>{t('home')}</h1>
      <p>{t('knowledgeCentre')}</p>
    </div>
  )
}
```

### 2. In Client Components

```tsx
'use client'

import { useTranslations } from 'next-intl'

export default function MyClientComponent() {
  const t = useTranslations('common')
  
  return (
    <button>{t('readMore')}</button>
  )
}
```

### 3. With Dynamic Parameters

```tsx
const t = useTranslations('footer')

// In messages: "copyright": "© {year} ASPYEE. All rights reserved."
<p>{t('copyright', { year: 2025 })}</p>
// Output: © 2025 ASPYEE. All rights reserved.
```

### 4. For Navigation Links

Always use the localized Link component:

```tsx
import { Link } from '@/i18n/routing'

<Link href="/knowledge-centre">Knowledge Centre</Link>
// Will navigate to /en/knowledge-centre or /fr/knowledge-centre
```

### 5. For Navigation Hooks

Use localized navigation hooks:

```tsx
'use client'

import { useRouter, usePathname } from '@/i18n/routing'

export default function MyComponent() {
  const router = useRouter()
  const pathname = usePathname()
  
  const handleClick = () => {
    router.push('/resources')  // Automatically adds locale prefix
  }
  
  return <button onClick={handleClick}>Go to Resources</button>
}
```

### 6. Get Current Locale

```tsx
import { useLocale } from 'next-intl'

export default function MyComponent() {
  const locale = useLocale()  // 'en' or 'fr'
  
  return <div>Current language: {locale}</div>
}
```

## 📝 Translation Files

### Structure

All translations are in `messages/` directory:

- `messages/en.json` - English translations
- `messages/fr.json` - French translations

### Available Translation Keys

The translation files include these sections:

- **common** - Common UI text (home, about, search, loading, etc.)
- **navigation** - Navigation menu items
- **auth** - Authentication (sign in, register, logout)
- **footer** - Footer content
- **knowledgeCentre** - Knowledge Centre specific text
- **resources** - Resources page content
- **blogs** - Blog page content
- **events** - Events page content
- **testimonials** - Testimonials section
- **forms** - Form labels and validation messages
- **profile** - Profile page content
- **search** - Search functionality
- **errors** - Error messages

### Adding New Translations

1. Add the key to both `messages/en.json` and `messages/fr.json`
2. Use the key in your components: `t('yourSection.yourKey')`

Example:

```json
// messages/en.json
{
  "mySection": {
    "greeting": "Hello {name}!",
    "welcome": "Welcome to ASPYEE"
  }
}

// messages/fr.json
{
  "mySection": {
    "greeting": "Bonjour {name}!",
    "welcome": "Bienvenue à ASPYEE"
  }
}
```

```tsx
const t = useTranslations('mySection')
<h1>{t('greeting', { name: 'John' })}</h1>
```

## 🎨 Language Switcher

Add the language switcher to your navigation:

```tsx
import { LanguageSwitcher } from '@/components/language-switcher'

<LanguageSwitcher />
```

There's also a button-based version:

```tsx
import { LanguageSwitcherButtons } from '@/components/language-switcher'

<LanguageSwitcherButtons />
```

## 🔗 URL Structure

All routes now include the locale prefix:

| Page | English URL | French URL |
|------|------------|-----------|
| Home | `/en/` | `/fr/` |
| Knowledge Centre | `/en/knowledge-centre` | `/fr/knowledge-centre` |
| Resources | `/en/resources` | `/fr/resources` |
| Blogs | `/en/blogs` | `/fr/blogs` |
| Events | `/en/events` | `/fr/events` |
| Policymakers | `/en/policymakers` | `/fr/policymakers` |
| Researchers | `/en/researchers` | `/fr/researchers` |
| Youth | `/en/youth` | `/fr/youth` |
| Educators | `/en/educators` | `/fr/educators` |
| Private Sector | `/en/private-sector` | `/fr/private-sector` |

## 🔄 Migration Checklist

To fully implement i18n in your existing components:

### 1. Update Imports
- [ ] Replace `import Link from 'next/link'` with `import { Link } from '@/i18n/routing'`
- [ ] Replace `import { useRouter, usePathname } from 'next/navigation'` with `import { useRouter, usePathname } from '@/i18n/routing'`

### 2. Add Translations
- [ ] Import `useTranslations` in components
- [ ] Replace hardcoded text with `t('key')` calls
- [ ] Add translation keys to both `en.json` and `fr.json`

### 3. Update Components

**Before:**
```tsx
import Link from 'next/link'

export default function MyComponent() {
  return (
    <div>
      <h1>Welcome</h1>
      <Link href="/resources">View Resources</Link>
    </div>
  )
}
```

**After:**
```tsx
import { Link } from '@/i18n/routing'
import { useTranslations } from 'next-intl'

export default function MyComponent() {
  const t = useTranslations('common')
  
  return (
    <div>
      <h1>{t('welcomeTo')} ASPYEE</h1>
      <Link href="/resources">{t('viewAll')}</Link>
    </div>
  )
}
```

## 🐛 Common Issues & Solutions

### Issue: TypeScript errors about routing module

**Solution:** Restart the TypeScript server in VS Code:
1. Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on Mac)
2. Type "TypeScript: Restart TS Server"
3. Press Enter

### Issue: Page not found (404)

**Solution:** Ensure you're accessing pages with the locale prefix:
- ❌ `http://localhost:3000/resources`
- ✅ `http://localhost:3000/en/resources`

The middleware will redirect root URLs to the default locale.

### Issue: Translation key not found

**Solution:** 
1. Check that the key exists in both `en.json` and `fr.json`
2. Verify the path: `t('section.key')` matches the JSON structure
3. Restart the dev server after adding new translation files

### Issue: Images showing legacy prop warnings

This is a separate issue from i18n. Update Image components:
```tsx
// Before
<Image src="..." layout="fill" objectFit="cover" />

// After
<Image src="..." fill style={{ objectFit: 'cover' }} />
```

## 📚 Resources

- **Translation Files**: `messages/en.json`, `messages/fr.json`
- **Configuration**: `src/i18n/routing.ts`, `src/i18n/request.ts`
- **Middleware**: `src/middleware.ts`
- **Language Switcher**: `src/components/language-switcher.tsx`
- **Example Usage**: `src/app/(frontend)/[locale]/example-usage.tsx`

## 🎯 Next Steps

1. **Add Language Switcher to Header**
   - Edit `src/app/(frontend)/navigation/header-client.tsx`
   - Import and add `<LanguageSwitcher />`

2. **Update Existing Components**
   - Start with high-traffic pages
   - Replace hardcoded text with translation keys
   - Update Link and navigation imports

3. **Test Both Languages**
   - Visit `/en/` and `/fr/` versions of each page
   - Verify all text is translated
   - Test the language switcher

4. **Expand Translations**
   - Add more specific translations for each section
   - Include error messages and form validations
   - Add meta descriptions for SEO

## ✨ TypeScript Support

The project includes TypeScript autocompletion for translation keys:

```tsx
const t = useTranslations('navigation')
t('home')  // ✅ TypeScript will autocomplete available keys
t('invalid')  // ❌ TypeScript will show an error
```

This is powered by `src/i18n/types.ts` which syncs with your `messages/en.json` file.

---

**Your i18n setup is complete and ready to use!** 🎉

Start the dev server with `pnpm run dev` and visit:
- English: http://localhost:3000/en/
- French: http://localhost:3000/fr/
