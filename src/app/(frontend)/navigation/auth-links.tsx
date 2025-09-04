import Link from 'next/link'
import { getCurrentUser } from '../profile/actions'

// Server component that renders authentication-related links based on user session.
// It purposefully avoids any color classes; the parent container in the client
// header applies inherited colors (e.g. white vs brand color when scrolled).
export default async function AuthLinks() {
  const result = await getCurrentUser()

  if (!result.authenticated) {
    return (
      <>
        <Link href="/sign-in" className="hover:text-teal-600 text-[14px] auth-link">
          Sign In
        </Link>
        <span className="px-2 auth-separator">|</span>
        <Link href="/register" className="hover:text-teal-600 text-[14px] auth-link">
          Register
        </Link>
      </>
    )
  }

  return (
    <Link href="/profile" className="hover:text-teal-600 text-[14px] auth-link">
      My Profile
    </Link>
  )
}
