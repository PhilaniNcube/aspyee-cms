/**
 * Database Backup Script using Node.js
 * Works on Windows, Mac, and Linux
 *
 * Creates a backup of your Neon PostgreSQL database before localization migration
 */

import { exec } from 'child_process'
import { promisify } from 'util'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const execAsync = promisify(exec)

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[36m',
}

async function createBackup() {
  console.log('================================================')
  console.log('ASPYEE CMS Database Backup')
  console.log('================================================\n')

  // Create backups directory
  const backupDir = path.join(__dirname, 'backups')
  if (!fs.existsSync(backupDir)) {
    console.log(`${colors.blue}Creating backups directory...${colors.reset}`)
    fs.mkdirSync(backupDir, { recursive: true })
  }

  // Generate backup filename with timestamp
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5)
  const backupFile = path.join(backupDir, `backup_before_localization_${timestamp}.sql`)

  // Get database URL from environment
  const databaseUrl = process.env.DATABASE_URL_UNPOOLED || process.env.POSTGRES_URL_NON_POOLING

  if (!databaseUrl) {
    console.error(
      `${colors.red}Error: DATABASE_URL_UNPOOLED not found in environment!${colors.reset}`,
    )
    console.log('\nMake sure your .env.local file is loaded.')
    process.exit(1)
  }

  // Parse database URL
  const dbUrl = new URL(databaseUrl)
  console.log(`${colors.blue}Database:${colors.reset} ${dbUrl.pathname.slice(1)}`)
  console.log(`${colors.blue}Host:${colors.reset} ${dbUrl.hostname}`)
  console.log(`${colors.blue}User:${colors.reset} ${dbUrl.username}`)
  console.log(`${colors.blue}Backup file:${colors.reset} ${backupFile}\n`)

  // Check if pg_dump is available
  try {
    await execAsync('pg_dump --version')
  } catch (error) {
    console.error(`${colors.red}Error: pg_dump is not installed!${colors.reset}\n`)
    console.log('You have three options:\n')
    console.log('1. Install PostgreSQL client tools:')
    console.log('   - Windows: https://www.postgresql.org/download/windows/')
    console.log('   - Mac: brew install postgresql')
    console.log('   - Linux: sudo apt-get install postgresql-client\n')
    console.log('2. Use Neon Console to create a branch (instant backup):')
    console.log('   - Visit: https://console.neon.tech/')
    console.log('   - Go to your project')
    console.log('   - Click "Branches" → "Create Branch"\n')
    console.log('3. Continue without backup (Payload migration is safe):\n')
    process.exit(1)
  }

  console.log(`${colors.yellow}Creating backup...${colors.reset}\n`)

  try {
    // Set password environment variable
    const env = {
      ...process.env,
      PGPASSWORD: dbUrl.password,
    }

    // Run pg_dump
    const command = `pg_dump -h ${dbUrl.hostname} -U ${dbUrl.username} -d ${dbUrl.pathname.slice(1)} --no-password`

    const { stdout, stderr } = await execAsync(command, { env, maxBuffer: 50 * 1024 * 1024 })

    // Write backup to file
    fs.writeFileSync(backupFile, stdout)

    if (stderr && !stderr.includes('WARNING')) {
      console.warn(`${colors.yellow}Warnings: ${stderr}${colors.reset}`)
    }

    // Get file size
    const stats = fs.statSync(backupFile)
    const fileSize = (stats.size / 1024 / 1024).toFixed(2)

    console.log(`${colors.green}✓ Backup created successfully!${colors.reset}\n`)
    console.log(`${colors.green}Backup location:${colors.reset} ${backupFile}`)
    console.log(`${colors.green}Backup size:${colors.reset} ${fileSize} MB\n`)

    // Check backup contents
    const backupContent = fs.readFileSync(backupFile, 'utf-8')
    const hasResources = backupContent.includes('COPY public.resources')
    const hasBlogs = backupContent.includes('COPY public.blogs')
    const hasEvents = backupContent.includes('COPY public.events')

    console.log(`${colors.blue}Backup contains:${colors.reset}`)
    if (hasResources) console.log('  ✓ Resources data')
    if (hasBlogs) console.log('  ✓ Blogs data')
    if (hasEvents) console.log('  ✓ Events data')
    console.log('')

    console.log(`${colors.green}================================================${colors.reset}`)
    console.log(`${colors.green}Backup Complete!${colors.reset}`)
    console.log(`${colors.green}================================================${colors.reset}\n`)

    console.log('You can now safely proceed with the localization migration.\n')
    console.log('To restore from this backup (if needed):')
    console.log(
      `${colors.yellow}  node restore-database.js ${path.basename(backupFile)}${colors.reset}\n`,
    )
  } catch (error) {
    console.error(`${colors.red}✗ Backup failed!${colors.reset}\n`)
    console.error('Error:', error.message)
    console.log('\nPlease check:')
    console.log('1. Database connection details are correct')
    console.log('2. You have network access to the database')
    console.log('3. Your database credentials are valid\n')
    process.exit(1)
  }
}

// Run backup
createBackup().catch(console.error)
