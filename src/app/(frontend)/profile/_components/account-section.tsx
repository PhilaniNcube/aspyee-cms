import { User } from '@/payload-types'
import React from 'react'
import { ProfileUpdateForm } from './profile-update-form'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const AccountSection = ({ user }: { user: User }) => {
  return (
    <div className="py-10">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
        <h2 className="text-2xl font-semibold mb-6">My Account</h2>
        <p className="text-gray-600 max-w-3xl">
          Change your account information and find all you account settings here.
        </p>
        <div className="mt-10 space-y-10">
          <ProfileUpdateForm user={user} />

          {(() => {
            const hasOptionalDetails = !!(
              user.firstName ||
              user.lastName ||
              user.bio ||
              user.phoneNumber ||
              (user.social_links && user.social_links.length > 0)
            )
            if (!hasOptionalDetails) return null
            return (
              <Card>
                <CardHeader>
                  <CardTitle>Profile Details</CardTitle>
                  <CardDescription>Your current profile information.</CardDescription>
                </CardHeader>
                <CardContent>
                  <dl className="grid gap-6 sm:grid-cols-2">
                    {user.firstName && (
                      <div>
                        <dt className="text-sm font-medium text-muted-foreground">First Name</dt>
                        <dd className="mt-1 text-sm">{user.firstName}</dd>
                      </div>
                    )}
                    {user.lastName && (
                      <div>
                        <dt className="text-sm font-medium text-muted-foreground">Last Name</dt>
                        <dd className="mt-1 text-sm">{user.lastName}</dd>
                      </div>
                    )}
                    {user.email && (
                      <div>
                        <dt className="text-sm font-medium text-muted-foreground">Email</dt>
                        <dd className="mt-1 text-sm">{user.email}</dd>
                      </div>
                    )}
                    {user.phoneNumber && (
                      <div>
                        <dt className="text-sm font-medium text-muted-foreground">Phone Number</dt>
                        <dd className="mt-1 text-sm">{user.phoneNumber}</dd>
                      </div>
                    )}
                    {user.bio && (
                      <div className="sm:col-span-2">
                        <dt className="text-sm font-medium text-muted-foreground">Bio</dt>
                        <dd className="mt-1 text-sm leading-relaxed whitespace-pre-line">
                          {user.bio}
                        </dd>
                      </div>
                    )}
                    {user.social_links && user.social_links.length > 0 && (
                      <div className="sm:col-span-2">
                        <dt className="text-sm font-medium text-muted-foreground">Social Links</dt>
                        <dd className="mt-2">
                          <ul className="space-y-2">
                            {user.social_links.map((link) => {
                              if (!link) return null
                              const label = link.platform || 'Link'
                              return (
                                <li key={link.id || `${label}-${link.url}`} className="text-sm">
                                  <span className="font-medium">{label}: </span>
                                  {link.url ? (
                                    <a
                                      href={link.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-primary underline underline-offset-2 break-all"
                                    >
                                      {link.url}
                                    </a>
                                  ) : (
                                    <span className="text-muted-foreground">No URL</span>
                                  )}
                                </li>
                              )
                            })}
                          </ul>
                        </dd>
                      </div>
                    )}
                  </dl>
                </CardContent>
              </Card>
            )
          })()}
        </div>
      </div>
    </div>
  )
}

export default AccountSection
