'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import { CreateProfile } from '@/components/create-profile'
import { toast } from 'sonner'

const gradientBg = 'bg-[linear-gradient(135deg,var(--brand),var(--brand-orange-60))]'

const RegisterPage: React.FC = () => {
  const handleSuccess = () => {
    toast.success('Account created successfully! You can now log in.')
  }

  return (
    <main
      className={cn(
        'min-h-[calc(100vh-80px)] flex items-center justify-center px-4 py-10 md:py-32 lg:py-44',
        gradientBg,
      )}
    >
      <div className="w-full max-w-4xl rounded-xl bg-card text-card-foreground shadow-xl ring-1 ring-border/60 p-8">
        <h1 className="text-2xl font-semibold tracking-tight">Create your account</h1>
        <p className="text-muted-foreground mt-1 mb-6 text-sm">
          Join the platform to access tailored resources.
        </p>

        <CreateProfile onSuccess={handleSuccess} />

        <p className="mt-6 text-[10px] text-muted-foreground text-center">
          By creating an account you accept our terms of use.
        </p>
      </div>
    </main>
  )
}

export default RegisterPage
