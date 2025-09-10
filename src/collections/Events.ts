import type { CollectionConfig } from 'payload'
import { checkRole } from './users/access/checkRole'
import type { User } from '@/payload-types'
import { anyone } from './users/access/anyone'
import editor from './users/access/editor'

export const Events: CollectionConfig = {
  slug: 'events',
  labels: {
    singular: 'Event',
    plural: 'Events',
  },
  access: {
    // Only admins & editors can create, read, update, delete events
    create: editor,
    read: anyone,
    update: editor,
    delete: editor,
  },
  admin: {
    useAsTitle: 'title',
    description: 'Events and meetups',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Event Title',
      required: true,
    },
    {
      name: 'date',
      type: 'date',
      label: 'Event Date',
      required: true,
    },
    {
      name: 'location',
      type: 'text',
      label: 'Event Location',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Event Description',
      required: true,
    },
    {
      name: 'organizer',
      type: 'text',
      label: 'Event Organizer',
      required: true,
    },
    {
      name: 'featuredImage',
      type: 'upload',
      label: 'Featured Image',
      relationTo: 'media',
      required: true,
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
}
