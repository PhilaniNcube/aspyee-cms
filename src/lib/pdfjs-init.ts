// PDF.js initialization utility
let pdfjs: any = null
let isInitialized = false

export const initializePDFJS = async () => {
  if (isInitialized && pdfjs) {
    return pdfjs
  }

  try {
    // Only run in browser environment
    if (typeof window === 'undefined') {
      throw new Error('PDF.js can only be initialized in browser environment')
    }

    const pdfjsModule = await import('pdfjs-dist')
    pdfjs = pdfjsModule.default || pdfjsModule

    // Set worker source with fallback URLs
    const workerUrls = [
      `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`,
      `https://cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`,
      `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`,
    ]

    // Try to set worker source
    for (const workerUrl of workerUrls) {
      try {
        pdfjs.GlobalWorkerOptions.workerSrc = workerUrl
        break
      } catch (e) {
        console.warn(`Failed to set worker source: ${workerUrl}`, e)
      }
    }

    isInitialized = true
    return pdfjs
  } catch (error) {
    console.error('Failed to initialize PDF.js:', error)
    throw error
  }
}

export const resetPDFJS = () => {
  pdfjs = null
  isInitialized = false
}
