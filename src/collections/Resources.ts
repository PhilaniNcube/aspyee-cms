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
      index: true,
      options: [
        { label: 'Academic / Research Paper', value: 'academic' },
        { label: 'Case Study / Good Practice', value: 'case_study' },
        { label: 'Evaluation Review', value: 'evaluation' },
        { label: 'Framework/Standard', value: 'framework' },
        { label: 'Multimedia', value: 'multimedia' },
        { label: 'Policy/Strategy', value: 'policy' },
        { label: 'Report/Data', value: 'report' },
        { label: 'Toolkit/Guide', value: 'toolkit' },
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
        {
          label: 'Human Capital Development',
          value: 'Human Capital Development',
        },
        {
          label: 'Agribusiness and agricultural skills',
          value: 'Agribusiness and agricultural skills',
        },
        { label: 'Labour migration & mobility', value: 'Labour migration & mobility' },
        { label: 'Digital skills & future of work', value: 'Digital skills & future of work' },
        { label: 'Education systems & policy', value: 'Education systems & policy' },
        { label: 'Financing & investment in skills', value: 'Financing & investment in skills' },
        { label: 'Informal sector & livelihoods', value: 'Informal sector & livelihoods' },
        { label: 'Green skills / sustainability', value: 'Green skills / sustainability' },
        { label: 'Innovation & partnerships', value: 'Innovation & partnerships' },
        { label: 'Governance', value: 'Governance' },
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
      name: 'countries',
      label: 'Countries',
      type: 'select',
      hasMany: true,
      admin: {
        description: 'Select one or more countries this resource applies to',
      },
      options: [
        // North Africa
        { label: 'Algeria', value: 'Algeria' },
        { label: 'Egypt', value: 'Egypt' },
        { label: 'Libya', value: 'Libya' },
        { label: 'Morocco', value: 'Morocco' },
        { label: 'Sudan', value: 'Sudan' },
        { label: 'Tunisia', value: 'Tunisia' },

        // West Africa
        { label: 'Benin', value: 'Benin' },
        { label: 'Burkina Faso', value: 'Burkina_Faso' },
        { label: 'Cape Verde', value: 'Cape_Verde' },
        { label: "Côte d'Ivoire", value: 'Cote_dIvoire' },
        { label: 'Gambia', value: 'Gambia' },
        { label: 'Ghana', value: 'Ghana' },
        { label: 'Guinea', value: 'Guinea' },
        { label: 'Guinea-Bissau', value: 'Guinea_Bissau' },
        { label: 'Liberia', value: 'Liberia' },
        { label: 'Mali', value: 'Mali' },
        { label: 'Mauritania', value: 'Mauritania' },
        { label: 'Niger', value: 'Niger' },
        { label: 'Nigeria', value: 'Nigeria' },
        { label: 'Senegal', value: 'Senegal' },
        { label: 'Sierra Leone', value: 'Sierra_Leone' },
        { label: 'Togo', value: 'Togo' },

        // Central Africa
        { label: 'Cameroon', value: 'Cameroon' },
        { label: 'Central African Republic', value: 'Central_African_Republic' },
        { label: 'Chad', value: 'Chad' },
        { label: 'Democratic Republic of Congo', value: 'Democratic_Republic_of_Congo' },
        { label: 'Equatorial Guinea', value: 'Equatorial_Guinea' },
        { label: 'Gabon', value: 'Gabon' },
        { label: 'Republic of Congo', value: 'Republic_of_Congo' },
        { label: 'São Tomé and Príncipe', value: 'Sao_Tome_and_Principe' },

        // East Africa
        { label: 'Burundi', value: 'Burundi' },
        { label: 'Comoros', value: 'Comoros' },
        { label: 'Djibouti', value: 'Djibouti' },
        { label: 'Eritrea', value: 'Eritrea' },
        { label: 'Ethiopia', value: 'Ethiopia' },
        { label: 'Kenya', value: 'Kenya' },
        { label: 'Madagascar', value: 'Madagascar' },
        { label: 'Mauritius', value: 'Mauritius' },
        { label: 'Rwanda', value: 'Rwanda' },
        { label: 'Seychelles', value: 'Seychelles' },
        { label: 'Somalia', value: 'Somalia' },
        { label: 'South Sudan', value: 'South_Sudan' },
        { label: 'Tanzania', value: 'Tanzania' },
        { label: 'Uganda', value: 'Uganda' },

        // Southern Africa
        { label: 'Angola', value: 'Angola' },
        { label: 'Botswana', value: 'Botswana' },
        { label: 'Eswatini', value: 'Eswatini' },
        { label: 'Lesotho', value: 'Lesotho' },
        { label: 'Malawi', value: 'Malawi' },
        { label: 'Mozambique', value: 'Mozambique' },
        { label: 'Namibia', value: 'Namibia' },
        { label: 'South Africa', value: 'South_Africa' },
        { label: 'Zambia', value: 'Zambia' },
        { label: 'Zimbabwe', value: 'Zimbabwe' },
      ],
    },
    {
      name: 'region',
      label: 'Region',
      type: 'select',
      admin: {
        description: 'Select the regional scope this resource applies to',
      },
      options: [
        { label: 'Continental (Africa-wide)', value: 'Continental' },
        { label: 'East Africa', value: 'East_Africa' },
        { label: 'West Africa', value: 'West_Africa' },
        { label: 'Central Africa', value: 'Central_Africa' },
        { label: 'North Africa', value: 'North_Africa' },
        { label: 'Southern Africa', value: 'Southern_Africa' },
      ],
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
        { label: 'AUDA-NEPAD', value: 'AUDA-NEPAD' },
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
    {
      name: 'files',
      type: 'array',
      required: true,
      admin: {
        description: 'Upload files related to this resource',
      },
      fields: [
        {
          name: 'file',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'description',
          type: 'text',
          admin: {
            description: 'Enter a description for this file',
          },
        },
      ],
    },
  ],
}
