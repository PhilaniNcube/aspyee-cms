import type { CollectionConfig } from 'payload'
import { checkRole } from './users/access/checkRole'
import type { User } from '@/payload-types'
import { anyone } from './users/access/anyone'

// Tracks each time a resource file is downloaded. A record = (resource, user?, ip, userAgent)
// Creating a download entry automatically increments the related Resource.download_count.
export const Downloads: CollectionConfig = {
  slug: 'downloads',
  labels: { singular: 'Download', plural: 'Downloads' },
  access: {
    // Any user (including unauthenticated) can create a download record via public route
    // We'll allow create for anyone; if you want to restrict to logged-in only change to !!user
    create: anyone,
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
        const log = (level: 'info' | 'error' | 'warn', msg: string, meta?: any) => {
          const logger: any = (req as any).payload?.logger
          if (logger && typeof logger[level] === 'function') {
            logger[level](meta || {}, msg)
          } else {
            // Fallback to console
            // eslint-disable-next-line no-console
            console.log(`[downloads.beforeChange][${level}] ${msg}`, meta || '')
          }
        }
        log('info', 'beforeChange hook triggered', { operation, incomingData: data })
        if (operation === 'create') {
          if (req.user) {
            data.user = req.user.id
            log('info', 'Attached user to download record', { userId: req.user.id })
          }
          // Support both Fetch API style Headers (req.headers.get) and Node/Express object style (req.headers['header-name'])
          const getHeader = (name: string): string | undefined => {
            try {
              if (typeof (req as any).headers?.get === 'function') {
                return (req as any).headers.get(name) || undefined
              }
              const h = (req as any).headers?.[name] || (req as any).headers?.[name.toLowerCase()]
              return Array.isArray(h) ? h[0] : h
            } catch {
              return undefined
            }
          }
          const xff = getHeader('x-forwarded-for')
          const ua = getHeader('user-agent')
          if (xff) data.ip = xff.split(',')[0].trim()
          if (ua) data.userAgent = ua
          log('info', 'Captured request metadata', { ip: data.ip, userAgent: data.userAgent })
        }
        return data
      },
    ],
    afterChange: [
      async ({ doc, req, operation }) => {
        const log = (level: 'info' | 'error' | 'warn', msg: string, meta?: any) => {
          const logger: any = (req as any).payload?.logger
          if (logger && typeof logger[level] === 'function') {
            logger[level](meta || {}, msg)
          } else {
            // eslint-disable-next-line no-console
            console.log(`[downloads.afterChange][${level}] ${msg}`, meta || '')
          }
        }
        log('info', 'afterChange hook triggered', { operation, docId: doc.id })
        if (operation === 'create') {
          const resourceIdRaw: any =
            doc && doc.resource && typeof doc.resource === 'object'
              ? (doc.resource as any).id
              : (doc as any).resource
          const resourceId = resourceIdRaw != null ? String(resourceIdRaw) : undefined
          log('info', 'Resolved resourceId for increment', { resourceId })
          if (!resourceId) return

          // Run increment async (non-blocking) to avoid potential transaction deadlock / hang
          process.nextTick(async () => {
            const started = Date.now()
            log('info', 'Increment task started', { resourceId })
            try {
              const resource: any = await req.payload.findByID({
                collection: 'resources',
                id: resourceId,
                overrideAccess: true,
                showHiddenFields: true,
              })
              log('info', 'Fetched resource for increment', {
                resourceId,
                currentDownloadCount: resource?.download_count,
              })
              const current = resource?.download_count || 0
              await req.payload.update({
                collection: 'resources',
                id: resourceId,
                overrideAccess: true,
                data: { download_count: current + 1 },
              })
              log('info', 'Incremented resource download_count', {
                resourceId,
                previous: current,
                next: current + 1,
                ms: Date.now() - started,
              })
            } catch (e) {
              const errMsg = (e as any)?.message
              log('error', 'Increment task failed', { resourceId, error: errMsg })
              try {
                ;(req as any).payload?.logger?.error?.(
                  { err: e, resourceId },
                  'Failed to increment resource download count (async)',
                )
              } catch (_) {
                /* noop */
              }
            }
          })
        } else {
          log('info', 'afterChange operation not create; skipping increment', { operation })
        }
      },
    ],
  },
  timestamps: true,
}

export default Downloads
