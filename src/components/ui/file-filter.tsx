import React, { useState, useMemo } from 'react'
import { Filter, X } from 'lucide-react'
import { FileIcon, getFileTypeLabel } from '@/components/ui/file-icon'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { Media } from '@/payload-types'

interface FileFilterProps {
  files: Array<{
    file: number | Media
    description?: string | null
    id?: string | null
  }>
  onFilterChange: (
    filteredFiles: Array<{
      file: number | Media
      description?: string | null
      id?: string | null
    }>,
  ) => void
  className?: string
}

export const FileFilter: React.FC<FileFilterProps> = ({ files, onFilterChange, className }) => {
  const [selectedTypes, setSelectedTypes] = useState<Set<string>>(new Set())
  const [showFilters, setShowFilters] = useState(false)

  // Get unique file types
  const fileTypes = useMemo(() => {
    const typeMap = new Map<
      string,
      {
        type: string
        mimeType: string
        count: number
      }
    >()

    files.forEach((file) => {
      const media = typeof file.file === 'object' ? file.file : null
      if (!media) return

      const { mimeType, filename } = media
      const fileType = getFileTypeLabel(mimeType || '', filename || '')
      const key = `${fileType}-${mimeType}`

      if (typeMap.has(key)) {
        typeMap.get(key)!.count += 1
      } else {
        typeMap.set(key, {
          type: fileType,
          mimeType: mimeType || '',
          count: 1,
        })
      }
    })

    return Array.from(typeMap.values()).sort((a, b) => b.count - a.count)
  }, [files])

  // Filter files based on selected types
  const filteredFiles = useMemo(() => {
    if (selectedTypes.size === 0) {
      return files
    }

    return files.filter((file) => {
      const media = typeof file.file === 'object' ? file.file : null
      if (!media) return false

      const { mimeType, filename } = media
      const fileType = getFileTypeLabel(mimeType || '', filename || '')
      const key = `${fileType}-${mimeType}`

      return selectedTypes.has(key)
    })
  }, [files, selectedTypes])

  // Update parent when filtered files change
  React.useEffect(() => {
    onFilterChange(filteredFiles)
  }, [filteredFiles, onFilterChange])

  const handleTypeToggle = (typeKey: string) => {
    const newSelectedTypes = new Set(selectedTypes)
    if (newSelectedTypes.has(typeKey)) {
      newSelectedTypes.delete(typeKey)
    } else {
      newSelectedTypes.add(typeKey)
    }
    setSelectedTypes(newSelectedTypes)
  }

  const clearFilters = () => {
    setSelectedTypes(new Set())
  }

  const hasActiveFilters = selectedTypes.size > 0

  return (
    <div className={cn('bg-white border border-gray-200 rounded-lg', className)}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <Filter className="w-5 h-5 text-gray-500" />
          <h3 className="text-sm font-medium text-gray-900">Filter Files</h3>
          {hasActiveFilters && (
            <Badge variant="secondary" className="text-xs">
              {selectedTypes.size} active
            </Badge>
          )}
        </div>

        <div className="flex items-center space-x-2">
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="text-xs text-gray-500 hover:text-gray-700 underline"
            >
              Clear all
            </button>
          )}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            {showFilters ? 'Hide' : 'Show'} filters
          </button>
        </div>
      </div>

      {/* Results summary */}
      <div className="px-4 py-2 bg-gray-50 text-sm text-gray-600">
        Showing {filteredFiles.length} of {files.length} files
        {hasActiveFilters && (
          <span className="ml-1">
            ({selectedTypes.size} filter{selectedTypes.size !== 1 ? 's' : ''} applied)
          </span>
        )}
      </div>

      {/* Filter options */}
      {showFilters && (
        <div className="p-4 border-t border-gray-200">
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-gray-700">File Types</h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {fileTypes.map((fileType) => {
                const typeKey = `${fileType.type}-${fileType.mimeType}`
                const isSelected = selectedTypes.has(typeKey)

                return (
                  <button
                    key={typeKey}
                    onClick={() => handleTypeToggle(typeKey)}
                    className={cn(
                      'flex items-center space-x-2 p-2 rounded-lg border text-sm transition-colors',
                      isSelected
                        ? 'bg-blue-50 border-blue-200 text-blue-900'
                        : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50',
                    )}
                  >
                    <FileIcon mimeType={fileType.mimeType} size="sm" />
                    <span className="flex-1 text-left truncate">{fileType.type}</span>
                    <Badge variant={isSelected ? 'default' : 'secondary'} className="text-xs">
                      {fileType.count}
                    </Badge>
                  </button>
                )
              })}
            </div>

            {fileTypes.length === 0 && (
              <p className="text-gray-500 text-sm text-center py-4">No file types to filter by.</p>
            )}
          </div>
        </div>
      )}

      {/* Active filters display */}
      {hasActiveFilters && (
        <div className="px-4 py-3 border-t border-gray-200 bg-blue-50">
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-sm font-medium text-blue-900">Active filters:</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {Array.from(selectedTypes).map((typeKey) => {
              const fileType = fileTypes.find((ft) => `${ft.type}-${ft.mimeType}` === typeKey)
              if (!fileType) return null

              return (
                <div
                  key={typeKey}
                  className="flex items-center space-x-1 bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs"
                >
                  <FileIcon mimeType={fileType.mimeType} size="sm" className="w-3 h-3" />
                  <span>{fileType.type}</span>
                  <button
                    onClick={() => handleTypeToggle(typeKey)}
                    className="ml-1 hover:bg-blue-200 rounded-full p-0.5"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
