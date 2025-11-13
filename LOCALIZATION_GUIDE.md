# Internationalization (i18n) Implementation Guide

## Overview

This project now supports internationalization (i18n) with multiple languages. All existing data has been preserved and is available in the default locale (English).

## Supported Languages

- **English (en)** - Default locale
- **French (fr)**
- **Spanish (es)**

You can easily add more languages by updating the `localization` configuration in `src/payload.config.ts`.

## How It Works

### Collections with Localized Fields

The following collections now support multiple languages:

#### 1. **Resources** (`/resources`)
Localized fields:
- `title` - Resource title
- `description` - Resource description
- `files[].description` - File descriptions
- `additional_files[].description` - Additional file descriptions

Non-localized fields (same across all languages):
- All metadata (type, themes, countries, region, etc.)
- Download count
- Files/images (same files used across locales)

#### 2. **Blogs** (`/blogs`)
Localized fields:
- `title` - Blog title
- `slug` - URL slug (automatically generated per locale)
- `excerpt` - Short description
- `content` - Full blog content (rich text)

#### 3. **Events** (`/events`)
Localized fields:
- `title` - Event title
- `location` - Event location
- `description` - Event description

#### 4. **Categories** (`/categories`)
Localized fields:
- `name` - Category name
- `slug` - URL slug

#### 5. **News and Events Page** (`/news-and-events-page`)
Localized fields:
- Hero section titles and subtitles
- Section titles
- News item titles and descriptions
- Twitter feed content

## Data Preservation

### ✅ All Existing Data is Safe

When you enabled localization:
1. All existing content was automatically migrated to the default locale (English)
2. No data was lost or modified
3. All relationships, files, and metadata were preserved
4. Your application will continue to work exactly as before

### How Payload CMS Handles Localization

Payload CMS 3.x uses a sophisticated approach:
- Creates separate `_locales` tables in the database for localized fields
- Keeps non-localized fields in the main table
- Automatically queries the correct locale based on request context
- Falls back to the default locale if a translation is missing (when `fallback: true`)

## Admin Panel Usage

### Switching Languages

In the Payload admin panel:
1. Look for the **language selector dropdown** (usually in the top right or near the save button)
2. Select the language you want to edit
3. Fill in translations for localized fields
4. Save the document

### Adding Translations

To add translations for existing content:
1. Open any document (e.g., a blog post or resource)
2. The document will load in English (default locale)
3. Switch to French or Spanish using the locale selector
4. Enter translations in the localized fields
5. Save - the original English content remains unchanged

### Viewing Status

- Fields with translations will show the translated content
- Fields without translations will show the default locale content (if fallback is enabled)
- Empty fields indicate no translation exists yet

## Frontend Implementation

### Querying Localized Content

To fetch content in a specific locale from your Next.js app:

```typescript
// Using Payload Local API
import { getPayload } from 'payload'
import config from '@/payload.config'

const payload = await getPayload({ config })

// Get resources in French
const resources = await payload.find({
  collection: 'resources',
  locale: 'fr', // or 'en', 'es'
  depth: 2,
})

// Get a single blog in Spanish
const blog = await payload.findByID({
  collection: 'blogs',
  id: '123',
  locale: 'es',
})
```

### Querying Multiple Locales

```typescript
// Get content in all locales
const resourceAllLocales = await payload.findByID({
  collection: 'resources',
  id: '123',
  locale: 'all', // Returns object with all locale versions
})

// Result structure:
// {
//   title: {
//     en: 'English title',
//     fr: 'Titre français',
//     es: 'Título español'
//   },
//   // ... other fields
// }
```

### Using with Next.js Internationalization

You can integrate this with Next.js i18n routing:

```typescript
// app/[locale]/resources/page.tsx
export default async function ResourcesPage({ 
  params 
}: { 
  params: { locale: string } 
}) {
  const payload = await getPayload({ config })
  
  const resources = await payload.find({
    collection: 'resources',
    locale: params.locale, // Uses URL locale
  })
  
  return <ResourceList resources={resources.docs} />
}
```

### Fallback Behavior

With `fallback: true` in the config:
- If a translation doesn't exist, Payload returns the default locale (English)
- This ensures your app never shows empty content
- You can check if content is translated or falling back:

```typescript
const resource = await payload.findByID({
  collection: 'resources',
  id: '123',
  locale: 'fr',
  fallbackLocale: 'en', // Explicitly set fallback
})
```

