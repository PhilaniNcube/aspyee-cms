import { NextRequest, NextResponse } from 'next/server'
import payload from 'payload'
import config from '@payload-config'
import seedCountries from '@/migrations/20250831_countries_seed'

let _initialized = false

// Optional simple auth: set SEED_TOKEN in env and require ?token=... query
function authorize(req: NextRequest) {
  const expected = process.env.SEED_TOKEN
  if (!expected) return true // no token required
  const provided = req.nextUrl.searchParams.get('token') || req.headers.get('x-seed-token')
  return provided === expected
}

export async function POST(req: NextRequest) {
  if (!authorize(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  try {
    if (!_initialized) {
      console.log('[seed-countries] Initializing Payload')
      await payload.init({ config })
      _initialized = true
    }
    const result = await seedCountries(payload)
    return NextResponse.json({ ok: true, ...result })
  } catch (e: any) {
    console.error('[seed-countries] Error seeding countries', e)
    return NextResponse.json({ ok: false, error: e?.message || 'Unknown error' }, { status: 500 })
  }
}

export const dynamic = 'force-dynamic'

export async function GET() {
  return NextResponse.json({ ok: true, message: 'seed-countries route reachable' })
}
