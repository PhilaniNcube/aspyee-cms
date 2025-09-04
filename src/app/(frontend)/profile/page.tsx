import { redirect } from 'next/navigation'
import { getCurrentUser } from './actions'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'

export const dynamic = 'force-dynamic'

export default async function ProfilePage() {
  const result = await getCurrentUser()
  if (!result.authenticated) {
    redirect('/sign-in')
  }

  const { user } = result
  const initials = user.email?.[0]?.toUpperCase() || 'U'

  return (
    <main className="min-h-[calc(100vh-80px)]">
      {/* Hero Header */}
      <section
        className={cn(
          'relative overflow-hidden',
          'bg-[linear-gradient(135deg,var(--brand),var(--brand-orange-60))] text-white',
        )}
      >
        <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(circle_at_30%_40%,white,transparent_60%)]" />
        <div className="max-w-5xl mx-auto px-6 pt-16 pb-20 flex flex-col gap-6 md:gap-8">
          <div className="flex items-center gap-5">
            <Avatar className="size-20 ring-4 ring-white/40 shadow-lg">
              <AvatarFallback className="text-lg font-semibold bg-white/20 backdrop-blur-sm text-white">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <h1 className="text-3xl md:text-4xl font-semibold tracking-tight leading-tight">
                Welcome back
              </h1>
              <p className="text-sm md:text-base text-white/85 font-medium">
                {user.email} · {user.roles?.length ? user.roles.join(', ') : 'user'}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3 pt-2">
            <Button
              variant="outline"
              className="bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 border-white/30"
            >
              Edit Profile
            </Button>
            <form action="/sign-out" method="post">
              <Button
                type="submit"
                variant="outline"
                className="bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 border-white/30"
              >
                Sign out
              </Button>
            </form>
          </div>
        </div>
        <svg
          className="absolute bottom-0 left-0 w-full"
          height="40"
          preserveAspectRatio="none"
          viewBox="0 0 1200 120"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0 0h1200v120H0z" fill="rgba(255,255,255,0)" />
          <path d="M0 0h1200v60c-300 40-600 40-1200 0Z" fill="white" fillOpacity="0.15" />
        </svg>
      </section>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-6 -mt-10 pb-24 relative z-10">
        <div className="rounded-xl border p-6 bg-card text-card-foreground space-y-6 shadow-sm">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <h2 className="text-sm font-semibold uppercase text-muted-foreground">Email</h2>
              <p className="text-base font-medium break-all">{user.email}</p>
            </div>
            <div className="space-y-2">
              <h2 className="text-sm font-semibold uppercase text-muted-foreground">Roles</h2>
              <p className="text-base font-medium">
                {user.roles && user.roles.length > 0 ? user.roles.join(', ') : 'user'}
              </p>
            </div>
          </div>
          <div className="pt-2 border-t" />
          <p className="text-xs text-muted-foreground">
            This is a basic profile overview. Future enhancements could include editing profile
            details, managing preferences, activity history, and security settings.
          </p>
        </div>
      </div>
    </main>
  )
}
