import type { CollectionConfig } from 'payload'
import admin from './users/access/admin'

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
        },
        {
          name: 'heroSubtitle',
          type: 'text',
          required: true,
          label: 'Hero Subtitle',
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
            },
            {
              name: 'description',
              type: 'textarea',
              label: 'Description',
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
            },
            {
              name: 'description',
              type: 'textarea',
              label: 'Description',
              required: true,
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
}
