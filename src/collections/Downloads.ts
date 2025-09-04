import type { CollectionConfig } from 'payload'
import { checkRole } from './users/access/checkRole'
import type { User } from '@/payload-types'

// Tracks each time a resource file is downloaded. A record = (resource, user?, ip, userAgent)
// Creating a download entry automatically increments the related Resource.download_count.
export const Downloads: CollectionConfig = {
  slug: 'downloads',
  labels: { singular: 'Download', plural: 'Downloads' },
  access: {
    // Any user (including unauthenticated) can create a download record via public route
    // We'll allow create for anyone; if you want to restrict to logged-in only change to !!user
    create: () => true,
    // Read: admins & editors can see all; regular users none (prevent data leak of IPs etc)
    read: ({ req: { user } }) => {
      if (!user) return false
      if (checkRole(['admin', 'editor'], user as User)) return true
      return false
    },
    // No updates or deletes from standard UI; only admins can delete
    update: () => false,
    delete: ({ req: { user } }) => (user ? checkRole(['admin'], user as User) : false),
  },
  admin: {
    useAsTitle: 'id',
    description: 'Audit log of resource downloads',
    defaultColumns: ['resource', 'user', 'ip', 'createdAt'],
  },
  fields: [
    {
      name: 'resource',
      label: 'Resource',
      type: 'relationship',
      relationTo: 'resources',
      required: true,
      index: true,
    },
    {
      name: 'user',
      label: 'User',
      type: 'relationship',
      relationTo: 'users',
      required: false,
      index: true,
      admin: { readOnly: true },
    },
    {
      name: 'file_id',
      label: 'File ID',
      type: 'text',
      admin: { description: 'ID of the specific media file downloaded (if applicable)' },
    },
    {
      name: 'ip',
      label: 'IP Address',
      type: 'text',
      admin: { readOnly: true },
    },
    {
      name: 'userAgent',
      label: 'User Agent',
      type: 'text',
      admin: { readOnly: true },
    },
  ],
  hooks: {
    beforeChange: [
      async ({ data, req, operation }) => {
        if (operation === 'create') {
          if (req.user) {
            data.user = req.user.id
          }
          const xff = req.headers.get ? req.headers.get('x-forwarded-for') : undefined
          const ua = req.headers.get ? req.headers.get('user-agent') : undefined
          if (xff) data.ip = xff.split(',')[0].trim()
          if (ua) data.userAgent = ua
        }
        return data
      },
    ],
    afterChange: [
      async ({ doc, req, operation }) => {
        if (operation === 'create') {
          const resourceId = (
            doc.resource && typeof doc.resource === 'object'
              ? (doc.resource as any).id
              : doc.resource
          ) as string
          if (resourceId) {
            // increment the resource counter via update
            try {
              const resource = await req.payload.findByID({
                collection: 'resources',
                id: resourceId,
              })
              const current = (resource as any).download_count || 0
              await (req.payload as any).update({
                collection: 'resources',
                id: resourceId,
                data: { download_count: current + 1 },
              })
            } catch (e) {
              req.payload.logger.error('Failed to increment resource download count', e)
            }
          }
        }
      },
    ],
  },
  timestamps: true,
}

export default Downloads
