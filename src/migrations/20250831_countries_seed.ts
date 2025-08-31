import { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-postgres'

export async function up({ payload }: MigrateUpArgs): Promise<void> {
  // Create country/region entries
  const countriesData: Array<{
    name: string
    value: string
    type: 'continental' | 'regional' | 'country'
    region:
      | 'africa_wide'
      | 'east_africa'
      | 'west_africa'
      | 'central_africa'
      | 'north_africa'
      | 'southern_africa'
  }> = [
    // Regional Options
    {
      name: 'Continental (Africa-wide)',
      value: 'Continental',
      type: 'continental',
      region: 'africa_wide',
    },
    {
      name: 'Regional - East Africa',
      value: 'Regional_East_Africa',
      type: 'regional',
      region: 'east_africa',
    },
    {
      name: 'Regional - West Africa',
      value: 'Regional_West_Africa',
      type: 'regional',
      region: 'west_africa',
    },
    {
      name: 'Regional - Central Africa',
      value: 'Regional_Central_Africa',
      type: 'regional',
      region: 'central_africa',
    },
    {
      name: 'Regional - North Africa',
      value: 'Regional_North_Africa',
      type: 'regional',
      region: 'north_africa',
    },
    {
      name: 'Regional - Southern Africa',
      value: 'Regional_Southern_Africa',
      type: 'regional',
      region: 'southern_africa',
    },

    // Country-specific (AU Member States)
    // North Africa
    { name: 'Algeria', value: 'Algeria', type: 'country', region: 'north_africa' },
    { name: 'Egypt', value: 'Egypt', type: 'country', region: 'north_africa' },
    { name: 'Libya', value: 'Libya', type: 'country', region: 'north_africa' },
    { name: 'Morocco', value: 'Morocco', type: 'country', region: 'north_africa' },
    { name: 'Sudan', value: 'Sudan', type: 'country', region: 'north_africa' },
    { name: 'Tunisia', value: 'Tunisia', type: 'country', region: 'north_africa' },

    // West Africa
    { name: 'Benin', value: 'Benin', type: 'country', region: 'west_africa' },
    { name: 'Burkina Faso', value: 'Burkina_Faso', type: 'country', region: 'west_africa' },
    { name: 'Cape Verde', value: 'Cape_Verde', type: 'country', region: 'west_africa' },
    { name: "Côte d'Ivoire", value: 'Cote_dIvoire', type: 'country', region: 'west_africa' },
    { name: 'Gambia', value: 'Gambia', type: 'country', region: 'west_africa' },
    { name: 'Ghana', value: 'Ghana', type: 'country', region: 'west_africa' },
    { name: 'Guinea', value: 'Guinea', type: 'country', region: 'west_africa' },
    { name: 'Guinea-Bissau', value: 'Guinea_Bissau', type: 'country', region: 'west_africa' },
    { name: 'Liberia', value: 'Liberia', type: 'country', region: 'west_africa' },
    { name: 'Mali', value: 'Mali', type: 'country', region: 'west_africa' },
    { name: 'Mauritania', value: 'Mauritania', type: 'country', region: 'west_africa' },
    { name: 'Niger', value: 'Niger', type: 'country', region: 'west_africa' },
    { name: 'Nigeria', value: 'Nigeria', type: 'country', region: 'west_africa' },
    { name: 'Senegal', value: 'Senegal', type: 'country', region: 'west_africa' },
    { name: 'Sierra Leone', value: 'Sierra_Leone', type: 'country', region: 'west_africa' },
    { name: 'Togo', value: 'Togo', type: 'country', region: 'west_africa' },

    // Central Africa
    { name: 'Cameroon', value: 'Cameroon', type: 'country', region: 'central_africa' },
    {
      name: 'Central African Republic',
      value: 'Central_African_Republic',
      type: 'country',
      region: 'central_africa',
    },
    { name: 'Chad', value: 'Chad', type: 'country', region: 'central_africa' },
    {
      name: 'Democratic Republic of Congo',
      value: 'Democratic_Republic_of_Congo',
      type: 'country',
      region: 'central_africa',
    },
    {
      name: 'Equatorial Guinea',
      value: 'Equatorial_Guinea',
      type: 'country',
      region: 'central_africa',
    },
    { name: 'Gabon', value: 'Gabon', type: 'country', region: 'central_africa' },
    {
      name: 'Republic of Congo',
      value: 'Republic_of_Congo',
      type: 'country',
      region: 'central_africa',
    },
    {
      name: 'São Tomé and Príncipe',
      value: 'Sao_Tome_and_Principe',
      type: 'country',
      region: 'central_africa',
    },

    // East Africa
    { name: 'Burundi', value: 'Burundi', type: 'country', region: 'east_africa' },
    { name: 'Comoros', value: 'Comoros', type: 'country', region: 'east_africa' },
    { name: 'Djibouti', value: 'Djibouti', type: 'country', region: 'east_africa' },
    { name: 'Eritrea', value: 'Eritrea', type: 'country', region: 'east_africa' },
    { name: 'Ethiopia', value: 'Ethiopia', type: 'country', region: 'east_africa' },
    { name: 'Kenya', value: 'Kenya', type: 'country', region: 'east_africa' },
    { name: 'Madagascar', value: 'Madagascar', type: 'country', region: 'east_africa' },
    { name: 'Mauritius', value: 'Mauritius', type: 'country', region: 'east_africa' },
    { name: 'Rwanda', value: 'Rwanda', type: 'country', region: 'east_africa' },
    { name: 'Seychelles', value: 'Seychelles', type: 'country', region: 'east_africa' },
    { name: 'Somalia', value: 'Somalia', type: 'country', region: 'east_africa' },
    { name: 'South Sudan', value: 'South_Sudan', type: 'country', region: 'east_africa' },
    { name: 'Tanzania', value: 'Tanzania', type: 'country', region: 'east_africa' },
    { name: 'Uganda', value: 'Uganda', type: 'country', region: 'east_africa' },

    // Southern Africa
    { name: 'Angola', value: 'Angola', type: 'country', region: 'southern_africa' },
    { name: 'Botswana', value: 'Botswana', type: 'country', region: 'southern_africa' },
    { name: 'Eswatini', value: 'Eswatini', type: 'country', region: 'southern_africa' },
    { name: 'Lesotho', value: 'Lesotho', type: 'country', region: 'southern_africa' },
    { name: 'Malawi', value: 'Malawi', type: 'country', region: 'southern_africa' },
    { name: 'Mozambique', value: 'Mozambique', type: 'country', region: 'southern_africa' },
    { name: 'Namibia', value: 'Namibia', type: 'country', region: 'southern_africa' },
    { name: 'South Africa', value: 'South_Africa', type: 'country', region: 'southern_africa' },
    { name: 'Zambia', value: 'Zambia', type: 'country', region: 'southern_africa' },
    { name: 'Zimbabwe', value: 'Zimbabwe', type: 'country', region: 'southern_africa' },
  ]

  // Insert all countries/regions
  for (const country of countriesData) {
    await payload.create({
      collection: 'countries',
      data: country,
    })
  }
}

export async function down({ payload }: MigrateDownArgs): Promise<void> {
  // Delete all countries
  await payload.delete({
    collection: 'countries',
    where: {},
  })
}
