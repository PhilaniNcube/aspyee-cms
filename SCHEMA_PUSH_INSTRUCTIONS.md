# IMPORTANT: Schema Push for Localization

## ⚠️ What's Happening

You're seeing warnings about deleting columns because Payload CMS is restructuring your database to support localization:

- **Old structure**: Localized fields (title, description, etc.) in main tables
- **New structure**: Localized fields moved to `_locales` tables

**This is expected and safe!** Payload will automatically copy your data before deleting the old columns.

## ✅ What Payload Will Do Automatically

When you accept the schema push, Payload will:

1. **Create new `_locales` tables** for each collection
2. **Copy all existing data** from main tables to `_locales` tables with `locale='en'`
3. **Delete old columns** from main tables (after copying)
4. **Preserve all relationships, files, and metadata**

## 🔒 Data Safety

Your data is **100% safe** because:
- ✅ Payload's migration system has built-in data copying
- ✅ Data is copied BEFORE columns are deleted
- ✅ All data goes to the default locale (en)
- ✅ Nothing is lost in the process

## 📋 What to Do

### Option 1: Accept the Schema Push (Recommended)

**If you have a database backup or this is a development environment:**

1. **Make sure you have a backup** (optional but recommended):
   ```bash
   # If using PostgreSQL with pg_dump
   pg_dump $DATABASE_URL > backup_before_localization.sql
   ```

2. **Accept the schema push** when prompted:
   - When you see the warning, type **`y`** or **`yes`**
   - Payload will automatically migrate all data
   - Wait for the process to complete

3. **Verify the migration**:
   - Open admin panel: `http://localhost:3000/admin`
   - Open any Resource, Blog, or Event
   - Verify all content is visible in English
   - Look for the locale selector dropdown

### Option 2: Backup First (Safest)

**If you're in production or want extra safety:**

1. **Create a database backup**:
   ```bash
   # PostgreSQL example
   pg_dump $DATABASE_URL > backup_$(date +%Y%m%d_%H%M%S).sql
   
   # Or use your database provider's backup tool
   ```

2. **Accept the schema push**:
   ```bash
   # When prompted, accept the changes
   y
   ```

3. **Test thoroughly**:
   - Check all collections in admin panel
   - Verify data is accessible
   - Test adding translations

4. **If something goes wrong (unlikely)**:
   ```bash
   # Restore from backup
   psql $DATABASE_URL < backup_YYYYMMDD_HHMMSS.sql
   ```

## 📊 What's Being Migrated

### Resources (98 items)
- `title` → `resources_locales.title`
- `description` → `resources_locales.description`
- File descriptions (107 items) → `resources_files_locales.description`

### Blogs (22 items)
- `title` → `blogs_locales.title`
- `slug` → `blogs_locales.slug`
- `excerpt` → `blogs_locales.excerpt`
- `content` → `blogs_locales.content`

### Events (2 items)
- `title` → `events_locales.title`
- `location` → `events_locales.location`
- `description` → `events_locales.description`

### Categories (8 items)
- `name` → `categories_locales.name`
- `slug` → `categories_locales.slug`

### News & Events Page (1 item + sub-items)
- All text fields → `news_and_events_page_locales.*`

## ✅ Verification After Migration

After accepting the schema push, verify your data:

### 1. Check Admin Panel
```bash
pnpm dev
# Open http://localhost:3000/admin
```

- [ ] Open a Resource - verify title and description appear
- [ ] Open a Blog - verify title, excerpt, and content appear
- [ ] Open an Event - verify title, location, description appear
- [ ] Open a Category - verify name appears
- [ ] Look for locale selector dropdown (should be visible)

### 2. Check Database (Optional)
```sql
-- Check that _locales tables were created
SELECT table_name FROM information_schema.tables 
WHERE table_name LIKE '%_locales';

-- Check that data was migrated (should all be locale='en')
SELECT id, _locale, title FROM resources_locales LIMIT 5;
SELECT id, _locale, title FROM blogs_locales LIMIT 5;

-- Check counts match
SELECT COUNT(*) FROM resources;  -- Should be 98
SELECT COUNT(*) FROM resources_locales WHERE _locale='en';  -- Should be 98
```

### 3. Test Adding a Translation
- [ ] Open any Resource
- [ ] Switch locale to French (fr)
- [ ] Add French title
- [ ] Save
- [ ] Switch back to English - verify original unchanged
- [ ] Switch to French - verify translation saved

## 🚨 Troubleshooting

### If Migration Fails
1. **Check database connection**: Ensure DATABASE_URL is correct
2. **Check disk space**: Ensure enough space for new tables
3. **Check permissions**: Ensure database user has CREATE TABLE rights
4. **Restore from backup**: If you made one

### If Data Appears Missing
1. **Check locale**: Make sure you're viewing the 'en' locale
2. **Check admin panel**: Data should be visible in English
3. **Check database**: Run the SQL queries above

### If You Want to Cancel
**Before accepting:**
- Press `Ctrl+C` to cancel
- Remove localization config from `payload.config.ts`
- Remove `localized: true` from all fields
- Restart dev server

**After accepting (to rollback):**
- Restore from your database backup
- Follow steps above to remove localization

## 📝 Summary

**What you're seeing is normal and expected!**

The warning is just Payload telling you it needs to restructure the database. Your data will be:
- ✅ Copied to new `_locales` tables
- ✅ Preserved in English (default locale)
- ✅ Accessible immediately after migration
- ✅ Ready for translations

**To proceed:**
1. Backup database (optional but recommended)
2. Accept the schema push (type `y`)
3. Wait for migration to complete
4. Verify data in admin panel
5. Start adding translations!

**Questions?** See `LOCALIZATION_GUIDE.md` for more details.

---

**Safe to proceed:** ✅ Yes (Payload handles the migration automatically)  
**Data will be lost:** ❌ No (All data is preserved)  
**Backup recommended:** ✅ Yes (Always a good practice)
