'use server'
import { cookies } from 'next/headers'
import { getPayload } from 'payload'
import config from '@payload-config'
import type { User } from '@/payload-types'

type CurrentUserResult =
  | { authenticated: true; user: Pick<User, 'id' | 'email' | 'roles'> }
  | { authenticated: false }

function decodeJWT(token: string): any | null {
  try {
    const [, payload] = token.split('.')
    if (!payload) return null
    const json = Buffer.from(payload.replace(/-/g, '+').replace(/_/g, '/'), 'base64').toString(
      'utf8',
    )
    return JSON.parse(json)
  } catch {
    return null
  }
}

export async function getCurrentUser(): Promise<CurrentUserResult> {
  const cookieStore = await cookies()
  const token = cookieStore.get('payload-token')?.value
  if (!token) return { authenticated: false }

  const decoded = decodeJWT(token)
  const userId = decoded?.user?.id || decoded?.id
  if (!userId) return { authenticated: false }

  try {
    const payload = await getPayload({ config })
    const user = (await payload.findByID({
      collection: 'users',
      id: userId,
      depth: 0,
      overrideAccess: true,
    })) as User
    if (!user) return { authenticated: false }
    return {
      authenticated: true,
      user: { id: user.id, email: user.email, roles: user.roles || [] },
    }
  } catch {
    return { authenticated: false }
  }
}
