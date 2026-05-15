import type { CollectionConfig } from 'payload'
import { revalidateTag } from 'next/cache'
import admin from './users/access/admin'

// Bust the Next.js 'use cache' data whenever the page or its media changes.
const revalidateNewsAndEvents = () => {
  ;(revalidateTag as (tag: string) => void)('news-and-events-page')
}

export const NewsAndEventsPage: CollectionConfig = {
  slug: 'news-and-events-page',
  labels: {
    singular: 'News and Events Page',
    plural: 'News and Events Page',
  },
  access: {
    read: () => true,
    update: admin,
    delete: admin,
    create: admin,
  },
  fields: [
    {
      name: 'heroSection',
      type: 'group',
      label: 'Hero Section',
      fields: [
        {
          name: 'heroTitle',
          type: 'text',
          required: true,
          label: 'Hero Title',
          localized: true,
        },
        {
          name: 'heroSubtitle',
          type: 'text',
          required: true,
          label: 'Hero Subtitle',
          localized: true,
        },
        {
          name: 'heroImage',
          type: 'upload',
          relationTo: 'media',
          label: 'Hero Image',
          required: true,
        },
      ],
    },
    {
      name: 'latestNewsSection',
      type: 'group',
      label: 'Latest News Section',
      fields: [
        {
          name: 'sectionTitle',
          type: 'text',
          required: true,
          label: 'Section Title',
          localized: true,
        },
        {
          name: 'fullWidthSection',
          type: 'group',
          label: 'Full Width Section',
          fields: [
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              label: 'Background Image',
            },
            {
              name: 'title',
              type: 'text',
              label: 'Title',
              localized: true,
            },
            {
              name: 'description',
              type: 'textarea',
              label: 'Description',
              localized: true,
            },
            {
              name: 'link',
              type: 'text',
              label: 'Link URL',
            },
            {
              name: 'badgeText',
              type: 'text',
              label: 'Badge Text',
              localized: true,
            },
          ],
        },
        {
          name: 'newsItems',
          type: 'array',
          label: 'News Items',
          fields: [
            {
              name: 'title',
              type: 'text',
              label: 'Title',
              required: true,
              localized: true,
            },
            {
              name: 'description',
              type: 'textarea',
              label: 'Description',
              required: true,
              localized: true,
            },
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              label: 'Image',
              required: true,
            },
            {
              name: 'link',
              type: 'text',
              label: 'Link URL',
              required: true,
            },
          ],
        },
      ],
    },
    {
      name: 'twitterFeed',
      type: 'array',
      label: 'Twitter Feed',
      fields: [
        {
          name: 'tweet',
          type: 'textarea',
          label: 'Tweet',
          required: true,
          localized: true,
        },
        {
          name: 'author',
          type: 'text',
          label: 'Author',
          required: true,
        },
        {
          name: 'date',
          type: 'date',
          label: 'Date',
          required: true,
        },
        {
          name: 'avatar',
          type: 'upload',
          relationTo: 'media',
          label: 'Author Avatar',
        },
      ],
    },
  ],
  hooks: {
    afterChange: [() => revalidateNewsAndEvents()],
    afterDelete: [() => revalidateNewsAndEvents()],
  },
}
