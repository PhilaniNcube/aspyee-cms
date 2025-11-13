import { Suspense } from 'react'
import ProfileContent from './profile-content'

export default async function ProfilePage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-[calc(100vh-80px)]">
          {/* Hero Header Skeleton */}
          <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 to-orange-500 text-white">
            <div className="max-w-[1520px] w-[80%] mx-auto  pt-24 pb-20">
              <div className="animate-pulse space-y-4">
                <div className="h-10 w-96 bg-white/20 rounded" />
              </div>
            </div>
          </section>

          {/* Content Skeleton */}
          <div className="py-10 border-t">
            <div className="max-w-[1520px] w-[80%] mx-auto ">
              <div className="animate-pulse space-y-6">
                <div className="h-8 w-48 bg-muted rounded" />
                <div className="space-y-4">
                  <div className="h-20 w-full bg-muted rounded" />
                  <div className="h-20 w-full bg-muted rounded" />
                </div>
              </div>
            </div>
          </div>
        </main>
      }
    >
      <ProfileContent />
    </Suspense>
  )
}
