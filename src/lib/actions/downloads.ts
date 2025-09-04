'use server'

import { getPayload } from 'payload'
import { headers as getHeaders } from 'next/headers'
import config from '@payload-config'

// Creates a download record for a resource (and optional file id) then returns the created doc.
export async function recordDownload(resourceId: number | string, fileId?: string) {
  const headers = await getHeaders()
  const payload = await getPayload({ config })
  const { user } = await payload.auth({ headers })

  const doc = await payload.create({
    collection: 'downloads',
    data: {
      // relationship field accepts id; cast for TS friendliness
      resource: resourceId as any,
      file_id: fileId,
    },
  })

  return { doc, user }
}
