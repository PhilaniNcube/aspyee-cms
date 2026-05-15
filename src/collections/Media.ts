import type { CollectionConfig } from 'payload'
import { revalidateTag } from 'next/cache'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
  upload: {
    disableLocalStorage: true,
  },
  hooks: {
    // When a media record is saved, bust any page caches that reference it.
    afterChange: [
      () => {
        ;(revalidateTag as (tag: string) => void)('news-and-events-page')
      },
    ],
  },
}

