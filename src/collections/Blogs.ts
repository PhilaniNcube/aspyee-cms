import type { CollectionConfig } from 'payload'
import { checkRole } from './users/access/checkRole'
import type { User } from '@/payload-types'
import { FixedToolbarFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import { anyone } from './users/access/anyone'
import editor from './users/access/editor'

export const Blogs: CollectionConfig = {
  slug: 'blogs',
  labels: {
    singular: 'Blog',
    plural: 'Blogs',
  },
  access: {
    // Only admins & editors can create, read, update, delete blogs
    create: editor,
    read: anyone,
    update: editor,
    delete: editor,
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
      //   automatically generate slug from title and make it read-only in the admin
      admin: {
        // position: 'sidebar',
        readOnly: true,
        hidden: true,
      },
      hooks: {
        beforeChange: [
          ({ data, originalDoc }) => {
            if (
              data &&
              !data.slug &&
              data.title &&
              (!originalDoc || data.title !== originalDoc.title)
            ) {
              data.slug = data.title
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/^-+|-+$/g, '')
                .substring(0, 200) // limit slug length
            }
          },
        ],
      },
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
      name: 'publishedDate',
      label: 'Published Date',
      type: 'date',
      // required: true,
    },
    {
      name: 'topic',
      type: 'select',
      label: 'Topic',
      options: [
        'Labour Market Information',
        'Private sector engagement and collaboration',
        'Digitalization of TVET',
        'Employment promotion',
        'TVET Delivery and Structures',
        'Inclusiveness',
      ],
    },
    {
      name: 'focusArea',
      type: 'select',
      label: 'Focus Area',
      options: [
        'ACQF',
        'ATVET4Women',
        'Private sector engagement',
        'Skill and Labour migration',
        'Skills Anticipation',
        'SIFA',
        'N/A',
      ],
    },
    {
      name: 'contentType',
      type: 'select',
      label: 'Content Type',
      options: [
        'Article',
        'Knowledge Brief',
        'Infographic',
        'Toolkit',
        'Report',
        'Publication',
        'Policy Brief',
        'Podcast',
        'Newsletter',
        'Learning Tool',
        'Guidline',
        'Factsheet',
        'Case Study',
        'Brochure',
        'Projects',
        'Content',
        'Video',
      ],
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
    {
      name: 'sourceLink',
      type: 'text',
      label: 'Source Link',
      required: false,
      admin: { description: 'Link to the original source if applicable' },
      // make sure it's a valid URL
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
    {
      name: 'tags',
      type: 'array',
      label: 'Event Tags',
      minRows: 1,
      maxRows: 5,
      fields: [
        {
          name: 'tag',
          type: 'text',
          label: 'Tag',
          required: true,
        },
      ],
    },
  ],
  timestamps: true,
}
