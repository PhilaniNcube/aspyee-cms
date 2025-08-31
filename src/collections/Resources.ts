import type { CollectionConfig } from 'payload'

export const Resources: CollectionConfig = {
  slug: 'resources',
  labels: {
    singular: 'Resource',
    plural: 'Resources',
  },
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      required: true,
    },
    {
      name: 'type',
      label: 'Resource Type',
      type: 'select',
      options: [
        { label: 'Framework/Standard', value: 'framework' },
        { label: 'Report/Data', value: 'report' },
        { label: 'Toolkit/Guide', value: 'toolkit' },
        { label: 'Policy/Strategy', value: 'policy' },
        { label: 'Case Study / Good Practice', value: 'case_study' },
        { label: 'Evaluation Review', value: 'evaluation' },
        { label: 'Academic / Research Paper', value: 'academic' },
      ],
      required: true,
    },
    {
      name: 'good_practice',
      label: 'Good Practice',
      type: 'radio',
      options: [
        { label: 'Yes', value: 'yes' },
        { label: 'No', value: 'no' },
      ],
      required: true,
    },
    {
      name: 'themes',
      label: 'Themes',
      type: 'select',
      hasMany: true,
      admin: {
        description: 'Select up to 3 themes',
      },
      validate: (value) => {
        if (value && value.length > 3) {
          return 'Please select a maximum of 3 themes'
        }
        return true
      },
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
        { label: 'Labour migration & mobility', value: 'Labour migration & mobility' },
        { label: 'Digital skills & future of work', value: 'Digital skills & future of work' },
        { label: 'Education systems & policy', value: 'Education systems & policy' },
        { label: 'Financing & investment in skills', value: 'Financing & investment in skills' },
        { label: 'Informal sector & livelihoods', value: 'Informal sector & livelihoods' },
        { label: 'Green skills / sustainability', value: 'Green skills / sustainability' },
        { label: 'Innovation & partnerships', value: 'Innovation & partnerships' },
      ],
    },
    {
      name: 'target_groups',
      label: 'Target Groups',
      type: 'select',
      hasMany: true,
      admin: {
        description: 'Select up to 3 target groups',
      },
      validate: (value) => {
        if (value && value.length > 3) {
          return 'Please select a maximum of 3 target groups'
        }
        return true
      },
      options: [
        { label: 'Policymakers', value: 'Policymakers' },
        { label: 'Educators & Implementers', value: 'Educators & Implementers' },
        { label: 'Youth', value: 'Youth' },
        { label: 'Private Sector / Employers', value: 'Private Sector / Employers' },
        { label: 'Researchers', value: 'Researchers' },
        { label: 'TVET Managers / Principals', value: 'TVET Managers / Principals' },
        { label: 'HR / Labour Market Actors', value: 'HR / Labour Market Actors' },
        { label: 'Donors & Development Partners', value: 'Donors & Development Partners' },
      ],
    },
    {
      name: 'language',
      label: 'Language',
      type: 'select',
      options: [
        { label: 'English', value: 'English' },
        { label: 'French', value: 'French' },
        { label: 'Portuguese', value: 'Portuguese' },
        { label: 'Arabic', value: 'Arabic' },
        { label: 'Other (if multilingual or unspecified)', value: 'Other' },
      ],
      required: true,
    },
    {
      name: 'country_region',
      label: 'Country / Region',
      type: 'relationship',
      relationTo: 'countries',
      required: true,
      admin: {
        description: 'Select the country or region this resource applies to',
      },
    },
    {
      name: 'year_published',
      label: 'Year Published',
      type: 'number',
      admin: {
        description: 'Enter the year the resource was published',
        step: 1,
        placeholder: 'e.g., 2024',
      },
      validate: (value: number | null | undefined) => {
        if (value && (value < 1900 || value > new Date().getFullYear() + 1)) {
          return `Year must be between 1900 and ${new Date().getFullYear() + 1}`
        }
        return true
      },
    },
    {
      name: 'publisher',
      label: 'Publisher',
      type: 'select',
      hasMany: false,
      admin: {
        description: 'Select a publisher or choose "Other" to enter a custom publisher',
        isClearable: true,
      },
      options: [
        { label: 'African Union (AU)', value: 'African Union' },
        { label: 'International Labour Organization (ILO)', value: 'ILO' },
        { label: 'UNESCO', value: 'UNESCO' },
        { label: 'World Bank', value: 'World Bank' },
        { label: 'African Development Bank (AfDB)', value: 'African Development Bank' },
        { label: 'UN Economic Commission for Africa (UNECA)', value: 'UNECA' },
        { label: 'UNICEF', value: 'UNICEF' },
        { label: 'UNDP', value: 'UNDP' },
        { label: 'GIZ', value: 'GIZ' },
        { label: 'British Council', value: 'British Council' },
        { label: 'European Union', value: 'European Union' },
        { label: 'USAID', value: 'USAID' },
        { label: 'Other', value: 'Other' },
      ],
    },
    {
      name: 'custom_publisher',
      label: 'Custom Publisher',
      type: 'text',
      admin: {
        description: 'Enter custom publisher name (only if "Other" is selected above)',
        condition: (data) => data.publisher === 'Other',
      },
    },
    {
      name: 'featured_image',
      label: 'Featured Image',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Upload a featured image for this resource',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'link',
      type: 'text',
      required: true,
    },
  ],
}
