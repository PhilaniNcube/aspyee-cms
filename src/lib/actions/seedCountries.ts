'use server'
import payload from 'payload'
import config from '@payload-config'
import seedCountries from '@/migrations/20250831_countries_seed'

let _initialized = false

export async function runCountrySeed() {
  if (!_initialized) {
    await payload.init({ config })
    _initialized = true
  }
  return seedCountries(payload)
}
