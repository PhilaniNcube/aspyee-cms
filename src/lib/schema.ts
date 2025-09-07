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
  email: z.string().email('Invalid email'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .max(100, 'Password too long'),
  firstName: z.string().trim().max(120, 'First name too long').optional(),
  lastName: z.string().trim().max(120, 'Last name too long').optional(),
  bio: z.string().trim().max(1000, 'Bio too long').optional(),
  phoneNumber: z
    .string()
    .trim()
    .regex(/^[+()\d\-\s]*$/, 'Invalid phone number')
    .max(40, 'Phone number too long')
    .optional(),
  country: z.string().length(2, 'Invalid country code').optional(),
  language: z.enum(['en', 'fr'], { message: 'Invalid language' }).optional(),
  gender: z.enum(['male', 'female', 'other'], { message: 'Invalid gender' }).optional(),
  organisation: z.string().trim().max(200, 'Organisation name too long').optional(),
  organisation_type: z
    .enum(
      ['academic', 'cso', 'cbo', 'government', 'ngo', 'npo', 'private', 'tvet', 'youth', 'other'],
      { message: 'Invalid organisation type' },
    )
    .optional(),
  areas_of_interest: z
    .array(
      z.enum([
        'Industrial, technical and vocational training',
        'Gender and Transformation',
        'Entrepreneurship and informal sector formalisation',
        'Human Capital Development',
        'Agribusiness and agricultural skills',
        'Labour migration & mobility',
        'Digital skills & future of work',
        'Education systems & policy',
        'Financing & investment in skills',
        'Informal sector & livelihoods',
        'Green skills / sustainability',
        'Innovation & partnerships',
        'Governance',
      ]),
    )
    .max(13, 'Too many areas of interest')
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
  country: z.string().length(2, 'Invalid country code').optional(),
  language: z.enum(['en', 'fr'], { message: 'Invalid language' }).optional(),
  gender: z.enum(['male', 'female', 'other'], { message: 'Invalid gender' }).optional(),
  organisation: z.string().trim().max(200, 'Organisation name too long').optional(),
  organisation_type: z
    .enum(
      ['academic', 'cso', 'cbo', 'government', 'ngo', 'npo', 'private', 'tvet', 'youth', 'other'],
      { message: 'Invalid organisation type' },
    )
    .optional(),
  areas_of_interest: z
    .array(
      z.enum([
        'Industrial, technical and vocational training',
        'Gender and Transformation',
        'Entrepreneurship and informal sector formalisation',
        'Human Capital Development',
        'Agribusiness and agricultural skills',
        'Labour migration & mobility',
        'Digital skills & future of work',
        'Education systems & policy',
        'Financing & investment in skills',
        'Informal sector & livelihoods',
        'Green skills / sustainability',
        'Innovation & partnerships',
        'Governance',
      ]),
    )
    .max(13, 'Too many areas of interest')
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
