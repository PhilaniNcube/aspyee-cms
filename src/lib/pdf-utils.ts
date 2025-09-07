// PDF thumbnail cache to avoid re-rendering the same PDFs
import { initializePDFJS } from './pdfjs-init'

const thumbnailCache = new Map<string, string>()

export const generatePDFThumbnail = async (url: string): Promise<string | null> => {
  // Only run in browser environment
  if (typeof window === 'undefined') {
    return null
  }

  // Check cache first
  if (thumbnailCache.has(url)) {
    return thumbnailCache.get(url) || null
  }

  try {
    // Initialize PDF.js
    const pdfjsLib = await initializePDFJS()

    // Load the PDF document
    const pdfDocument = await pdfjsLib.getDocument(url).promise

    // Get the first page
    const page = await pdfDocument.getPage(1)

    // Create canvas
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')

    if (!context) {
      throw new Error('Could not get canvas context')
    }

    // Calculate scale for thumbnail (max 200x200)
    const viewport = page.getViewport({ scale: 1 })
    const scale = Math.min(200 / viewport.width, 200 / viewport.height)
    const scaledViewport = page.getViewport({ scale })

    // Set canvas dimensions
    canvas.width = scaledViewport.width
    canvas.height = scaledViewport.height

    // Render the page
    const renderContext = {
      canvasContext: context,
      viewport: scaledViewport,
      canvas,
    }

    await page.render(renderContext).promise

    // Convert to data URL
    const dataUrl = canvas.toDataURL('image/png', 0.8)

    // Cache the result
    thumbnailCache.set(url, dataUrl)

    // Cleanup
    pdfDocument.destroy()

    return dataUrl
  } catch (error) {
    console.error('Error generating PDF thumbnail:', error)
    return null
  }
}

export const clearThumbnailCache = () => {
  thumbnailCache.clear()
}
