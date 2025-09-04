import { redirect } from 'next/navigation'
import { headers as getHeaders } from 'next/headers'
import { getPayload } from 'payload'
import type { User } from '@/payload-types'
import config from '@payload-config'
import { getCurrentUser } from './actions'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'
import AccountSection from './_components/account-section'

export const dynamic = 'force-dynamic'

export default async function ProfilePage() {
  const headers = await getHeaders()
  const payload = await getPayload({ config })

  const { user } = await payload.auth({ headers })

  if (!user) {
    redirect('/sign-in')
  }

  const initials = user.email?.[0]?.toUpperCase() || 'U'

  if (!user) {
    redirect('/sign-in')
  }

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
        <div className="max-w-[1440px] mx-auto px-6  md:px-10 lg:px-16 pt-24 pb-20 flex flex-col gap-6 md:gap-8">
          <div className="flex items-center gap-5">
            <div className="space-y-1">
              <div className="">
                <p className="text-3xl md:text-4xl font-semibold tracking-tight leading-tight">
                  Hello {user.email} · {user.roles?.length ? user.roles.join(', ') : 'user'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <AccountSection user={user} />
    </main>
  )
}
