/**
 * fix-media-urls.mjs
 *
 * Finds all Payload media records whose `url` field contains a local path
 * (/api/media/file/...) instead of a UploadThing CDN URL, matches them to
 * their counterpart file on UploadThing by filename, then updates the
 * database record with the correct CDN URL.
 *
 * Usage:
 *   node fix-media-urls.mjs                          # preview all matches (dry run)
 *   node fix-media-urls.mjs --apply                  # write all matches to DB
 *
 *   # Fix a single record when you already have the correct URL:
 *   node fix-media-urls.mjs --fix-one --filename="namibia_.webp" --url="https://4kav3digtb.ufs.sh/f/..."
 *   node fix-media-urls.mjs --fix-one --id=123       --url="https://4kav3digtb.ufs.sh/f/..."
 */

import pg from 'pg'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

// ── Config ────────────────────────────────────────────────────────────────────

const DRY_RUN = !process.argv.includes('--apply')
const UPLOADTHING_TOKEN = process.env.UPLOADTHING_TOKEN
const DATABASE_URL = process.env.DATABASE_URL

if (!UPLOADTHING_TOKEN) {
  console.error('❌  UPLOADTHING_TOKEN is not set in .env.local')
  process.exit(1)
}

if (!DATABASE_URL) {
  console.error('❌  DATABASE_URL is not set in .env.local')
  process.exit(1)
}

// Decode the base64 token to extract the API key and app ID
let API_KEY, APP_ID
try {
  const decoded = JSON.parse(Buffer.from(UPLOADTHING_TOKEN, 'base64').toString('utf-8'))
  API_KEY = decoded.apiKey
  APP_ID = decoded.appId
} catch {
  console.error('❌  Could not decode UPLOADTHING_TOKEN.')
  process.exit(1)
}

// ── UploadThing helpers ───────────────────────────────────────────────────────

