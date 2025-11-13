'use client'
import React, { useActionState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { signIn } from './actions'

const gradientBg = 'bg-[linear-gradient(135deg,var(--brand-orange-60),var(--brand))]'

type ActionState = {
  success?: boolean
  message: string | null
  fieldErrors: Record<string, string[]>
}

const initialState: ActionState = { success: undefined, message: null, fieldErrors: {} }

async function action(prev: ActionState, formData: FormData): Promise<ActionState> {
  const res = await signIn(formData)
  if (res.success) return { success: true, message: res.message, fieldErrors: {} }
  return { success: false, message: res.message, fieldErrors: res.fieldErrors || {} }
}

const SignInPage: React.FC = () => {
  const formRef = useRef<HTMLFormElement | null>(null)
  const router = useRouter()
  const [state, formAction, isPending] = useActionState<ActionState, FormData>(action, initialState)

  useEffect(() => {
    if (state.success) {
      router.push('/profile')
    }
  }, [state.success, router])

  return (
    <main
      className={cn(
        'min-h-[calc(100vh-80px)] flex items-center justify-center px-4 py-10 md:py-32 lg:py-44',
        gradientBg,
      )}
    >
      <div className="w-full max-w-md rounded-xl bg-card text-card-foreground shadow-xl ring-1 ring-border/60 p-8">
        <h1 className="text-2xl font-semibold tracking-tight">Sign in</h1>
        <p className="text-muted-foreground mt-1 mb-6 text-sm">Access your account.</p>
        <form ref={formRef} action={formAction} className="space-y-5" noValidate>
          <div className="space-y-2">
            <Label
              htmlFor="email"
              className="uppercase text-xs font-semibold tracking-wide text-foreground/80"
            >
              Email
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              placeholder="you@example.com"
              aria-invalid={state.fieldErrors.email ? 'true' : 'false'}
              autoComplete="email"
              className={cn('h-11 text-base px-4', state.fieldErrors.email && 'border-destructive')}
            />
            {state.fieldErrors.email && <FieldErrors errors={state.fieldErrors.email} />}
          </div>
          <div className="space-y-2">
            <Label
              htmlFor="password"
              className="uppercase text-xs font-semibold tracking-wide text-foreground/80"
            >
              Password
            </Label>
            <Input
              id="password"
              name="password"
              type="password"
              required
              placeholder="••••••••"
              aria-invalid={state.fieldErrors.password ? 'true' : 'false'}
              autoComplete="current-password"
              className={cn(
                'h-11 text-base px-4',
                state.fieldErrors.password && 'border-destructive',
              )}
            />
            {state.fieldErrors.password && <FieldErrors errors={state.fieldErrors.password} />}
          </div>
          <Button
            type="submit"
            disabled={isPending}
            className="w-full h-11 text-base font-semibold tracking-wide bg-brand hover:bg-brand/90"
          >
            {isPending ? 'Signing in…' : 'Sign in'}
          </Button>
        </form>
        {state.message && (
          <div
            className={cn(
              'mt-4 text-sm font-medium',
              state.success ? 'text-green-600 dark:text-green-400' : 'text-destructive',
            )}
          >
            {state.message}
          </div>
        )}
        <p className="mt-6 text-[10px] text-muted-foreground text-center">
          Problems? Contact support.
        </p>
      </div>
    </main>
  )
}

const FieldErrors: React.FC<{ errors: string[] }> = ({ errors }) => (
  <ul className="mt-1 space-y-0.5 text-[11px] font-medium text-destructive list-none pl-0">
    {errors.map((err) => (
      <li key={err}>{err}</li>
    ))}
  </ul>
)

export default SignInPage
