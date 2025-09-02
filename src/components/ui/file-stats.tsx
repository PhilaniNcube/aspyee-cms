import React from 'react'
import { FileIcon, getFileTypeLabel } from '@/components/ui/file-icon'
import { Media } from '@/payload-types'
import { cn } from '@/lib/utils'

interface FileStatsProps {
  files: Array<{
    file: number | Media
    description?: string | null
    id?: string | null
  }>
  className?: string
}

interface FileTypeStats {
  type: string
  count: number
  mimeType: string
  percentage: number
  files: Array<{
    file: number | Media
    description?: string | null
    id?: string | null
  }>
}

export const FileStats: React.FC<FileStatsProps> = ({ files, className }) => {
  // Group files by type
  const fileTypeStats = React.useMemo(() => {
    const typeMap = new Map<string, FileTypeStats>()

    files.forEach((file) => {
      const media = typeof file.file === 'object' ? file.file : null
      if (!media) return

      const { mimeType, filename } = media
      const fileType = getFileTypeLabel(mimeType || '', filename || '')
      const key = `${fileType}-${mimeType}`

      if (typeMap.has(key)) {
        const existing = typeMap.get(key)!
        existing.count += 1
        existing.files.push(file)
      } else {
        typeMap.set(key, {
          type: fileType,
          count: 1,
          mimeType: mimeType || '',
          percentage: 0,
          files: [file],
        })
      }
    })

    // Calculate percentages
    const totalFiles = files.length
    const stats = Array.from(typeMap.values()).map((stat) => ({
      ...stat,
      percentage: totalFiles > 0 ? (stat.count / totalFiles) * 100 : 0,
    }))

    // Sort by count descending
    return stats.sort((a, b) => b.count - a.count)
  }, [files])

  if (files.length === 0) {
    return (
      <div className={cn('text-gray-400 text-center py-4', className)}>No files to analyze.</div>
    )
  }

  const totalSize = files.reduce((acc, file) => {
    const media = typeof file.file === 'object' ? file.file : null
    return acc + (media?.filesize || 0)
  }, 0)

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <div className={cn('bg-white border border-gray-200 rounded-lg p-6', className)}>
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">File Statistics</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-500">Total Files:</span>
            <span className="ml-2 font-medium">{files.length}</span>
          </div>
          <div>
            <span className="text-gray-500">Total Size:</span>
            <span className="ml-2 font-medium">{formatBytes(totalSize)}</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="text-sm font-medium text-gray-700 mb-3">File Types Distribution</h4>

        {fileTypeStats.map((stat, index) => (
          <div key={`${stat.type}-${index}`} className="flex items-center space-x-3">
            <FileIcon mimeType={stat.mimeType} size="sm" className="flex-shrink-0" />

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-gray-900 truncate">{stat.type}</span>
                <span className="text-xs text-gray-500 ml-2">
                  {stat.count} file{stat.count !== 1 ? 's' : ''}
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${stat.percentage}%` }}
                ></div>
              </div>

              <div className="flex items-center justify-between mt-1">
                <span className="text-xs text-gray-400">{stat.percentage.toFixed(1)}%</span>
                <span className="text-xs text-gray-400">
                  {formatBytes(
                    stat.files.reduce((acc, file) => {
                      const media = typeof file.file === 'object' ? file.file : null
                      return acc + (media?.filesize || 0)
                    }, 0),
                  )}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {fileTypeStats.length === 0 && (
        <div className="text-gray-400 text-center py-4">No file type information available.</div>
      )}
    </div>
  )
}