/** Fetches ALL files from UploadThing, handling pagination. */
async function listUploadThingFiles() {
  const allFiles = []
  let cursor = undefined

  do {
    const body = { limit: 500, ...(cursor ? { cursor } : {}) }

    const res = await fetch('https://api.uploadthing.com/v6/listFiles', {
      method: 'POST',
      headers: {
        'x-uploadthing-api-key': API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })

    if (!res.ok) {
      const text = await res.text()
      throw new Error(`UploadThing API ${res.status}: ${text}`)
    }

    const data = await res.json()
    allFiles.push(...(data.files ?? []))
    cursor = data.nextCursor ?? undefined
  } while (cursor)

  return allFiles
}

/** Builds the public CDN URL for a UploadThing file key */
const cdnUrl = (key) => `https://${APP_ID}.ufs.sh/f/${key}`

/** Safely decodes a URI component, returning the original string on failure */
const safeDecode = (str) => {
  try { return decodeURIComponent(str) } catch { return str }
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  console.log()
  console.log('══════════════════════════════════════════════════════')
  console.log('  Payload Media URL Fixer')
  if (DRY_RUN) {
    console.log('  Mode : DRY RUN — no changes will be written')
    console.log('  Tip  : run with --apply to commit changes')
  } else {
    console.log('  Mode : APPLY — database WILL be updated')
  }
  console.log('══════════════════════════════════════════════════════')
  console.log()

  // ── 1. Connect to postgres ─────────────────────────────────────────────────
  const { Client } = pg
  const client = new Client({ connectionString: DATABASE_URL, ssl: { rejectUnauthorized: false } })
  await client.connect()
  console.log('🔌  Connected to database')

  // ── 2. Find media with local-path URLs ─────────────────────────────────────
  // Payload's Drizzle adapter names the table after the collection slug.
  // The media collection → table "media". Columns include: id, url, filename.
  const { rows: allMedia } = await client.query(`SELECT id, url, filename FROM media`)
  const localMedia = allMedia.filter(
    (row) => row.url && (row.url.startsWith('/') || !row.url.startsWith('http'))
  )

  console.log(`📂  Total media rows     : ${allMedia.length}`)
  console.log(`📂  Local-path URLs      : ${localMedia.length}`)
  console.log()

  if (localMedia.length === 0) {
    console.log('✅  No local-path media found — everything looks good!')
    await client.end()
    process.exit(0)
  }

  // ── 3. Fetch UploadThing file list ─────────────────────────────────────────
  console.log('☁️   Fetching UploadThing file list...')
  const utFiles = await listUploadThingFiles()
  console.log(`   Found ${utFiles.length} files in UploadThing`)
  console.log()

  // Build lookup: decoded-filename → { key, url }
  const utMap = new Map()
  for (const file of utFiles) {
    const url = cdnUrl(file.key)
    utMap.set(file.name, { key: file.key, url })
    utMap.set(safeDecode(file.name), { key: file.key, url })
    if (file.customId) utMap.set(file.customId, { key: file.key, url })
  }

  // ── 4. Match and update ────────────────────────────────────────────────────
  const updated = []
  const unmatched = []

  console.log('─'.repeat(54))

  for (const row of localMedia) {
    // The `url` field is something like /api/media/file/womens%20month.jpg
    // Pull the filename from the end of the path.
    const rawName = (row.url.split('/').pop() ?? '').split('?')[0]
    const decodedName = safeDecode(rawName)

    // Try decoded name first, then raw, then the stored `filename` column
    const match =
      utMap.get(decodedName) ||
      utMap.get(rawName) ||
      (row.filename ? utMap.get(row.filename) || utMap.get(safeDecode(row.filename)) : undefined)

    if (match) {
      updated.push({ id: row.id, decodedName, oldUrl: row.url, newUrl: match.url })

      if (!DRY_RUN) {
        await client.query('UPDATE media SET url = $1 WHERE id = $2', [match.url, row.id])
        console.log(`✅  Updated  : "${decodedName}"`)
      } else {
        console.log(`✅  Would update : "${decodedName}"`)
      }

      console.log(`    Old: ${row.url}`)
      console.log(`    New: ${match.url}`)
    } else {
      unmatched.push({ id: row.id, decodedName, url: row.url })
      console.log(`❌  No UT match : "${decodedName}"  (id: ${row.id})`)
      console.log(`    ${row.url}`)
    }

    console.log()
  }

  // ── 5. Summary ─────────────────────────────────────────────────────────────
  console.log('═'.repeat(54))
  console.log(`  ✅  ${DRY_RUN ? 'Would update' : 'Updated'}  : ${updated.length} record(s)`)
  console.log(`  ❌  Unmatched  : ${unmatched.length} record(s)`)
  console.log()

  if (unmatched.length > 0) {
    console.log('These files have no UploadThing match.')
    console.log('Re-upload them through the Payload admin to fix them:')
    unmatched.forEach((f) =>
      console.log(`  • ${f.decodedName}  (db id: ${f.id})`)
    )
    console.log()
  }

  if (DRY_RUN && updated.length > 0) {
    console.log('Run again with --apply to commit these changes:')
    console.log('  node fix-media-urls.mjs --apply')
    console.log()
  }

  await client.end()
  process.exit(0)
}

// ── --fix-one mode ────────────────────────────────────────────────────────────

async function fixOne({ filename, id, newUrl }) {
  if (!newUrl) {
    console.error('❌  --url is required for --fix-one mode')
    process.exit(1)
  }
  if (!filename && !id) {
    console.error('❌  Provide either --filename="..." or --id=<number> for --fix-one mode')
    process.exit(1)
  }

  const { Client } = pg
  const client = new Client({ connectionString: DATABASE_URL, ssl: { rejectUnauthorized: false } })
  await client.connect()

  let row
  if (id) {
    const { rows } = await client.query('SELECT id, url, filename FROM media WHERE id = $1', [id])
    row = rows[0]
  } else {
    // Match by filename column or by the tail of the url path
    const { rows } = await client.query(
      `SELECT id, url, filename FROM media
       WHERE filename = $1
          OR url LIKE '%/' || $1
          OR url LIKE '%/' || encode(convert_to($1, 'UTF8'), 'escape')
       LIMIT 5`,
      [filename]
    )
    if (rows.length > 1) {
      console.log(`⚠️  Multiple records match "${filename}":`)
      rows.forEach((r) => console.log(`   id=${r.id}  url=${r.url}`))
      console.log('Re-run with --id=<number> to target a specific record.')
      await client.end()
      process.exit(1)
    }
    row = rows[0]
  }

  if (!row) {
    console.error(`❌  No media record found for ${filename ? `filename="${filename}"` : `id=${id}`}`)
    await client.end()
    process.exit(1)
  }

  console.log()
  console.log(`Found record  id=${row.id}`)
  console.log(`  filename  : ${row.filename}`)
  console.log(`  old url   : ${row.url}`)
  console.log(`  new url   : ${newUrl}`)
  console.log()

  await client.query('UPDATE media SET url = $1 WHERE id = $2', [newUrl, row.id])
  console.log(`✅  Updated successfully!`)
  console.log()

  await client.end()
  process.exit(0)
}

// ── Entry point ───────────────────────────────────────────────────────────────

// Parse named args: --key=value or --flag
const args = Object.fromEntries(
  process.argv.slice(2).map((a) => {
    const [k, ...rest] = a.replace(/^--/, '').split('=')
    return [k, rest.length ? rest.join('=') : true]
  })
)

if (args['fix-one']) {
  fixOne({ filename: args.filename, id: args.id, newUrl: args.url }).catch((err) => {
    console.error('Fatal error:', err)
    process.exit(1)
  })
} else {
  main().catch((err) => {
    console.error('Fatal error:', err)
    process.exit(1)
  })
}

