'use server'

import { getPayload } from 'payload'
import { headers as getHeaders } from 'next/headers'
import config from '@payload-config'
import { CreateProfileSchema } from '../schema'
import { COUNTRIES } from '@/migrations/20250831_countries_seed'

type CountryCode = (typeof COUNTRIES)[number]['code']

export async function registerProfile(prevState: unknown, formData: FormData) {
  const headers = await getHeaders()
  const payload = await getPayload({ config })

  // Convert FormData to plain object
  const raw: any = Object.fromEntries(formData.entries())

  // Handle arrays that might be stringified
  if (typeof raw.social_links === 'string') {
    try {
      raw.social_links = JSON.parse(raw.social_links)
    } catch {
      raw.social_links = []
    }
  }

  if (typeof raw.areas_of_interest === 'string') {
    try {
      raw.areas_of_interest = JSON.parse(raw.areas_of_interest)
    } catch {
      raw.areas_of_interest = []
    }
  }

  const validatedFields = CreateProfileSchema.safeParse(raw)

  if (!validatedFields.success) {
    console.error('[registerUser] Validation failed', validatedFields.error)
    return {
      message: validatedFields.error.message,
      data: validatedFields.data,
      success: false,
    }
  }

  const {
    email,
    password,
    firstName,
    lastName,
    bio,
    phoneNumber,
    country,
    language,
    gender,
    organisation,
    organisation_type,
    areas_of_interest,
    social_links,
  } = validatedFields.data

  const existing = await payload.find({
    collection: 'users',
    where: { email: { equals: email } },
    limit: 1,
  })
  if (existing.totalDocs > 0) {
    return {
      success: false,
      message: 'Email is already registered',
      data: validatedFields.data,
    }
  }

  const validCodes = COUNTRIES.map((c) => c.code) as CountryCode[]
  const selectedCountry =
    typeof country === 'string' && validCodes.includes(country as CountryCode)
      ? (country as CountryCode)
      : undefined

  try {
    const created = await payload.create({
      collection: 'users',
      data: {
        email,
        password,
        firstName,
        lastName,
        bio,
        phoneNumber,
        country: selectedCountry,
        language,
        gender,
        organisation,
        organisation_type,
        areas_of_interest,
        social_links,
        roles: ['user'],
      },
      overrideAccess: true, // Allow public registration despite collection create access restrictions
      depth: 0,
    })

    if (!created) {
      throw new Error('User creation failed for unknown reasons')
    }

    return {
      message: 'Registration successful! You can now log in.',
      data: { id: created.id, email: created.email },
      success: true,
    }
  } catch (error) {
    console.error('[registerUser] Error occurred', error)
    return {
      message: 'User registration failed',
      data: validatedFields.data,
      success: false,
    }
  }
}