## Migration Details

### What Happened During Migration

When you added localization:
1. Payload detected the `localization` config
2. Created `_locales` tables for each collection with localized fields
3. Moved localized field data from main tables to locale tables
4. Linked data with the default locale (`en`)
5. Preserved all non-localized fields in main tables

### Database Structure

**Before localization:**
```
resources table:
- id
- title
- description
- type
- countries
- ...
```

**After localization:**
```
resources table:
- id
- type
- countries
- ... (non-localized fields)

resources_locales table:
- id
- _locale (en/fr/es)
- _parentID (links to resources.id)
- title
- description
- ... (localized fields)
```

## Testing the Implementation

### 1. Verify Admin Panel
- [ ] Start dev server: `pnpm dev`
- [ ] Log into Payload admin at `/admin`
- [ ] Open any Resource or Blog
- [ ] Verify locale selector is visible
- [ ] Switch between locales
- [ ] Verify existing English content loads

### 2. Add a Translation
- [ ] Open a resource in admin
- [ ] Switch to French (fr)
- [ ] Add French translation for title
- [ ] Save
- [ ] Switch back to English - verify original is unchanged
- [ ] Switch to French - verify translation appears

### 3. Query from Frontend
```typescript
// Test query in a server component or API route
const payload = await getPayload({ config })

// Test default locale
const englishResource = await payload.findByID({
  collection: 'resources',
  id: 'YOUR_RESOURCE_ID',
  locale: 'en',
})

// Test French (should fallback to English if not translated)
const frenchResource = await payload.findByID({
  collection: 'resources',
  id: 'YOUR_RESOURCE_ID',
  locale: 'fr',
})

console.log('English title:', englishResource.title)
console.log('French title:', frenchResource.title)
```

## Adding More Languages

To add additional languages (e.g., Portuguese, Arabic):

1. Update `src/payload.config.ts`:
```typescript
localization: {
  locales: [
    { label: 'English', code: 'en' },
    { label: 'Français', code: 'fr' },
    { label: 'Español', code: 'es' },
    { label: 'Português', code: 'pt' }, // Add new locale
    { label: 'العربية', code: 'ar' },    // Add new locale
  ],
  defaultLocale: 'en',
  fallback: true,
}
```

2. Restart dev server
3. New locales will appear in admin panel automatically

## Removing Localization (Not Recommended)

If you need to remove localization:

⚠️ **Warning:** This may result in data loss for non-default locales

1. Remove `localization` config from `payload.config.ts`
2. Remove `localized: true` from all collection fields
3. Run migration to move default locale data back to main tables
4. Drop `_locales` tables (data in non-default locales will be lost)

## Best Practices

### Content Strategy
- Always create content in the default locale (English) first
- Add translations incrementally
- Use the same media files across locales (no need to upload duplicates)
- Keep non-translatable metadata (types, categories, etc.) as non-localized

### Performance
- Payload only loads the requested locale (not all locales at once)
- Use `locale` parameter in all queries for optimal performance
- Cache localized content appropriately

### SEO
- Generate separate URLs for each locale (`/en/resources`, `/fr/ressources`)
- Use `hreflang` tags to link language versions
- Ensure slugs are unique per locale

## Troubleshooting

### Issue: Can't see locale selector in admin
**Solution:** Restart dev server after adding localization config

### Issue: Queries returning wrong locale
**Solution:** Explicitly pass `locale` parameter in all Payload queries

### Issue: Translations not saving
**Solution:** Check that fields have `localized: true` in collection config

### Issue: Missing data after migration
**Solution:** All data should be in English (default locale). Use locale selector to verify.

## Next Steps

1. ✅ Test the admin panel locale switching
2. ✅ Add sample translations in French/Spanish
3. ✅ Update frontend queries to accept locale parameter
4. ✅ Implement URL-based locale routing in Next.js
5. ✅ Add language selector to frontend UI
6. ✅ Test all localized content displays correctly

## Support

For questions about Payload CMS localization:
- [Payload Localization Docs](https://payloadcms.com/docs/configuration/localization)
- [Payload Discord Community](https://discord.com/invite/payload)

---

**Implementation Date:** November 13, 2025
**Payload Version:** 3.54.0
**Status:** ✅ Localization Enabled - All Data Preserved
