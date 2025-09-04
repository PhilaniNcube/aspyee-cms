import payload from 'payload'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'
import seedCountries from '../src/migrations/20250831_countries_seed.js'
import payloadConfig from '../src/payload.config.js'

// Load env vars
const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)
dotenv.config({ path: path.resolve(dirname, '..', '.env') })

async function run() {
  try {
    await payload.init({ config: payloadConfig })
    const result = await seedCountries(payload)
    console.log(`Countries seed complete. Inserted: ${result.inserted}, Skipped: ${result.skipped}`)
  } catch (e) {
    console.error('Country seed failed', e)
    process.exitCode = 1
  } finally {
    // Ensure process exits (Payload may keep pool open)
    process.exit()
  }
}

run()
