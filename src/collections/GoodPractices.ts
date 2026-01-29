import { slugField, type CollectionConfig } from 'payload'
import { FixedToolbarFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import { anyone } from './users/access/anyone'
import editor from './users/access/editor'

export const GoodPractices: CollectionConfig = {
  slug: 'good-practices',

  labels: {
    singular: 'Good Practice',
    plural: 'Good Practices',
  },
  access: {
    // Only admins & editors can create, update, delete good practices
    create: editor,
    read: anyone,
    update: editor,
    delete: editor,
  },
  admin: {
    useAsTitle: 'title',
    description: 'Collection of good practices and case studies',
    defaultColumns: ['title', 'author', 'publicationDate', 'published'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
    },
     slugField(),
    {
      name: 'image',
      label: 'Featured Image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'content',
      label: 'Content',
      type: 'richText',
      required: true,
      localized: true,
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [...defaultFeatures, FixedToolbarFeature()],
      }),
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'users',
      required: true,
    },
    {
      name: 'publicationDate',
      label: 'Publication Date',
      type: 'date',
      required: true,
    },
    {
      name: 'originalLink',
      type: 'text',
      label: 'Original Link',
      required: false,
      admin: { 
        description: 'Link to the original source if applicable' 
      },
      validate: (value: string | null | undefined) => {
        if (value) {
          try {
            new URL(value)
            return true
          } catch {
            return 'Please enter a valid URL'
          }
        }
        return true
      },
    },
    {
      name: 'published',
      type: 'checkbox',
      label: 'Published',
      defaultValue: false,
    },
  ],
  timestamps: true,
}
