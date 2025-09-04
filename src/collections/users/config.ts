import type { CollectionConfig } from 'payload'
import { protectRoles } from './hooks/protectRoles'
import editor from './access/editor'
import user from './access/user'
import admin from './access/admin'
import { checkRole } from './access/checkRole'
import { User } from '@/payload-types'

export const Users: CollectionConfig = {
  slug: 'users',
  access: {
    create: editor,
    read: user,
    update: user,
    delete: admin,
  },
  admin: {
    useAsTitle: 'email',
  },
  auth: true,
  fields: [
    // Email added by default
    {
      name: 'roles',
      type: 'select',
      options: [
        {
          label: 'Admin',
          value: 'admin',
        },
        {
          label: 'Editor',
          value: 'editor',
        },
        {
          label: 'Viewer',
          value: 'user',
        },
      ],
      hasMany: true,
      saveToJWT: true,
      hooks: {
        beforeChange: [protectRoles],
      },
      access: {
        update: ({ req: { user } }) => checkRole(['admin'], user as User),
      },
    },
  ],
}
