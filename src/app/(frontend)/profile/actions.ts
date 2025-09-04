'use server'

import { headers as getHeaders } from 'next/headers'
import { getPayload } from 'payload'
import config from '@payload-config'
import type { User } from '@/payload-types'
import { z } from 'zod'
import { CurrentUserResult, UpdateProfileActionState, UpdateProfileSchema } from '@/lib/schema'

export async function getCurrentUser(): Promise<CurrentUserResult> {
  try {
    const headers = await getHeaders()
    const payload = await getPayload({ config })
    const { user } = await payload.auth({ headers })
    if (!user) return { authenticated: false }
    return {
      authenticated: true,
      user: { id: user.id, email: user.email, roles: user.roles || [] },
    }
  } catch {
    return { authenticated: false }
  }
}

// ---------------- Profile Update Action ----------------

// Allow users to update their own profile details. Roles are never user-modifiable here.
// We accept optional fields; empty strings are coerced to undefined (to avoid overwriting with '').

function collectFieldErrors(issues: z.ZodIssue[]): Record<string, string[]> {
  const errs: Record<string, string[]> = {}
  for (const issue of issues) {
    const key = issue.path.join('.') || 'form'
    errs[key] = errs[key] ? [...errs[key], issue.message] : [issue.message]
  }
  return errs
}

// Server action designed for direct use with useActionState: (prevState, formData) => newState
export async function updateProfile(
  _prev: UpdateProfileActionState,
  formData: FormData,
): Promise<UpdateProfileActionState> {
  try {
    const headers = await getHeaders()
    const payload = await getPayload({ config })
    const { user: authUser } = await payload.auth({ headers })
    if (!authUser) {
      return { success: false, message: 'Not authenticated', fieldErrors: {} }
    }

    // Convert FormData to a flat object first
    const flat: Record<string, string> = {}
    for (const [k, v] of formData.entries()) {
      if (k.startsWith('roles')) continue // prevent privilege escalation
      if (typeof v === 'string') flat[k] = v
    }

    // Extract social_links[...] fields into structured array (minimal logic)
    const socialLinkRegex = /^social_links\[(\d+)]\[(platform|url)]$/
    const socialLinksTemp: Record<string, { platform?: string; url?: string }> = {}
    for (const key of Object.keys(flat)) {
      const m = key.match(socialLinkRegex)
      if (m) {
        const idx = m[1]
        const field = m[2] as 'platform' | 'url'
        socialLinksTemp[idx] = socialLinksTemp[idx] || {}
        socialLinksTemp[idx][field] = flat[key]
        delete flat[key]
      }
    }
    let social_links: any[] | undefined = undefined
    const linkKeys = Object.keys(socialLinksTemp)
    if (linkKeys.length) {
      social_links = linkKeys
        .sort((a, b) => Number(a) - Number(b))
        .map((k) => socialLinksTemp[k])
        .filter((l) => (l.platform && l.platform.trim()) || (l.url && l.url.trim()))
    }

    // Prepare candidate object for validation
    const candidate: any = { ...flat }
    if (social_links && social_links.length) candidate.social_links = social_links

    // Convert empty strings to undefined so optional() fields can drop them
    for (const k of Object.keys(candidate)) {
      if (typeof candidate[k] === 'string' && candidate[k].trim() === '') candidate[k] = undefined
    }

    const parsed = UpdateProfileSchema.safeParse(candidate)
    if (!parsed.success) {
      return {
        success: false,
        message: 'Invalid input',
        fieldErrors: collectFieldErrors(parsed.error.issues),
      }
    }

    console.log('Updating user profile', { id: authUser.id, data: parsed.data })

    const updated = (await payload.update({
      collection: 'users',
      id: authUser.id,
      data: parsed.data,
      depth: 0,
      overrideAccess: false,
    })) as User

    console.log('Updated user', updated)

    return { success: true, message: 'Profile updated', fieldErrors: {} }
  } catch (err: any) {
    return { success: false, message: err?.message || 'Update failed', fieldErrors: {} }
  }
}
