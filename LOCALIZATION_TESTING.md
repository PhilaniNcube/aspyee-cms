# Localization Testing Checklist

## Pre-Testing Setup

- [ ] **Backup database** (if in production)
- [ ] **Commit current changes** to version control
- [ ] **Install dependencies** (if any new packages were added)

## Phase 1: Admin Panel Testing

### 1. Server Startup
```bash
pnpm dev
```

- [ ] Dev server starts without errors
- [ ] No TypeScript compilation errors
- [ ] Payload CMS initializes successfully

### 2. Admin Panel Access
Navigate to: `http://localhost:3000/admin`

- [ ] Admin panel loads successfully
- [ ] Can log in with existing credentials
- [ ] Dashboard displays correctly

### 3. Locale Selector Visibility

For each collection (Resources, Blogs, Events, Categories, News and Events Page):

- [ ] **Resources Collection**
  - [ ] Open any existing resource
  - [ ] Locale selector dropdown is visible (usually top-right or near save button)
  - [ ] All three locales appear: English (en), Français (fr), Español (es)
  - [ ] Default locale (English) is selected

- [ ] **Blogs Collection**
  - [ ] Open any existing blog post
  - [ ] Locale selector is visible
  - [ ] All locales available

- [ ] **Events Collection**
  - [ ] Open any existing event
  - [ ] Locale selector is visible
  - [ ] All locales available

- [ ] **Categories Collection**
  - [ ] Open any existing category
  - [ ] Locale selector is visible
  - [ ] All locales available

### 4. Data Preservation Verification

For a **Resource** document:
- [ ] Open an existing resource
- [ ] Verify English content is intact:
  - [ ] Title displays correctly
  - [ ] Description displays correctly
  - [ ] Files and descriptions are present
  - [ ] All metadata (type, themes, countries, etc.) is intact
  - [ ] Download count is preserved

For a **Blog** document:
- [ ] Open an existing blog post
- [ ] Verify English content is intact:
  - [ ] Title displays correctly
  - [ ] Slug is present
  - [ ] Excerpt displays correctly
  - [ ] Content (rich text) displays correctly
  - [ ] Featured image is present
  - [ ] Author, categories, and metadata are intact

For an **Event** document:
- [ ] Open an existing event
- [ ] Verify English content is intact:
  - [ ] Title displays correctly
  - [ ] Location displays correctly
  - [ ] Description displays correctly
  - [ ] Date and organizer information are intact

## Phase 2: Translation Testing

### 5. Adding French Translations

Pick one **Resource** document:
- [ ] Open the resource
- [ ] Switch locale to **French (fr)** using locale selector
- [ ] Notice that fields appear empty or show English (fallback)
- [ ] Enter French translations:
  - [ ] Title: Enter French translation
  - [ ] Description: Enter French translation
  - [ ] File description (first file): Enter French translation
- [ ] **Save** the document
- [ ] Verify save succeeds without errors

Verify translation persistence:
- [ ] Reload the page
- [ ] Select French (fr) locale
- [ ] Verify French translations appear correctly
- [ ] Switch to English (en)
- [ ] Verify original English content is unchanged
- [ ] Switch back to French (fr)
- [ ] Verify French content is still there

### 6. Adding Spanish Translations

Pick one **Blog** document:
- [ ] Open the blog post
- [ ] Switch locale to **Spanish (es)**
- [ ] Enter Spanish translations:
  - [ ] Title: Enter Spanish translation
  - [ ] Excerpt: Enter Spanish translation
  - [ ] Content: Enter Spanish translation (at least a paragraph)
- [ ] **Save** the document
- [ ] Verify save succeeds

Verify translation persistence:
- [ ] Reload the page
- [ ] Select Spanish (es) locale
- [ ] Verify Spanish translations appear
- [ ] Switch between en/fr/es
- [ ] Verify correct content shows for each locale

### 7. Fallback Behavior

Pick a document that only has English content (no translations):
- [ ] Open the document
- [ ] Switch to French (fr)
- [ ] Verify English content appears (fallback behavior)
- [ ] Switch to Spanish (es)
- [ ] Verify English content appears (fallback behavior)
- [ ] Fallback is working correctly

## Phase 3: Database Verification

### 8. Database Structure Check

If using PostgreSQL (check with database client):
- [ ] New `_locales` tables exist:
  - [ ] `resources_locales`
  - [ ] `blogs_locales`
  - [ ] `events_locales`
  - [ ] `categories_locales`
  - [ ] `news_and_events_page_locales`

Sample query to check data:
```sql
-- Check Resources locales
SELECT id, _locale, _parentID, title FROM resources_locales LIMIT 10;

-- Verify main table still has non-localized data
SELECT id, type, good_practice, download_count FROM resources LIMIT 10;
```

- [ ] Locale tables contain data
- [ ] Default locale (en) entries exist for all documents
- [ ] Translated entries exist for documents you translated
- [ ] Main tables still contain non-localized fields

## Phase 4: Frontend Testing

### 9. Test Payload Local API Queries

Create a test file: `test-localization.ts`

