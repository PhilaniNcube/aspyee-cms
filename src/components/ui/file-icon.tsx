import React from 'react'
import {
  File,
  FileText,
  Image,
  Video,
  Music,
  Archive,
  FileSpreadsheet,
  FileImage,
  FileVideo,
  FileAudio,
  Download,
  Eye,
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface FileIconProps {
  mimeType: string
  fileName?: string
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

export const FileIcon: React.FC<FileIconProps> = ({
  mimeType,
  fileName,
  className,
  size = 'md',
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  }

  const getIconAndColor = (mimeType: string, fileName?: string) => {
    const mime = mimeType.toLowerCase()
    const file = fileName?.toLowerCase() || ''

    // PDF files
    if (mime === 'application/pdf') {
      return {
        icon: FileText,
        color: 'text-red-500',
        bgColor: 'bg-red-50',
        borderColor: 'border-red-200',
      }
    }

    // Images
    if (mime.startsWith('image/')) {
      return {
        icon: FileImage,
        color: 'text-green-500',
        bgColor: 'bg-green-50',
        borderColor: 'border-green-200',
      }
    }

    // Videos
    if (mime.startsWith('video/')) {
      return {
        icon: FileVideo,
        color: 'text-purple-500',
        bgColor: 'bg-purple-50',
        borderColor: 'border-purple-200',
      }
    }

    // Audio
    if (mime.startsWith('audio/')) {
      return {
        icon: FileAudio,
        color: 'text-orange-500',
        bgColor: 'bg-orange-50',
        borderColor: 'border-orange-200',
      }
    }

    // Spreadsheets
    if (
      mime === 'application/vnd.ms-excel' ||
      mime === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
      file.endsWith('.xls') ||
      file.endsWith('.xlsx') ||
      file.endsWith('.csv')
    ) {
      return {
        icon: FileSpreadsheet,
        color: 'text-emerald-500',
        bgColor: 'bg-emerald-50',
        borderColor: 'border-emerald-200',
      }
    }

    // Word documents
    if (
      mime === 'application/msword' ||
      mime === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
      file.endsWith('.doc') ||
      file.endsWith('.docx')
    ) {
      return {
        icon: FileText,
        color: 'text-blue-500',
        bgColor: 'bg-blue-50',
        borderColor: 'border-blue-200',
      }
    }

    // PowerPoint
    if (
      mime === 'application/vnd.ms-powerpoint' ||
      mime === 'application/vnd.openxmlformats-officedocument.presentationml.presentation' ||
      file.endsWith('.ppt') ||
      file.endsWith('.pptx')
    ) {
      return {
        icon: FileText,
        color: 'text-orange-600',
        bgColor: 'bg-orange-50',
        borderColor: 'border-orange-200',
      }
    }

    // Archives
    if (
      mime === 'application/zip' ||
      mime === 'application/x-rar-compressed' ||
      mime === 'application/x-7z-compressed' ||
      file.endsWith('.zip') ||
      file.endsWith('.rar') ||
      file.endsWith('.7z')
    ) {
      return {
        icon: Archive,
        color: 'text-amber-500',
        bgColor: 'bg-amber-50',
        borderColor: 'border-amber-200',
      }
    }

    // Text files
    if (mime.startsWith('text/')) {
      return {
        icon: FileText,
        color: 'text-gray-500',
        bgColor: 'bg-gray-50',
        borderColor: 'border-gray-200',
      }
    }

    // Default
    return {
      icon: File,
      color: 'text-gray-500',
      bgColor: 'bg-gray-50',
      borderColor: 'border-gray-200',
    }
  }

  const { icon: Icon, color, bgColor, borderColor } = getIconAndColor(mimeType, fileName)

  return (
    <div
      className={cn(
        'flex items-center justify-center rounded border',
        bgColor,
        borderColor,
        sizeClasses[size],
        className,
      )}
    >
      <Icon
        className={cn(color, size === 'sm' ? 'w-3 h-3' : size === 'md' ? 'w-4 h-4' : 'w-5 h-5')}
      />
    </div>
  )
}

export const getFileTypeLabel = (mimeType: string, fileName?: string): string => {
  const mime = mimeType.toLowerCase()
  const file = fileName?.toLowerCase() || ''

  if (mime === 'application/pdf') return 'PDF Document'
  if (mime.startsWith('image/')) return 'Image'
  if (mime.startsWith('video/')) return 'Video'
  if (mime.startsWith('audio/')) return 'Audio'

  if (
    mime === 'application/vnd.ms-excel' ||
    mime === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
    file.endsWith('.xls') ||
    file.endsWith('.xlsx')
  )
    return 'Excel Spreadsheet'

  if (file.endsWith('.csv')) return 'CSV File'

  if (
    mime === 'application/msword' ||
    mime === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
    file.endsWith('.doc') ||
    file.endsWith('.docx')
  )
    return 'Word Document'

  if (
    mime === 'application/vnd.ms-powerpoint' ||
    mime === 'application/vnd.openxmlformats-officedocument.presentationml.presentation' ||
    file.endsWith('.ppt') ||
    file.endsWith('.pptx')
  )
    return 'PowerPoint Presentation'

  if (
    mime === 'application/zip' ||
    mime === 'application/x-rar-compressed' ||
    mime === 'application/x-7z-compressed' ||
    file.endsWith('.zip') ||
    file.endsWith('.rar') ||
    file.endsWith('.7z')
  )
    return 'Archive'

  if (mime.startsWith('text/')) return 'Text Document'

  return 'File'
}

export const getFileSizeFormatted = (bytes?: number): string => {
  if (!bytes) return 'Unknown size'

  const units = ['B', 'KB', 'MB', 'GB']
  let size = bytes
  let unitIndex = 0

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024
    unitIndex++
  }

  return `${size.toFixed(unitIndex === 0 ? 0 : 1)} ${units[unitIndex]}`
}
