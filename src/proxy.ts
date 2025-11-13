import createMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'

export default createMiddleware(routing)

export const config = {
  // Match only internationalized pathnames
  // Exclude API routes, admin panel, and static files
  matcher: [
    // Match all pathnames except for
    // - … if they start with `/api`, `/admin`, `/_next` or `/_vercel`
    // - … the ones containing a dot (e.g. `favicon.ico`)
    '/((?!api|admin|_next|_vercel|.*\\..*).*)',
  ],
}
