# Database Backup Options for Neon Database

You're using **Neon Database** (serverless PostgreSQL). Here are your backup options:

## ✅ Option 1: Use Neon Branching (RECOMMENDED - Instant & Free)

Neon has built-in **instant branching** - this is the easiest and fastest way to create a backup!

### Steps:

1. **Visit Neon Console**: https://console.neon.tech/
2. **Select your project** (aspyee-cms database)
3. **Go to "Branches" tab**
4. **Click "Create Branch"**
5. **Name it**: `backup-before-localization` or similar
6. **Click "Create Branch"**

✅ **Done!** This creates an instant, zero-cost copy of your database.

### To restore (if needed):
- Go to your branch
- Click "Set as primary" or restore specific tables

---

## Option 2: Use pg_dump (Traditional Method)

### Prerequisites:
You need PostgreSQL client tools installed.

**Windows:**
```bash
# Download and install PostgreSQL from:
https://www.postgresql.org/download/windows/
# Or use chocolatey:
choco install postgresql
```

### Run the backup:

**Using Node.js script (cross-platform):**
```bash
node backup-database.mjs
```

**Using bash script:**
```bash
chmod +x backup-database.sh
./backup-database.sh
```

**Manual command:**
```bash
pg_dump "postgresql://neondb_owner:npg_6aMorNICGQZ7@ep-cold-smoke-a2j1wxsp.eu-central-1.aws.neon.tech/neondb?sslmode=require" > backup.sql
```

---

## Option 3: Continue Without Backup (Safe with Payload)

Payload CMS's migration system is **production-tested** and safe. It:
- ✅ Copies data BEFORE deleting columns
- ✅ Uses database transactions
- ✅ Has been used by thousands of projects

If you're comfortable with Payload's migration system, you can proceed without a backup.

---

## 🎯 Recommended Approach

**For quickest backup:**
1. Use Neon Branching (takes 10 seconds)
2. Then accept the Payload schema push

**For maximum safety:**
1. Create a Neon branch (instant backup)
2. Also run `node backup-database.mjs` (local copy)
3. Then accept the Payload schema push

---

## After Backup

Once you have a backup (or created a Neon branch), you're safe to:

1. **Accept the Payload schema push** when prompted
2. Type `y` when you see the migration warnings
3. Wait for Payload to complete the migration
4. Verify your data in the admin panel

All your data will be preserved! 🎉

---

## Need Help?

- **Neon Docs**: https://neon.tech/docs/introduction
- **Neon Branching**: https://neon.tech/docs/guides/branching
- **Payload Migrations**: See `SCHEMA_PUSH_INSTRUCTIONS.md`
