import type { CollectionConfig } from 'payload'
import { protectRoles } from './hooks/protectRoles'
import editor from './access/editor'
import user from './access/user'
import admin from './access/admin'
import { checkRole } from './access/checkRole'
import { User } from '@/payload-types'
import { anyone } from './access/anyone'
import { select } from 'node_modules/payload/dist/fields/validations'
import { COUNTRIES } from '@/migrations/20250831_countries_seed'

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
      name: 'country',
      type: 'select',
      label: 'Country',
      options: COUNTRIES.map((country) => ({
        label: country.name,
        value: country.code,
      })),
    },
    {
      name: 'language',
      type: 'select',
      label: 'Language',
      options: [
        { label: 'English', value: 'en' },
        { label: 'French', value: 'fr' },
      ],
    },
    {
      name: 'gender',
      type: 'select',
      label: 'Gender',
      options: [
        { label: 'Male', value: 'male' },
        { label: 'Female', value: 'female' },
        { label: 'Other', value: 'other' },
      ],
    },
    {
      name: 'organisation',
      type: 'text',
      label: 'Organisation',
    },
    {
      name: 'organisation_type',
      type: 'select',
      label: 'Organisation Type',
      options: [
        { label: 'Academic/Research Institution', value: 'academic' },
        { label: 'Civil Society Organisation', value: 'cso' },
        { label: 'Community-Based Organisation', value: 'cbo' },
        { label: 'Government/Public Sector', value: 'government' },
        { label: 'Non-Governmental Organisation', value: 'ngo' },
        { label: 'Non-Profit Organisation', value: 'npo' },
        { label: 'Private Sector', value: 'private' },
        { label: 'TVET Institution', value: 'tvet' },
        { label: 'Youth/Student Organisation', value: 'youth' },
        { label: 'Other', value: 'other' },
      ],
    },
    {
      name: 'areas_of_interest',
      label: 'Areas Of Interest',
      type: 'select',
      hasMany: true,

      options: [
        {
          label: 'Industrial, technical and vocational training',
          value: 'Industrial, technical and vocational training',
        },
        { label: 'Gender and Transformation', value: 'Gender and Transformation' },
        {
          label: 'Entrepreneurship and informal sector formalisation',
          value: 'Entrepreneurship and informal sector formalisation',
        },
        {
          label: 'Human Capital Development',
          value: 'Human Capital Development',
        },
        {
          label: 'Agribusiness and agricultural skills',
          value: 'Agribusiness and agricultural skills',
        },
        { label: 'Labour migration & mobility', value: 'Labour migration & mobility' },
        {
          label: 'Digital and emerging technology skills',
          value: 'Digital skills & future of work',
        },
        { label: 'Education systems & policy', value: 'Education systems & policy' },
        { label: 'Financing & investment in skills', value: 'Financing & investment in skills' },
        { label: 'Informal sector & livelihoods', value: 'Informal sector & livelihoods' },
        {
          label: 'Renewable energy and green economy training',
          value: 'Green skills / sustainability',
        },
        { label: 'Innovation & partnerships', value: 'Innovation & partnerships' },
        { label: 'Governance', value: 'Governance' },
      ],
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
