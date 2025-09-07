'use client'

import React, { useEffect, useRef, useState } from 'react'
import { FileText } from 'lucide-react'
import { cn } from '@/lib/utils'
import { initializePDFJS } from '@/lib/pdfjs-init'
import type { PDFDocumentProxy } from 'pdfjs-dist'

interface PDFThumbnailProps {
  url: string
  className?: string
  alt?: string
  fallbackIcon?: boolean
}

export const PDFThumbnail: React.FC<PDFThumbnailProps> = ({
  url,
  className,
  alt = 'PDF thumbnail',
  fallbackIcon = true,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [pdfLoaded, setPdfLoaded] = useState(false)

  useEffect(() => {
    // Only run in browser environment
    if (typeof window === 'undefined') return

    let mounted = true
    let pdfDocument: PDFDocumentProxy | null = null

    const loadPDF = async () => {
      try {
        setIsLoading(true)
        setHasError(false)

        // Initialize PDF.js
        const pdfjsLib = await initializePDFJS()

        // Load the PDF document
        pdfDocument = await pdfjsLib.getDocument(url).promise

        if (!mounted || !pdfDocument) return

        // Get the first page
        const page = await pdfDocument.getPage(1)

        if (!mounted) return

        const canvas = canvasRef.current
        if (!canvas) return

        const context = canvas.getContext('2d')
        if (!context) return

        // Calculate scale to fit the thumbnail size
        const viewport = page.getViewport({ scale: 1 })
        const scale = Math.min(200 / viewport.width, 150 / viewport.height)
        const scaledViewport = page.getViewport({ scale })

        // Set canvas dimensions
        canvas.width = scaledViewport.width
        canvas.height = scaledViewport.height
        canvas.style.width = '100%'
        canvas.style.height = '100%'

        // Render the page
        const renderContext = {
          canvasContext: context,
          viewport: scaledViewport,
          canvas,
        }

        await page.render(renderContext).promise

        if (mounted) {
          setPdfLoaded(true)
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

    loadPDF()

    return () => {
      mounted = false
      if (pdfDocument) {
        pdfDocument.destroy()
      }
    }
  }, [url])

  if (hasError || (!pdfLoaded && !isLoading)) {
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

  return (
    <div className={cn('relative w-full h-full', className)}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-50 border border-gray-200 rounded-lg">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-600"></div>
        </div>
      )}
      <canvas
        ref={canvasRef}
        className={cn(
          'w-full h-full object-cover rounded-lg',
          isLoading ? 'opacity-0' : 'opacity-100',
          'transition-opacity duration-200',
        )}
        style={{ display: isLoading ? 'none' : 'block' }}
      />
    </div>
  )
}
