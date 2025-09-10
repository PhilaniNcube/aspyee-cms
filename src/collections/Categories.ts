import type { CollectionConfig } from 'payload'
import { checkRole } from './users/access/checkRole'
import type { User } from '@/payload-types'

export const Categories: CollectionConfig = {
  slug: 'categories',
  labels: {
    singular: 'Category',
    plural: 'Categories',
  },
  access: {
    // Only admins & editors can create, read, update, delete categories
    create: ({ req: { user } }) => checkRole(['admin', 'editor'], user as User),
    read: ({ req: { user } }) => checkRole(['admin', 'editor', 'user'], user as User),
    update: ({ req: { user } }) => checkRole(['admin', 'editor'], user as User),
    delete: ({ req: { user } }) => checkRole(['admin', 'editor'], user as User),
  },
  admin: {
    useAsTitle: 'name',
    description: 'Blog post categories',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
    },
  ],
  timestamps: true,
}
