import { revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

/**
 * Cache revalidation endpoint — lives at /revalidate (NOT under /api)
 * because Payload CMS intercepts all /api/* routes.
 *
 * Usage:
 *   GET /revalidate?tag=news-and-events-page
 *   GET /revalidate?tag=all
 *   GET /revalidate?tag=news-and-events-page&secret=<REVALIDATE_SECRET>
 *
 * Set REVALIDATE_SECRET in your production environment variables to secure it.
 */

const KNOWN_TAGS = ['news-and-events-page']

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const secret = searchParams.get('secret')
  const tag = searchParams.get('tag')

  const configuredSecret = process.env.REVALIDATE_SECRET
  if (configuredSecret && secret !== configuredSecret) {
    return NextResponse.json({ error: 'Invalid secret' }, { status: 401 })
  }

  if (!tag) {
    return NextResponse.json(
      { error: 'Provide ?tag=<cache-tag> or ?tag=all', knownTags: KNOWN_TAGS },
      { status: 400 },
    )
  }

  // Use a plain string[] so TypeScript uses the single-arg revalidateTag overload.
  // (Using `as const` arrays causes TS to pick a different overload in Next.js 16.)
  const tagsToRevalidate: string[] = tag === 'all' ? [...KNOWN_TAGS] : [tag]

  for (const t of tagsToRevalidate) {
    revalidateTag(t, 'all')
  }

  return NextResponse.json({
    revalidated: tagsToRevalidate,
    message: `Cache cleared for: ${tagsToRevalidate.join(', ')}. The next page load will fetch fresh data.`,
    timestamp: new Date().toISOString(),
  })
}
