'use client'

import React, { startTransition, useActionState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CreateProfileSchema } from '@/lib/schema'
import { registerProfile } from '@/app/(frontend)/register/actions'
import type { CreateProfileInput, CreateProfileResult } from '@/app/(frontend)/register/actions'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { PlusIcon, XIcon, EyeIcon, EyeOffIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { COUNTRIES } from '@/migrations/20250831_countries_seed'

// Action state for useActionState
type ActionState = {
  success?: boolean
  message: string | null
  fieldErrors: Record<string, string[]>
}

const initialState: ActionState = { success: undefined, message: null, fieldErrors: {} }

// Wrapper action for useActionState
async function actionWrapper(prev: ActionState, formData: FormData): Promise<ActionState> {
  const result = await registerProfile(formData)
  if (result.success) {
    return { success: true, message: result.message, fieldErrors: {} }
  }
  return { success: false, message: result.message, fieldErrors: result.fieldErrors || {} }
}

// Common country options (you can expand this list)

interface CreateProfileProps {
  onSuccess?: () => void
}

export function CreateProfile({ onSuccess }: CreateProfileProps) {
  const [state, formAction, isPending] = useActionState<ActionState, FormData>(
    actionWrapper,
    initialState,
  )

  const form = useForm<CreateProfileInput>({
    resolver: zodResolver(CreateProfileSchema),
    defaultValues: {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      bio: '',
      phoneNumber: '',
      social_links: [],
      country: undefined,
      language: undefined,
      gender: undefined,
      organisation: '',
      organisation_type: undefined,
      areas_of_interest: [],
    },
  })

  const [showPassword, setShowPassword] = React.useState(false)

  // Handle success
  React.useEffect(() => {
    if (state.success) {
      form.reset()
      onSuccess?.()
    }
  }, [state.success, form, onSuccess])

  // Sync server-side field errors with react-hook-form
  React.useEffect(() => {
    if (state.fieldErrors) {
      Object.entries(state.fieldErrors).forEach(([field, errors]) => {
        if (errors.length > 0) {
          form.setError(field as keyof CreateProfileInput, {
            type: 'server',
            message: errors[0],
          })
        }
      })
    }
  }, [state.fieldErrors, form])

  const socialLinks = form.watch('social_links') || []

  const addSocialLink = () => {
    const currentLinks = form.getValues('social_links') || []
    form.setValue('social_links', [...currentLinks, { platform: '', url: '' }])
  }

  const removeSocialLink = (index: number) => {
    const currentLinks = form.getValues('social_links') || []
    form.setValue(
      'social_links',
      currentLinks.filter((_, i) => i !== index),
    )
  }

  return (
    <Form {...form}>
      <form
        action={formAction}
        className="space-y-6"
        onSubmit={(e) => {
          e.preventDefault()
          const formData = new FormData(e.currentTarget)

          // Add social_links as JSON string
          const socialLinksData = form.getValues('social_links')
          if (socialLinksData && socialLinksData.length > 0) {
            formData.set('social_links', JSON.stringify(socialLinksData))
          }

          // Add areas_of_interest as JSON string
          const areasOfInterestData = form.getValues('areas_of_interest')
          if (areasOfInterestData && areasOfInterestData.length > 0) {
            formData.set('areas_of_interest', JSON.stringify(areasOfInterestData))
          }

          startTransition(() => {
            formAction(formData)
          })
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8">
          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="uppercase text-xs font-semibold tracking-wide text-foreground/80">
                  Email
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="email"
                    placeholder="you@example.com"
                    autoComplete="email"
                    className="h-11 text-base px-4"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Password */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="relative">
                <FormLabel className="uppercase text-xs font-semibold tracking-wide text-foreground/80">
                  Password
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      {...field}
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      autoComplete="new-password"
                      className="h-11 text-base px-4 pr-12"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword((prev) => !prev)}
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? (
                        <EyeOffIcon className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <EyeIcon className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                </FormControl>
                <FormDescription className="absolute -bottom-11 left-1">
                  Password must be at least 8 characters long
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* First Name */}
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="uppercase text-xs font-semibold tracking-wide text-foreground/80">
                  First Name
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="John"
                    autoComplete="given-name"
                    className="h-11 text-base px-4"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Last Name */}
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="uppercase text-xs font-semibold tracking-wide text-foreground/80">
                  Last Name
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Doe"
                    autoComplete="family-name"
                    className="h-11 text-base px-4"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Bio */}
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel className="uppercase text-xs font-semibold tracking-wide text-foreground/80">
                  Bio
                </FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="Tell us about yourself..."
                    className="min-h-24"
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          {/* Phone Number */}
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="uppercase text-xs font-semibold tracking-wide text-foreground/80">
                  Phone Number
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="tel"
                    placeholder="+1 (555) 123-4567"
                    autoComplete="tel"
                    className="h-11 text-base px-4"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Country */}
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="uppercase text-xs font-semibold tracking-wide text-foreground/80">
                  Country
                </FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="h-16 w-full">
                      <SelectValue placeholder="Select your country" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {COUNTRIES.map((country) => (
                      <SelectItem className="h-12" key={country.code} value={country.code}>
                        {country.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Language */}
          <FormField
            control={form.control}
            name="language"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="uppercase text-xs font-semibold tracking-wide text-foreground/80">
                  Preferred Language
                </FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="h-11 w-full">
                      <SelectValue placeholder="Select your language" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Gender */}
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="uppercase text-xs font-semibold tracking-wide text-foreground/80">
                  Gender
                </FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="h-11 w-full">
                      <SelectValue placeholder="Select your gender" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Organisation */}
          <FormField
            control={form.control}
            name="organisation"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="uppercase text-xs font-semibold tracking-wide text-foreground/80">
                  Organisation
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Your organisation name"
                    className="h-11 text-base px-4"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Organisation Type */}
          <FormField
            control={form.control}
            name="organisation_type"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="uppercase text-xs font-semibold tracking-wide text-foreground/80">
                  Organisation Type
                </FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="h-11 w-full">
                      <SelectValue placeholder="Select organisation type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="academic">Academic/Research Institution</SelectItem>
                    <SelectItem value="cso">Civil Society Organisation</SelectItem>
                    <SelectItem value="cbo">Community-Based Organisation</SelectItem>
                    <SelectItem value="government">Government/Public Sector</SelectItem>
                    <SelectItem value="ngo">Non-Governmental Organisation</SelectItem>
                    <SelectItem value="npo">Non-Profit Organisation</SelectItem>
                    <SelectItem value="private">Private Sector</SelectItem>
                    <SelectItem value="tvet">TVET Institution</SelectItem>
                    <SelectItem value="youth">Youth/Student Organisation</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Areas of Interest */}
        <div className="space-y-4">
          <FormLabel className="uppercase text-xs font-semibold tracking-wide text-foreground/80">
            Areas of Interest
          </FormLabel>
          <FormField
            control={form.control}
            name="areas_of_interest"
            render={() => (
              <FormItem>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {(
                    [
                      'Industrial, technical and vocational training',
                      'Gender and Transformation',
                      'Entrepreneurship and informal sector formalisation',
                      'Human Capital Development',
                      'Agribusiness and agricultural skills',
                      'Labour migration & mobility',
                      'Digital skills & future of work',
                      'Education systems & policy',
                      'Financing & investment in skills',
                      'Informal sector & livelihoods',
                      'Green skills / sustainability',
                      'Innovation & partnerships',
                      'Governance',
                    ] as const
                  ).map((item) => (
                    <FormField
                      key={item}
                      control={form.control}
                      name="areas_of_interest"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={item}
                            className="flex flex-row items-start space-x-3 space-y-0"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(item)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...(field.value || []), item])
                                    : field.onChange(field.value?.filter((value) => value !== item))
                                }}
                              />
                            </FormControl>
                            <FormLabel className="text-sm font-normal cursor-pointer">
                              {item}
                            </FormLabel>
                          </FormItem>
                        )
                      }}
                    />
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Social Links */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <FormLabel className="uppercase text-xs font-semibold tracking-wide text-foreground/80">
              Social Links
            </FormLabel>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addSocialLink}
              className="h-8 px-3 bg-brand text-white hover:bg-brand/90 hover:text-white"
            >
              <PlusIcon className="h-4 w-4 mr-1 " />
              Add Link
            </Button>
          </div>

          {socialLinks.map((_, index) => (
            <div key={index} className="flex gap-2 items-start">
              <FormField
                control={form.control}
                name={`social_links.${index}.platform`}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input {...field} placeholder="Platform (e.g., LinkedIn)" className="h-10" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`social_links.${index}.url`}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input
                        {...field}
                        type="url"
                        placeholder="https://linkedin.com/in/username"
                        className="h-10"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => removeSocialLink(index)}
                className="h-10 w-10 p-0 shrink-0"
              >
                <XIcon className="h-4 w-4" />
              </Button>
            </div>
          ))}

          {socialLinks.length === 0 && (
            <p className="text-sm text-muted-foreground">
              No social links added yet. Click "Add Link" to get started.
            </p>
          )}
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isPending}
          className="w-full h-11 text-base font-semibold tracking-wide bg-brand-orange hover:bg-brand-orange/90"
        >
          {isPending ? 'Creating Profile...' : 'Create Profile'}
        </Button>

        {/* Status Message */}
        {state.message && (
          <div
            className={cn(
              'text-sm font-medium text-center',
              state.success ? 'text-green-600 dark:text-green-400' : 'text-destructive',
            )}
          >
            {state.message}
          </div>
        )}
      </form>
    </Form>
  )
}
