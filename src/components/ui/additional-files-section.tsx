'use client'
import React, { useState } from 'react'
import { FileList } from '@/components/ui/file-display'
import { FileStats } from '@/components/ui/file-stats'
import { FileFilter } from '@/components/ui/file-filter'
import { LayoutGrid, List, BarChart3, Plus, FileText } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Media } from '@/payload-types'
import { Button } from '@/components/ui/button'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'

interface AdditionalFilesSectionProps {
  additionalFiles: Array<{
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
  collapsible?: boolean
  defaultOpen?: boolean
}

export const AdditionalFilesSection: React.FC<AdditionalFilesSectionProps> = ({
  additionalFiles,
  className,
  defaultView = 'grid',
  showStats = true,
  showFilter = true,
  title = 'Additional Files',
  resourceId,
  collapsible = true,
  defaultOpen = false,
}) => {
  const [filteredFiles, setFilteredFiles] = useState(additionalFiles)
  const [currentView, setCurrentView] = useState<'grid' | 'list' | 'stats'>(defaultView)
  const [isOpen, setIsOpen] = useState(defaultOpen)

  const handleFilterChange = (newFilteredFiles: typeof additionalFiles) => {
    setFilteredFiles(newFilteredFiles)
  }

  if (!additionalFiles || additionalFiles.length === 0) {
    return null // Don't render anything if no additional files
  }

  const content = (
    <div className={cn('space-y-6', className)}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
            {additionalFiles.length} {additionalFiles.length === 1 ? 'file' : 'files'}
          </span>
        </div>

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
      {showFilter && additionalFiles.length > 1 && (
        <FileFilter files={additionalFiles} onFilterChange={handleFilterChange} />
      )}

      {/* Content based on current view */}
      {currentView === 'stats' ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Statistics */}
          <FileStats files={filteredFiles} />

          {/* Mini file list */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Recent Additional Files</h4>
            <FileList
              files={filteredFiles.slice(0, 5)}
              variant="list"
              showPreview={false}
              className="space-y-2"
              emptyMessage="No additional files match the current filters."
            />
            {filteredFiles.length > 5 && (
              <button
                onClick={() => setCurrentView('list')}
                className="mt-4 text-sm text-blue-600 hover:text-blue-800 underline"
              >
                View all {filteredFiles.length} additional files
              </button>
            )}
          </div>
        </div>
      ) : (
        <FileList
          files={filteredFiles}
          variant={currentView}
          showPreview={true}
          emptyMessage="No additional files match the current filters."
          resourceId={resourceId}
        />
      )}

      {/* Summary info */}
      {filteredFiles.length !== additionalFiles.length && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800">
            <span className="font-medium">Filtered results:</span> Showing {filteredFiles.length} of{' '}
            {additionalFiles.length} additional files.
            <button
              onClick={() => handleFilterChange(additionalFiles)}
              className="ml-2 underline hover:no-underline"
            >
              Show all additional files
            </button>
          </p>
        </div>
      )}
    </div>
  )

  if (collapsible) {
    return (
      <div className={cn('border border-gray-200 rounded-lg bg-white', className)}>
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <CollapsibleTrigger asChild>
            <Button
              variant="ghost"
              className="w-full flex items-center justify-between p-4 hover:bg-gray-50"
            >
              <div className="flex items-center space-x-3">
                <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-lg">
                  <FileText className="w-4 h-4 text-blue-600" />
                </div>
                <div className="text-left">
                  <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
                  <p className="text-sm text-gray-500">
                    {additionalFiles.length} additional{' '}
                    {additionalFiles.length === 1 ? 'file' : 'files'} available
                  </p>
                </div>
              </div>
              <Plus className={cn('w-4 h-4 transition-transform', isOpen && 'rotate-45')} />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="p-4 pt-0">{content}</CollapsibleContent>
        </Collapsible>
      </div>
    )
  }

  return content
}
