'use server'

import { getPayload } from 'payload'
import { headers as getHeaders } from 'next/headers'
import config from '@payload-config'

// Creates a download record for a resource (and optional file id) then returns the created doc.
export async function recordDownload(prevState: unknown, formData: FormData) {
  const headers = await getHeaders()
  const payload = await getPayload({ config })
  const { user } = await payload.auth({ headers })

  const resourceId = (formData.get('resourceId') as string) || ''
  const fileId = (formData.get('fileId') as string) || ''

  const logPrefix = '[recordDownload]'
  console.log(logPrefix, 'called with', { resourceId, fileId, user: user?.id })

  if (!resourceId) {
    console.error(logPrefix, 'Missing resourceId')
    throw new Error('Resource ID is required to record a download')
  }
  if (!fileId) {
    console.error(logPrefix, 'Missing fileId')
    throw new Error('File ID is required to record a download')
  }

  // Resources collection appears to use numeric IDs; enforce numeric conversion.
  if (!/^\d+$/.test(resourceId)) {
    console.warn(logPrefix, 'Resource ID is not numeric; creation may fail', { resourceId })
  }
  const resourceValue = parseInt(resourceId, 10)

  try {
    const created = await payload.create({
      collection: 'downloads',
      overrideAccess: true, // ensure relationship validation passes for public/anon users
      data: {
        resource: resourceValue,
        file_id: fileId,
        user: user ? user.id : undefined,
      },
    })
    console.log(logPrefix, 'Created download row', { id: created.id, resource: resourceValue })
    return { doc: created, user }
  } catch (err: any) {
    console.error(logPrefix, 'Failed to create download', {
      error: err?.message,
      stack: err?.stack,
      resourceValue,
    })
    throw err
  }
}