```typescript
import { getPayload } from 'payload'
import config from './src/payload.config'

async function testLocalization() {
  const payload = await getPayload({ config })
  
  // Test 1: Fetch in English
  console.log('=== Test 1: Fetch Resources in English ===')
  const englishResources = await payload.find({
    collection: 'resources',
    locale: 'en',
    limit: 3,
  })
  console.log('English resource titles:', englishResources.docs.map(r => r.title))
  
  // Test 2: Fetch in French
  console.log('\n=== Test 2: Fetch Resources in French ===')
  const frenchResources = await payload.find({
    collection: 'resources',
    locale: 'fr',
    limit: 3,
  })
  console.log('French resource titles:', frenchResources.docs.map(r => r.title))
  
  // Test 3: Fetch in Spanish
  console.log('\n=== Test 3: Fetch Resources in Spanish ===')
  const spanishResources = await payload.find({
    collection: 'resources',
    locale: 'es',
    limit: 3,
  })
  console.log('Spanish resource titles:', spanishResources.docs.map(r => r.title))
  
  // Test 4: Fetch specific document in all locales
  if (englishResources.docs[0]) {
    const resourceId = englishResources.docs[0].id
    
    console.log('\n=== Test 4: Fetch Single Resource in All Locales ===')
    const allLocales = await payload.findByID({
      collection: 'resources',
      id: resourceId,
      locale: 'all',
    })
    console.log('All locale data:', JSON.stringify(allLocales, null, 2))
  }
}

testLocalization().catch(console.error)
```

Run the test:
```bash
npx tsx test-localization.ts
```

- [ ] Test runs without errors
- [ ] English content appears correctly
- [ ] French content appears (either translated or fallback)
- [ ] Spanish content appears (either translated or fallback)
- [ ] 'all' locale query returns object with locale keys

### 10. Frontend Component Testing

If you have existing frontend pages:

- [ ] Navigate to resources page
- [ ] Verify resources display correctly
- [ ] Check that localized fields show content
- [ ] Verify no console errors

## Phase 5: New Content Testing

### 11. Create New Content in Non-Default Locale

Create a new **Resource** starting in French:
- [ ] Go to Resources collection
- [ ] Click "Create New"
- [ ] Switch locale to French (fr) BEFORE filling fields
- [ ] Enter French content:
  - [ ] Title in French
  - [ ] Description in French
  - [ ] Fill other required fields
- [ ] Save
- [ ] Verify save succeeds

Check content in different locales:
- [ ] Switch to English (en)
- [ ] Notice fields are empty (no fallback yet)
- [ ] Enter English translations
- [ ] Save
- [ ] Switch between locales
- [ ] Verify both versions exist

### 12. Bulk Operations

- [ ] Go to Resources list
- [ ] Select multiple resources
- [ ] Verify bulk actions still work
- [ ] Verify list view shows correct locale content

## Phase 6: Error Handling

### 13. Validation Testing

- [ ] Try to save a document without required localized fields
- [ ] Verify validation errors appear
- [ ] Verify validation works per locale

### 14. Slug Uniqueness (for Blogs/Categories)

- [ ] Create two blogs with same English slug
- [ ] Verify uniqueness validation works
- [ ] Create blogs with different slugs per locale
- [ ] Verify locale-specific slug uniqueness

## Phase 7: Performance Testing

### 15. Query Performance

- [ ] Query large collections (Resources)
- [ ] Verify queries complete in reasonable time
- [ ] Check that only requested locale is loaded (not all locales)

## Rollback Plan

If issues occur:

1. **Restore from backup** (if available)
2. **Remove localization config:**
   - Remove `localization` block from `payload.config.ts`
   - Remove `localized: true` from all fields
3. **Restart server**
4. **Database cleanup** (if needed):
   ```sql
   -- Drop locale tables (WARNING: loses translations)
   DROP TABLE IF EXISTS resources_locales CASCADE;
   DROP TABLE IF EXISTS blogs_locales CASCADE;
   DROP TABLE IF EXISTS events_locales CASCADE;
   DROP TABLE IF EXISTS categories_locales CASCADE;
   DROP TABLE IF EXISTS news_and_events_page_locales CASCADE;
   ```

## Success Criteria

✅ All checks passed:
- [ ] All existing data is accessible in English (default locale)
- [ ] No data loss detected
- [ ] Can add translations in French and Spanish
- [ ] Translations persist correctly
- [ ] Fallback to English works when translation missing
- [ ] Admin panel locale switcher works
- [ ] API queries return correct locale
- [ ] No TypeScript errors
- [ ] No runtime errors

## Next Steps After Testing

Once all tests pass:

1. **Document any issues** found during testing
2. **Train content editors** on using locale switcher
3. **Create content translation workflow**
4. **Implement frontend locale routing** (if not already done)
5. **Add language switcher** to frontend UI
6. **Set up SEO hreflang tags** for different locales
7. **Plan translation priorities** (which content to translate first)

## Troubleshooting

### Issue: Locale selector not appearing
**Fix:** Restart dev server, clear browser cache

### Issue: Translations not saving
**Fix:** Check browser console for errors, verify field has `localized: true`

### Issue: Database connection errors
**Fix:** Verify DATABASE_URL is correct, check database is running

### Issue: TypeScript errors
**Fix:** Run `pnpm generate:types` to regenerate Payload types

## Support Resources

- Payload Localization Docs: https://payloadcms.com/docs/configuration/localization
- Project-specific guide: See `LOCALIZATION_GUIDE.md`
- Report issues: [Your issue tracker]

---

**Testing Date:** _______________
**Tested By:** _______________
**Environment:** Development / Staging / Production
**Status:** ⬜ Pass / ⬜ Fail / ⬜ Partial
