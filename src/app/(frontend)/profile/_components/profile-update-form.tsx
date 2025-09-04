'use client'
import React, { startTransition, useActionState, useEffect } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { updateProfile } from '../actions'
import type { User } from '@/payload-types'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { cn } from '@/lib/utils'
import {
  UpdateProfileSchema,
  initialUpdateProfileState,
  UpdateProfileActionState,
  UpdateProfileInput,
} from '@/lib/schema'
import { Pencil } from 'lucide-react'

type ActionState = UpdateProfileActionState

interface ProfileUpdateFormProps {
  user: User
}

export const ProfileUpdateForm: React.FC<ProfileUpdateFormProps> = ({ user }) => {
  const [state, formAction, isPending] = useActionState<ActionState, FormData>(
    updateProfile,
    initialUpdateProfileState,
  )

  const form = useForm<UpdateProfileInput>({
    resolver: zodResolver(UpdateProfileSchema),
    defaultValues: {
      email: user.email || undefined,
      firstName: (user as any).firstName || undefined,
      lastName: (user as any).lastName || undefined,
      bio: (user as any).bio || undefined,
      phoneNumber: (user as any).phoneNumber || undefined,
      social_links:
        Array.isArray((user as any).social_links) && (user as any).social_links.length
          ? (user as any).social_links.map((l: any) => ({
              platform: l.platform || '',
              url: l.url || '',
            }))
          : [{ platform: '', url: '' }],
    },
  })

  const { control, handleSubmit, formState } = form
  const { isSubmitting, isDirty } = formState
  const { fields, append, remove } = useFieldArray({ name: 'social_links', control })

  const onSubmit = (values: UpdateProfileInput) => {
    const fd = new FormData()
    ;(Object.keys(values) as (keyof UpdateProfileInput)[]).forEach((k) => {
      const val = values[k]
      if (k === 'social_links' && Array.isArray(val)) {
        val.forEach((l, i) => {
          if (l?.platform) fd.append(`social_links[${i}][platform]`, l.platform)
          if (l?.url) fd.append(`social_links[${i}][url]`, l.url)
        })
      } else if (typeof val === 'string' && val.trim() !== '') {
        fd.append(k, val)
      }
    })
    startTransition(() => {
      formAction(fd)
    })
  }

  useEffect(() => {
    if (state.success) {
      // toast could go here
    }
  }, [state.success])

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm">
          <Pencil className="mr-2 size-4" />
          Edit Profile
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            action={formAction}
            className="space-y-6"
            noValidate
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="uppercase text-xs font-semibold tracking-wide text-foreground/80">
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input type="email" {...field} className="h-11 text-base px-4" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="uppercase text-xs font-semibold tracking-wide text-foreground/80">
                      First Name
                    </FormLabel>
                    <FormControl>
                      <Input {...field} className="h-11 text-base px-4" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="uppercase text-xs font-semibold tracking-wide text-foreground/80">
                      Last Name
                    </FormLabel>
                    <FormControl>
                      <Input {...field} className="h-11 text-base px-4" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="uppercase text-xs font-semibold tracking-wide text-foreground/80">
                      Phone Number
                    </FormLabel>
                    <FormControl>
                      <Input {...field} className="h-11 text-base px-4" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="bio"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel className="uppercase text-xs font-semibold tracking-wide text-foreground/80">
                      Bio
                    </FormLabel>
                    <FormControl>
                      <Textarea {...field} className="min-h-[120px]" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="md:col-span-2 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="uppercase text-xs font-semibold tracking-wide text-foreground/80">
                    Social Links
                  </span>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => append({ platform: '', url: '' })}
                    disabled={isPending || isSubmitting}
                  >
                    Add
                  </Button>
                </div>
                <div className="space-y-3">
                  {fields.map((f, i) => (
                    <div key={f.id} className="grid grid-cols-2 gap-2">
                      <FormField
                        control={control}
                        name={`social_links.${i}.platform` as const}
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input placeholder="Platform" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="flex gap-2">
                        <FormField
                          control={control}
                          name={`social_links.${i}.url` as const}
                          render={({ field }) => (
                            <FormItem className="flex-1">
                              <FormControl>
                                <Input placeholder="https://..." {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        {fields.length > 1 && (
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            onClick={() => remove(i)}
                            className="shrink-0"
                          >
                            ×
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                {state.fieldErrors['social_links'] && (
                  <FieldErrors errors={state.fieldErrors['social_links']} />
                )}
              </div>
            </div>
            <div className="flex items-center gap-4 pt-2">
              <Button
                type="submit"
                disabled={isPending || isSubmitting || !isDirty}
                className="bg-brand-orange hover:bg-brand-orange/90"
              >
                {isPending || isSubmitting ? 'Saving…' : 'Save Changes'}
              </Button>
              {state.message && (
                <p
                  className={cn(
                    'text-sm font-medium',
                    state.success ? 'text-green-600 dark:text-green-400' : 'text-destructive',
                  )}
                >
                  {state.message}
                </p>
              )}
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

const FieldErrors: React.FC<{ errors: string[] }> = ({ errors }) => (
  <ul className="mt-1 space-y-0.5 text-[11px] font-medium text-destructive list-none pl-0">
    {errors.map((err) => (
      <li key={err}>{err}</li>
    ))}
  </ul>
)

export default ProfileUpdateForm
