'use server'
import { z } from 'zod'
import { getPayload } from 'payload'
import config from '@payload-config'

// Schema for validating incoming registration data
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
