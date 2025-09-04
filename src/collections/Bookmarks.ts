import type { CollectionConfig } from 'payload'
import { checkRole } from './users/access/checkRole'
import type { User } from '@/payload-types'

// Collection used for users to bookmark (favourite) resources they want to revisit.
// A bookmark is a (user, resource) pair. Duplicates are prevented via a hook.
// No updates are allowed: users can only create or delete their own bookmarks.
export const Bookmarks: CollectionConfig = {
  slug: 'bookmarks',
  labels: {
    singular: 'Bookmark',
    plural: 'Bookmarks',
  },
  access: {
    // Any authenticated user can create a bookmark (will be forced to themselves)
    create: ({ req: { user } }) => !!user,
    // Read: admins & editors see all; regular users only their own bookmarks
    read: ({ req: { user } }) => {
      if (!user) return false
      if (checkRole(['admin', 'editor'], user as User)) return true
      return { user: { equals: user.id } }
    },
    // Disable updates (there is nothing meaningful to edit besides deleting)
    update: () => false,
    // Delete: admins & editors can delete any; user can delete their own
    delete: ({ req: { user } }) => {
      if (!user) return false
      if (checkRole(['admin', 'editor'], user as User)) return true
      return { user: { equals: user.id } }
    },
  },
  admin: {
    useAsTitle: 'id',
    description: 'User favourites for quick access to resources',
  },
  fields: [
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      index: true,
      admin: { readOnly: true },
    },
    {
      name: 'resource',
      label: 'Resource',
      type: 'relationship',
      relationTo: 'resources',
      required: true,
      index: true,
    },
  ],
  hooks: {
    beforeValidate: [
      // Prevent duplicate bookmark per (user, resource)
      async ({ data, req, operation }) => {
        if (operation === 'create' && req.user) {
          const userId = req.user.id
          // relationship field can be object or id; normalize
          const resourceId = (
            data?.resource && typeof data.resource === 'object'
              ? (data.resource as any).id || (data.resource as any).value
              : data?.resource
          ) as string | undefined
          if (resourceId) {
            // Cast collection slug to any to satisfy TS until types are regenerated including Bookmarks
            const existing = await req.payload.find({
              collection: 'bookmarks' as any,
              where: {
                and: [{ user: { equals: userId } }, { resource: { equals: resourceId } }],
              },
              limit: 1,
            })
            if (existing.docs.length > 0) {
              throw new Error('Resource already bookmarked')
            }
          }
        }
        return data
      },
    ],
    beforeChange: [
      // Force the bookmark's user to the authenticated user on create
      ({ data, req, operation }) => {
        if (operation === 'create' && req.user) {
          return { ...data, user: req.user.id }
        }
        return data
      },
    ],
  },
  timestamps: true,
}

export default Bookmarks
