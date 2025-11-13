# Localization Quick Reference

## Supported Languages
- 🇬🇧 **English (en)** - Default
- 🇫🇷 **French (fr)**
- 🇪🇸 **Spanish (es)**

---

## Admin Panel

### Switch Language
1. Open any document
2. Find locale dropdown (near save button)
3. Select language
4. Edit content
5. Save

### Add Translation
1. Open document in default language
2. Switch to target language (fr/es)
3. Fill translated fields
4. Save
5. Original language content unchanged ✓

---

## Query Content (Server-Side)

### Single Locale
```typescript
const payload = await getPayload({ config })

const resources = await payload.find({
  collection: 'resources',
  locale: 'fr', // en, fr, or es
})
```

### All Locales
```typescript
const resource = await payload.findByID({
  collection: 'resources',
  id: '123',
  locale: 'all',
})
// Returns: { title: { en: '...', fr: '...', es: '...' }, ... }
```

---

## Frontend Components

### Language Switcher
```typescript
import { LanguageSwitcher } from '@/components/language-switcher'

<LanguageSwitcher />
```

### Get Current Locale from URL
```typescript
import { getLocaleFromPathname } from '@/lib/i18n'

const locale = getLocaleFromPathname('/fr/resources') // 'fr'
```

### Format Date by Locale
```typescript
import { formatDate } from '@/lib/i18n'

const formatted = formatDate(new Date(), 'fr')
```

### Translate UI Text
```typescript
import { t } from '@/lib/i18n'

const text = t('readMore', 'fr') // 'Lire Plus'
```

---

## Next.js Routing

### Page with Locale Parameter
```typescript
// app/[locale]/resources/page.tsx
export default async function Page({ params }: { params: { locale: string } }) {
  const payload = await getPayload({ config })
  const data = await payload.find({
    collection: 'resources',
    locale: params.locale,
  })
  return <ResourceList data={data} />
}
```

### Generate Static Params
```typescript
export async function generateStaticParams() {
  return [
    { locale: 'en' },
    { locale: 'fr' },
    { locale: 'es' },
  ]
}
```

---

## Localized Fields by Collection

| Collection | Localized | Not Localized |
|------------|-----------|---------------|
| Resources | title, description, file descriptions | type, themes, countries, files, metadata |
| Blogs | title, slug, excerpt, content | author, categories, date, images |
| Events | title, location, description | date, organizer, images |
| Categories | name, slug | timestamps |

---

## Common Commands

```bash
# Start dev server
pnpm dev

# Regenerate types
pnpm generate:types

# Build for production
pnpm build
```

---

## Troubleshooting Quick Fixes

| Problem | Solution |
|---------|----------|
| No locale selector | Restart dev server |
| Types not updating | Run `pnpm generate:types` |
| Can't find data | Check you're in 'en' locale |
| Translations not saving | Check browser console |

---

## Key Files

- Config: `src/payload.config.ts`
- Utilities: `src/lib/i18n.ts`
- Collections: `src/collections/*.ts`
- Full Guide: `LOCALIZATION_GUIDE.md`
- Testing: `LOCALIZATION_TESTING.md`

---

## Data Safety ✅

- All existing data preserved in English
- No data loss
- Automatic fallback to English if translation missing
- Non-localized fields shared across languages

---

**Quick Start:** 
1. `pnpm dev`
2. Open `/admin`
3. Open any document
4. Switch locale dropdown
5. Add translation
6. Save ✓

**Need Help?** See `LOCALIZATION_GUIDE.md` for detailed documentation.
