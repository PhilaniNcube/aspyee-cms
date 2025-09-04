'use server'

import { getPayload } from 'payload'
import { headers as getHeaders } from 'next/headers'
import config from '@payload-config'

export async function addBookmark(resourceId: number) {
  const headers = await getHeaders()
  const payload = await getPayload({ config })
  const { user } = await payload.auth({ headers })

  if (!user) {
    return null
  }

  const bookmark = await payload.create({
    collection: 'bookmarks',
    data: {
      user: user.id,
      resource: resourceId,
    },
  })

  return bookmark
}

export async function removeBookmark(resourceId: number) {
  const headers = await getHeaders()
  const payload = await getPayload({ config })
  const { user } = await payload.auth({ headers })

  if (!user) {
    return null
  }

  const bookmark = await payload.delete({
    collection: 'bookmarks',
    id: resourceId,
    user: user.id,
  })

  return bookmark
}
