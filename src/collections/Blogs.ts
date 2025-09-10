import type { CollectionConfig } from 'payload'
import { checkRole } from './users/access/checkRole'
import type { User } from '@/payload-types'
import { FixedToolbarFeature, lexicalEditor } from '@payloadcms/richtext-lexical'

export const Blogs: CollectionConfig = {
  slug: 'blogs',
  labels: {
    singular: 'Blog',
    plural: 'Blogs',
  },
  access: {
    // Only admins & editors can create, read, update, delete blogs
    create: ({ req: { user } }) => checkRole(['admin', 'editor'], user as User),
    read: ({ req: { user } }) => checkRole(['admin', 'editor', 'user'], user as User),
    update: ({ req: { user } }) => checkRole(['admin', 'editor'], user as User),
    delete: ({ req: { user } }) => checkRole(['admin', 'editor'], user as User),
  },
  admin: {
    useAsTitle: 'title',
    description: 'Blog posts and articles',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'users',
      required: true,
    },
    {
      name: 'excerpt',
      label: 'Short Description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'categories',
      type: 'relationship',
      relationTo: 'categories',
      hasMany: true,
    },
    {
      name: 'content',
      label: 'Content',
      type: 'richText',
      required: true,
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [...defaultFeatures, FixedToolbarFeature()],
      }),
    },
    {
      name: 'featuredImage',
      label: 'Featured Image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
  ],
  timestamps: true,
}
