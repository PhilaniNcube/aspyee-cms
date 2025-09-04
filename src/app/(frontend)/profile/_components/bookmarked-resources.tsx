import React from 'react'
import { headers as getHeaders } from 'next/headers'
import { getPayload } from 'payload'
import config from '@payload-config'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { recordDownload } from '@/lib/actions/downloads'
import { redirect } from 'next/navigation'
import type { User, Bookmark, Resource } from '@/payload-types'

// Server component that fetches the current user's bookmarked resources.
// Wrapped in Suspense at usage site for streaming.
export async function BookmarkedResourcesSection() {
  const headers = await getHeaders()
  const payload = await getPayload({ config })

  // Authenticate current user
  const { user } = await payload.auth({ headers })
  if (!user) {
    return null
  }

  // Fetch bookmarks for this user including the related resource (depth=2 to resolve uploads etc.)
  const bookmarksRes = await payload.find({
    collection: 'bookmarks' as any,
    depth: 2,
    where: { user: { equals: user.id } },
    sort: '-createdAt',
    limit: 100,
  })

  console.log('Fetched bookmarks:', bookmarksRes)

  const bookmarks: Bookmark[] = (bookmarksRes as any).docs || []

  return (
    <div className="py-10 border-t">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
        <Card>
          <CardHeader>
            <CardTitle>My Bookmarked Resources</CardTitle>
            <CardDescription>
              Quick access to resources you have favourited.{' '}
              {bookmarks.length === 0 && 'You have not bookmarked any resources yet.'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {bookmarks.length === 0 ? (
              <div className="text-sm text-muted-foreground">
                Start exploring the knowledge centre and click the bookmark / favourite action on a
                resource to list it here.
              </div>
            ) : (
              <ul className="divide-y border rounded-md">
                {bookmarks.map((b) => {
                  const resource = b.resource as unknown as Resource | null
                  if (!resource) return null
                  return (
                    <li
                      key={b.id}
                      className="p-4 flex flex-col gap-2 md:flex-row md:items-start md:justify-between"
                    >
                      <div className="space-y-1 md:max-w-3xl">
                        <h3 className="font-medium leading-snug text-base">
                          {resource.title || 'Untitled Resource'}
                        </h3>
                        <p className="text-xs text-muted-foreground flex gap-2 flex-wrap">
                          {resource.type && (
                            <span className="uppercase tracking-wide">{resource.type}</span>
                          )}
                          {resource.language && <span>{resource.language}</span>}
                          {resource.year_published && <span>{resource.year_published}</span>}
                          {resource.publisher && <span>{resource.publisher}</span>}
                        </p>
                        {resource.description && (
                          <p className="text-sm line-clamp-3 text-muted-foreground">
                            {resource.description}
                          </p>
                        )}
                      </div>
                      <div className="flex gap-3 pt-2 md:pt-0">
                        {resource.link && (
                          <form
                            action={async () => {
                              'use server'
                              await recordDownload(resource.id as any)
                              // After recording, redirect to the external link
                              // (If external, next/navigation redirect still works)
                              redirect(resource.link as string)
                            }}
                          >
                            <Button type="submit" variant="secondary" size="sm">
                              Download
                            </Button>
                          </form>
                        )}
                        {/* Future: add remove bookmark action */}
                      </div>
                    </li>
                  )
                })}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default BookmarkedResourcesSection
