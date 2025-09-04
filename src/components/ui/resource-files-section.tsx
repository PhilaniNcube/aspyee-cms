'use client'
import React, { useState } from 'react'
import { FileList } from '@/components/ui/file-display'
import { FileStats } from '@/components/ui/file-stats'
import { FileFilter } from '@/components/ui/file-filter'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { LayoutGrid, List, BarChart3, Settings } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Media } from '@/payload-types'

interface ResourceFilesSectionProps {
  files: Array<{
    file: number | Media
    description?: string | null
    id?: string | null
  }>
  className?: string
  defaultView?: 'grid' | 'list' | 'stats'
  showStats?: boolean
  showFilter?: boolean
  title?: string
  resourceId?: number | string
}

export const ResourceFilesSection: React.FC<ResourceFilesSectionProps> = ({
  files,
  className,
  defaultView = 'grid',
  showStats = true,
  showFilter = true,
  title = 'Resource Files',
  resourceId,
}) => {
  const [filteredFiles, setFilteredFiles] = useState(files)
  const [currentView, setCurrentView] = useState<'grid' | 'list' | 'stats'>(defaultView)

  const handleFilterChange = (newFilteredFiles: typeof files) => {
    setFilteredFiles(newFilteredFiles)
  }

  if (!files || files.length === 0) {
    return (
      <div className={cn('bg-white border border-gray-200 rounded-lg p-8 text-center', className)}>
        <div className="text-gray-400 mb-2">
          <LayoutGrid className="w-12 h-12 mx-auto mb-4 opacity-50" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No Files Available</h3>
        <p className="text-gray-500">This resource doesn't have any files attached yet.</p>
      </div>
    )
  }

  return (
    <div className={cn('space-y-6', className)}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">{title}</h2>

        {/* View switcher */}
        <div className="flex items-center space-x-2">
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setCurrentView('grid')}
              className={cn(
                'p-2 rounded-md transition-colors',
                currentView === 'grid'
                  ? 'bg-white shadow-sm text-gray-900'
                  : 'text-gray-500 hover:text-gray-700',
              )}
              title="Grid view"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrentView('list')}
              className={cn(
                'p-2 rounded-md transition-colors',
                currentView === 'list'
                  ? 'bg-white shadow-sm text-gray-900'
                  : 'text-gray-500 hover:text-gray-700',
              )}
              title="List view"
            >
              <List className="w-4 h-4" />
            </button>
            {showStats && (
              <button
                onClick={() => setCurrentView('stats')}
                className={cn(
                  'p-2 rounded-md transition-colors',
                  currentView === 'stats'
                    ? 'bg-white shadow-sm text-gray-900'
                    : 'text-gray-500 hover:text-gray-700',
                )}
                title="Statistics view"
              >
                <BarChart3 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Filter section */}
      {showFilter && files.length > 1 && (
        <FileFilter files={files} onFilterChange={handleFilterChange} />
      )}

      {/* Content based on current view */}
      {currentView === 'stats' ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Statistics */}
          <FileStats files={filteredFiles} />

          {/* Mini file list */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Files</h3>
            <FileList
              files={filteredFiles.slice(0, 5)}
              variant="list"
              showPreview={false}
              className="space-y-2"
              emptyMessage="No files match the current filters."
            />
            {filteredFiles.length > 5 && (
              <button
                onClick={() => setCurrentView('list')}
                className="mt-4 text-sm text-blue-600 hover:text-blue-800 underline"
              >
                View all {filteredFiles.length} files
              </button>
            )}
          </div>
        </div>
      ) : (
        <FileList
          files={filteredFiles}
          variant={currentView}
          showPreview={true}
          emptyMessage="No files match the current filters."
          resourceId={resourceId}
        />
      )}

      {/* Summary info */}
      {filteredFiles.length !== files.length && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800">
            <span className="font-medium">Filtered results:</span> Showing {filteredFiles.length} of{' '}
            {files.length} files.
            <button
              onClick={() => handleFilterChange(files)}
              className="ml-2 underline hover:no-underline"
            >
              Show all files
            </button>
          </p>
        </div>
      )}
    </div>
  )
}
