'use server'
import { z } from 'zod'
import { getPayload } from 'payload'
import config from '@payload-config'
import { CreateProfileSchema } from '@/lib/schema'

// Legacy schema for backwards compatibility
const RegisterSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
})

export type RegisterInput = z.infer<typeof RegisterSchema>
export type RegisterSuccess = { success: true; userId: string; message: string }
export type RegisterFailure = {
  success: false
  fieldErrors?: Record<string, string[]>
  message: string
}
export type RegisterResult = RegisterSuccess | RegisterFailure

/**
 * Server Action: registerUser
 * Registers a new user in the Payload CMS `users` collection.
 * - Always enforces roles: ['user'] (ignores any attempted role escalation)
 * - Uses overrideAccess to allow public self-registration despite create access restrictions.
 * - Returns a discriminated union with success flag and helpful error details.
 */
export async function registerUser(form: FormData | RegisterInput): Promise<RegisterResult> {
  try {
    // Normalize input to a plain object
    const raw: any =
      form instanceof FormData ? { email: form.get('email'), password: form.get('password') } : form

    const parsed = RegisterSchema.safeParse(raw)
    if (!parsed.success) {
      const fieldErrors: Record<string, string[]> = {}
      for (const issue of parsed.error.issues) {
        const key = issue.path.join('.') || 'form'
        fieldErrors[key] = fieldErrors[key] ? [...fieldErrors[key], issue.message] : [issue.message]
      }
      return { success: false, message: 'Invalid input', fieldErrors }
    }

    const { email, password } = parsed.data

    const payload = await getPayload({ config })

    // Optional: ensure email uniqueness manually for clearer error (Payload will also enforce)
    const existing = await payload.find({
      collection: 'users',
      where: { email: { equals: email } },
      limit: 1,
    })
    if (existing.totalDocs > 0) {
      return {
        success: false,
        message: 'Email is already registered',
        fieldErrors: { email: ['Email already in use'] },
      }
    }

    const created = await payload.create({
      collection: 'users',
      data: {
        email,
        password, // Payload will hash based on auth: true
        roles: ['user'],
      },
      overrideAccess: true, // Allow public registration despite collection create access restrictions
      depth: 0,
    })

    return { success: true, userId: String(created.id), message: 'Registration successful' }
  } catch (err: any) {
    // Attempt to extract meaningful error info
    const message = err?.message || 'Registration failed'
    return { success: false, message }
  }
}

export type CreateProfileInput = z.infer<typeof CreateProfileSchema>
export type CreateProfileSuccess = { success: true; userId: string; message: string }
export type CreateProfileFailure = {
  success: false
  fieldErrors?: Record<string, string[]>
  message: string
}
export type CreateProfileResult = CreateProfileSuccess | CreateProfileFailure

/**
 * Server Action: registerProfile
 * Registers a new user with complete profile information
 * Uses the CreateProfileSchema for validation
 */
export async function registerProfile(
  form: FormData | CreateProfileInput,
): Promise<CreateProfileResult> {
  try {
    // Normalize input to a plain object
    const raw: any = form instanceof FormData ? Object.fromEntries(form.entries()) : form

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

    const parsed = CreateProfileSchema.safeParse(raw)
    if (!parsed.success) {
      const fieldErrors: Record<string, string[]> = {}
      for (const issue of parsed.error.issues) {
        const key = issue.path.join('.') || 'form'
        fieldErrors[key] = fieldErrors[key] ? [...fieldErrors[key], issue.message] : [issue.message]
      }
      return { success: false, message: 'Invalid input', fieldErrors }
    }

    const {
      email,
      password,
      firstName,
      lastName,
      bio,
      phoneNumber,
      social_links,
      country,
      language,
      gender,
      organisation,
      organisation_type,
      areas_of_interest,
    } = parsed.data

    const payload = await getPayload({ config })

    // Check email uniqueness
    const existing = await payload.find({
      collection: 'users',
      where: { email: { equals: email } },
      limit: 1,
    })
    if (existing.totalDocs > 0) {
      return {
        success: false,
        message: 'Email is already registered',
        fieldErrors: { email: ['Email already in use'] },
      }
    }

    const created = await payload.create({
      collection: 'users',
      data: {
        email,
        password,
        firstName,
        lastName,
        bio,
        phoneNumber,
        social_links,
        country: country as any, // Cast to avoid type issues with strict country codes
        language,
        gender,
        organisation,
        organisation_type,
        areas_of_interest,
        roles: ['user'],
      },
      overrideAccess: true,
      depth: 0,
    })

    return { success: true, userId: String(created.id), message: 'Profile created successfully' }
  } catch (err: any) {
    const message = err?.message || 'Registration failed'
    return { success: false, message }
  }
}
