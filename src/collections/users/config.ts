import type { CollectionConfig } from 'payload'
import { protectRoles } from './hooks/protectRoles'
import editor from './access/editor'
import user from './access/user'
import admin from './access/admin'
import { checkRole } from './access/checkRole'
import { User } from '@/payload-types'
import { anyone } from './access/anyone'
import { select } from 'node_modules/payload/dist/fields/validations'

export const Users: CollectionConfig = {
  slug: 'users',
  access: {
    create: editor,
    read: user,
    // Allow admins to update any user, otherwise only allow a user to update their own profile
    update: anyone,
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
    {
      name: 'firstName',
      type: 'text',
      label: 'First Name',
    },
    {
      name: 'lastName',
      type: 'text',
      label: 'Last Name',
    },
    {
      name: 'bio',
      type: 'textarea',
      label: 'Bio',
    },
    {
      name: 'phoneNumber',
      type: 'text',
      label: 'Phone Number',
    },

    {
      name: 'social_links',
      type: 'array',
      label: 'Social Links',
      fields: [
        {
          name: 'platform',
          type: 'text',
          label: 'Platform',
        },
        {
          name: 'url',
          type: 'text',
          label: 'URL',
        },
      ],
    },
  ],
}
