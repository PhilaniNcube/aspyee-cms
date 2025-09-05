import { User } from '@/payload-types'
import { password } from 'node_modules/payload/dist/fields/validations'
import z from 'zod'

export type CurrentUserResult =
  | { authenticated: true; user: Pick<User, 'id' | 'email' | 'roles'> }
  | { authenticated: false }

export const SocialLinkSchema = z.object({
  platform: z
    .string()
    .trim()
    .min(1, 'Platform is required')
    .max(50, 'Platform too long')
    .optional(),
  url: z.string().trim().url('Invalid URL').optional(),
})

export const CreateProfileSchema = z.object({
  email: z.email(),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .max(100, 'Password too long'),
  firstName: z.string().trim().max(120, 'First name too long'),
  lastName: z.string().trim().max(120, 'Last name too long'),
  bio: z.string().trim().max(1000, 'Bio too long'),
  phoneNumber: z
    .string()
    .trim()
    .regex(/^[+()\d\-\s]*$/, 'Invalid phone number')
    .max(40, 'Phone number too long'),
  social_links: z
    .array(
      SocialLinkSchema.refine(
        (v) =>
          (typeof v.platform === 'string' && v.platform.trim().length > 0) ||
          (typeof v.url === 'string' && v.url.trim().length > 0),
        'Incomplete social link',
      ),
    )
    .max(10, 'Too many social links')
    .optional(),
  country: z.string().length(2, 'Invalid country code').optional(),
})

export const UpdateProfileSchema = z.object({
  email: z.string().email('Invalid email').optional(),
  firstName: z.string().trim().max(120, 'First name too long').optional(),
  lastName: z.string().trim().max(120, 'Last name too long').optional(),
  bio: z.string().trim().max(1000, 'Bio too long').optional(),
  phoneNumber: z
    .string()
    .trim()
    .regex(/^[+()\d\-\s]*$/, 'Invalid phone number')
    .max(40, 'Phone number too long')
    .optional(),
  social_links: z
    .array(
      SocialLinkSchema.refine(
        (v) =>
          (typeof v.platform === 'string' && v.platform.trim().length > 0) ||
          (typeof v.url === 'string' && v.url.trim().length > 0),
        'Incomplete social link',
      ),
    )
    .max(10, 'Too many social links')
    .optional(),
})

export type UpdateProfileInput = z.infer<typeof UpdateProfileSchema>
export type UpdateProfileSuccess = { success: true; message: string; user: Partial<User> }
export type UpdateProfileFailure = {
  success: false
  message: string
  fieldErrors?: Record<string, string[]>
}
export type UpdateProfileResult = UpdateProfileSuccess | UpdateProfileFailure

// State shape consumed by useActionState on the client
export type UpdateProfileActionState = {
  success?: boolean
  message: string | null
  fieldErrors: Record<string, string[]>
}

export const initialUpdateProfileState: UpdateProfileActionState = {
  success: undefined,
  message: null,
  fieldErrors: {},
}
