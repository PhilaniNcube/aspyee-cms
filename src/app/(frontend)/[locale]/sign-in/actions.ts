'use server'
import { z } from 'zod'
import { getPayload } from 'payload'
import config from '@payload-config'
import { cookies } from 'next/headers'
import type { User } from '@/payload-types'

const SignInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, 'Password is required'),
})

export type SignInInput = z.infer<typeof SignInSchema>
export type AuthUser = Pick<User, 'id' | 'email' | 'roles'> & { [k: string]: unknown }
export type SignInSuccess = { success: true; message: string; user: AuthUser }
export type SignInFailure = {
  success: false
  message: string
  fieldErrors?: Record<string, string[]>
}
export type SignInResult = SignInSuccess | SignInFailure

export async function signIn(form: FormData | SignInInput): Promise<SignInResult> {
  try {
    const raw: any =
      form instanceof FormData ? { email: form.get('email'), password: form.get('password') } : form
    const parsed = SignInSchema.safeParse(raw)
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

    const result = await payload.login({
      collection: 'users',
      data: { email, password },
      depth: 0,
    })

    // Guard result structure & set auth cookie manually (local API does not set cookies automatically)
    if (result && typeof result === 'object' && 'token' in result && result.token) {
      const token = String(result.token)
      const cookieStore = await cookies()
      cookieStore.set('payload-token', token, {
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 7 days
      })
    }

    const authUser: AuthUser = {
      id: (result as any)?.user?.id,
      email: (result as any)?.user?.email,
      roles: (result as any)?.user?.roles || [],
      ...(result as any)?.user,
    }
    return { success: true, message: 'Signed in successfully', user: authUser }
  } catch (err: any) {
    const msg = err?.message || 'Invalid credentials'
    return { success: false, message: msg }
  }
}
