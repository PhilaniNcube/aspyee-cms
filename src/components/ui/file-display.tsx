import React, { useState } from 'react'
import { Download, Eye, ExternalLink, Calendar, FileCheck } from 'lucide-react'
import { FileIcon, getFileTypeLabel, getFileSizeFormatted } from '@/components/ui/file-icon'
import { cn } from '@/lib/utils'
import { Media } from '@/payload-types'

interface FileDisplayProps {
  file: {
    file: number | Media
    description?: string | null
    id?: string | null
  }
  className?: string
  variant?: 'card' | 'list' | 'grid'
  showPreview?: boolean
}

export const FileDisplay: React.FC<FileDisplayProps> = ({
  file,
  className,
  variant = 'card',
  showPreview = true,
}) => {
  const [imageError, setImageError] = useState(false)

  // Extract media object
  const media = typeof file.file === 'object' ? file.file : null

  if (!media) {
    return (
      <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
        <p className="text-gray-500 text-sm">File not available</p>
      </div>
    )
  }

  const { filename, mimeType, url, filesize, width, height, thumbnailURL, alt } = media

  const fileTypeLabel = getFileTypeLabel(mimeType || '', filename || '')
  const fileSizeFormatted = getFileSizeFormatted(filesize || undefined)

  const isImage = mimeType?.startsWith('image/')
  const isVideo = mimeType?.startsWith('video/')
  const isPDF = mimeType === 'application/pdf'

  const canPreview = isImage || isVideo || isPDF

  const handleDownload = () => {
    if (url) {
      const link = document.createElement('a')
      link.href = url
      link.download = filename || 'download'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  const handlePreview = () => {
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer')
    }
  }

  if (variant === 'list') {
    return (
      <div
        className={cn(
          'flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors',
          className,
        )}
      >
        <div className="flex items-center space-x-3 flex-1 min-w-0">
          <FileIcon mimeType={mimeType || ''} fileName={filename || ''} size="md" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              {file.description || filename || 'Untitled file'}
            </p>
            <div className="flex items-center space-x-2 text-xs text-gray-500">
              <span>{fileTypeLabel}</span>
              <span>•</span>
              <span>{fileSizeFormatted}</span>
              {width && height && (
                <>
                  <span>•</span>
                  <span>
                    {width} × {height}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2 ml-4">
          {canPreview && showPreview && (
            <button
              onClick={handlePreview}
              className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
              title="Preview"
            >
              <Eye className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={handleDownload}
            className="p-2 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-full transition-colors"
            title="Download"
          >
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>
    )
  }

  if (variant === 'grid') {
    return (
      <div
        className={cn(
          'group relative bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow',
          className,
        )}
      >
        {/* Preview area */}
        <div className="aspect-video bg-gray-50 rounded-lg mb-3 overflow-hidden relative">
          {isImage && !imageError && (thumbnailURL || url) ? (
            <img
              src={thumbnailURL || url || ''}
              alt={alt || file.description || 'File preview'}
              className="w-full h-full object-cover"
              onError={() => setImageError(true)}
            />
          ) : isVideo && url ? (
            <video src={url} className="w-full h-full object-cover" preload="metadata" />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <FileIcon mimeType={mimeType || ''} fileName={filename || ''} size="lg" />
            </div>
          )}

          {/* Overlay actions */}
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100">
            <div className="flex space-x-2">
              {canPreview && showPreview && (
                <button
                  onClick={handlePreview}
                  className="p-2 bg-white rounded-full text-gray-700 hover:bg-gray-100 transition-colors"
                  title="Preview"
                >
                  <Eye className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={handleDownload}
                className="p-2 bg-white rounded-full text-gray-700 hover:bg-gray-100 transition-colors"
                title="Download"
              >
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* File info */}
        <div>
          <h4 className="text-sm font-medium text-gray-900 truncate mb-1">
            {file.description || filename || 'Untitled file'}
          </h4>
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>{fileTypeLabel}</span>
            <span>{fileSizeFormatted}</span>
          </div>
          {width && height && (
            <p className="text-xs text-gray-400 mt-1">
              {width} × {height}
            </p>
          )}
        </div>
      </div>
    )
  }

  // Default card variant
  return (
    <div
      className={cn(
        'bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow group',
        className,
      )}
    >
      <div className="flex items-start space-x-4">
        {/* File icon/preview */}
        <div className="flex-shrink-0">
          {isImage && !imageError && (thumbnailURL || url) ? (
            <div className="w-16 h-16 rounded-lg overflow-hidden">
              <img
                src={thumbnailURL || url || ''}
                alt={alt || file.description || 'File preview'}
                className="w-full h-full object-cover"
                onError={() => setImageError(true)}
              />
            </div>
          ) : (
            <div className="w-16 h-16 flex items-center justify-center rounded-lg bg-gray-50 border border-gray-200">
              <FileIcon mimeType={mimeType || ''} fileName={filename || ''} size="lg" />
            </div>
          )}
        </div>

        {/* File details */}
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-medium text-gray-900 mb-1">
            {file.description || filename || 'Untitled file'}
          </h4>

          <div className="flex items-center space-x-3 text-xs text-gray-500 mb-2">
            <span className="flex items-center">
              <FileCheck className="w-3 h-3 mr-1" />
              {fileTypeLabel}
            </span>
            <span>{fileSizeFormatted}</span>
            {width && height && (
              <span>
                {width} × {height}
              </span>
            )}
          </div>

          {filename && <p className="text-xs text-gray-400 truncate">{filename}</p>}
        </div>

        {/* Actions */}
        <div className="flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity">
          {canPreview && showPreview && (
            <button
              onClick={handlePreview}
              className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              title="Preview file"
            >
              <Eye className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={handleDownload}
            className="p-2 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
            title="Download file"
          >
            <Download className="w-4 h-4" />
          </button>
          <button
            onClick={handlePreview}
            className="p-2 text-gray-500 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
            title="Open in new tab"
          >
            <ExternalLink className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

interface FileListProps {
  files: Array<{
    file: number | Media
    description?: string | null
    id?: string | null
  }>
  variant?: 'card' | 'list' | 'grid'
  showPreview?: boolean
  className?: string
  emptyMessage?: string
  title?: string
}

export const FileList: React.FC<FileListProps> = ({
  files,
  variant = 'card',
  showPreview = true,
  className,
  emptyMessage = 'No files available.',
  title = 'Files',
}) => {
  if (!files || files.length === 0) {
    return <div className={cn('text-gray-400 text-center py-8', className)}>{emptyMessage}</div>
  }

  const gridClasses = {
    card: 'space-y-4',
    list: 'space-y-2',
    grid: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4',
  }

  return (
    <div className={className}>
      {title && (
        <div className="flex items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <span className="ml-2 text-sm text-gray-500">
            ({files.length} {files.length === 1 ? 'file' : 'files'})
          </span>
        </div>
      )}

      <div className={gridClasses[variant]}>
        {files.map((file, index) => (
          <FileDisplay
            key={file.id || index}
            file={file}
            variant={variant}
            showPreview={showPreview}
          />
        ))}
      </div>
    </div>
  )
}
