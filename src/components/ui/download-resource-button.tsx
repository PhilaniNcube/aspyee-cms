'use client'
import React, { useActionState, useTransition } from 'react'
import { Button } from './button'
import { Loader2, Download } from 'lucide-react'
import { recordDownload } from '@/lib/actions/downloads'
import { start } from 'repl'

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
  const [state, formAction, isPending] = useActionState(recordDownload, null)

  const [pending, startTransition] = useTransition()
  // Fallback if JS disabled: normal form POST triggers server action then redirect server-side.

  const clientAction = async () => {
    const data = new FormData()
    data.append('resourceId', resourceId.toString())
    data.append('fileId', fileId || '')
    data.append('href', href)

    startTransition(() => {
      console.log('Recorded download:', data)
      formAction(data)
    })
  }

  return (
    <form action={clientAction}>
      <input type="hidden" name="resourceId" value={resourceId} />
      <input type="hidden" name="href" value={href} />
      <input type="hidden" name="fileId" value={fileId || ''} />
      {fileId && <input type="hidden" name="fileId" value={fileId} />}
      <ClientButton label={label} variant={variant} size={size} submitting={isPending} />
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
