'use client'
import React, { useTransition } from 'react'
import { Button } from './button'
import { Loader2, Download } from 'lucide-react'
import { recordDownload } from '@/lib/actions/downloads'

// We use a <form action={serverFn}> pattern so the server action can run even without JS.
// Props: resourceId (required), href (destination URL), optional fileId for granular download tracking.
export function DownloadResourceButton({
  resourceId,
  href,
  fileId,
  label = 'Download',
  variant = 'secondary',
  size = 'sm',
}: {
  resourceId: number | string
  href: string
  fileId?: string
  label?: string
  variant?: React.ComponentProps<typeof Button>['variant']
  size?: React.ComponentProps<typeof Button>['size']
}) {
  const [pending] = useTransition()
  // Fallback if JS disabled: normal form POST triggers server action then redirect server-side.
  return (
    <form
      action={async (formData: FormData) => {
        'use server'

        const rid = formData.get('resourceId') as string
        const fid = formData.get('fileId') as string | null
        await recordDownload(rid, fid || undefined)
        // Redirect after server action (server redirect keeps non-JS working)
        const { redirect } = await import('next/navigation')
        redirect(formData.get('href') as string)
      }}
    >
      <input type="hidden" name="resourceId" value={resourceId} />
      <input type="hidden" name="href" value={href} />
      {fileId && <input type="hidden" name="fileId" value={fileId} />}
      <ClientButton label={label} variant={variant} size={size} submitting={pending} />
    </form>
  )
}

function ClientButton({
  label,
  submitting,
  variant,
  size,
}: {
  label: string
  submitting: boolean
  variant: React.ComponentProps<typeof Button>['variant']
  size: React.ComponentProps<typeof Button>['size']
}) {
  return (
    <Button
      type="submit"
      variant={variant}
      size={size}
      disabled={submitting}
      aria-busy={submitting}
    >
      {submitting ? <Loader2 className="animate-spin" /> : <Download className="size-4" />}
      {label && <span>{label}</span>}
    </Button>
  )
}

export default DownloadResourceButton
