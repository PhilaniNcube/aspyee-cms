'use client'

import React, { useEffect, useState } from 'react'
import { FileText } from 'lucide-react'
import { cn } from '@/lib/utils'
import { generatePDFThumbnail } from '@/lib/pdf-utils'

interface OptimizedPDFThumbnailProps {
  url: string
  className?: string
  alt?: string
  fallbackIcon?: boolean
}

export const OptimizedPDFThumbnail: React.FC<OptimizedPDFThumbnailProps> = ({
  url,
  className,
  alt = 'PDF thumbnail',
  fallbackIcon = true,
}) => {
  const [thumbnailDataUrl, setThumbnailDataUrl] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    // Only run in browser environment
    if (typeof window === 'undefined') return

    let mounted = true

    const loadThumbnail = async () => {
      try {
        setIsLoading(true)
        setHasError(false)

        const dataUrl = await generatePDFThumbnail(url)

        if (mounted) {
          if (dataUrl) {
            setThumbnailDataUrl(dataUrl)
          } else {
            setHasError(true)
          }
          setIsLoading(false)
        }
      } catch (error) {
        console.error('Error loading PDF thumbnail:', error)
        if (mounted) {
          setHasError(true)
          setIsLoading(false)
        }
      }
    }

    loadThumbnail()

    return () => {
      mounted = false
    }
  }, [url])

  if (hasError || (!thumbnailDataUrl && !isLoading)) {
    return fallbackIcon ? (
      <div
        className={cn(
          'w-full h-full flex items-center justify-center bg-red-50 border border-red-200 rounded-lg',
          className,
        )}
      >
        <FileText className="w-8 h-8 text-red-500" />
      </div>
    ) : null
  }

  if (isLoading) {
    return (
      <div
        className={cn(
          'w-full h-full flex items-center justify-center bg-gray-50 border border-gray-200 rounded-lg',
          className,
        )}
      >
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-600"></div>
      </div>
    )
  }

  return (
    <img
      src={thumbnailDataUrl || ''}
      alt={alt}
      className={cn('w-full h-full object-cover rounded-lg', className)}
    />
  )
}
