import type { CollectionConfig } from 'payload'
import { checkRole } from './users/access/checkRole'
import type { User } from '@/payload-types'

// List of countries for user profile selection
export const Countries: CollectionConfig = {
  slug: 'countries',
  labels: { singular: 'Country', plural: 'Countries' },
  access: {
    // Anyone can read the list of countries
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Country Name',
    },
    {
      name: 'code',
      type: 'text',
      label: 'Country Code',
    },
  ],
}
