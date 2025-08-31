import type { CollectionConfig } from 'payload'

export const Countries: CollectionConfig = {
  slug: 'countries',
  labels: {
    singular: 'Country/Region',
    plural: 'Countries/Regions',
  },
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      label: 'Name',
      type: 'text',
      required: true,
    },
    {
      name: 'value',
      label: 'Value',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'type',
      label: 'Type',
      type: 'select',
      options: [
        { label: 'Continental', value: 'continental' },
        { label: 'Regional', value: 'regional' },
        { label: 'Country', value: 'country' },
      ],
      required: true,
    },
    {
      name: 'region',
      label: 'Region',
      type: 'select',
      options: [
        { label: 'Africa-wide', value: 'africa_wide' },
        { label: 'North Africa', value: 'north_africa' },
        { label: 'West Africa', value: 'west_africa' },
        { label: 'Central Africa', value: 'central_africa' },
        { label: 'East Africa', value: 'east_africa' },
        { label: 'Southern Africa', value: 'southern_africa' },
      ],
      admin: {
        condition: (data) => data.type === 'country' || data.type === 'regional',
      },
    },
  ],
}
