'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Resource } from '@/payload-types'
import { formatDate } from '@/lib/i18n'
import { LayoutGrid, List as ListIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface ResourceListProps {
  resources: Resource[]
  pagination?: {
    page: number
    totalPages: number
    hasNextPage: boolean
    hasPrevPage: boolean
  }
}

export default function ResourceList({ resources, pagination }: ResourceListProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  if (resources.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">📚</div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">No resources found</h3>
        <p className="text-gray-600">Try adjusting your filters or search terms.</p>
      </div>
    )
  }

  return (
    <div>
      <div className="flex justify-end mb-6">
        <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-lg">
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              'h-8 w-8 p-0',
              viewMode === 'grid' ? 'bg-white shadow-sm' : 'text-gray-500 hover:text-gray-900',
            )}
            onClick={() => setViewMode('grid')}
          >
            <LayoutGrid className="h-4 w-4" />
            <span className="sr-only">Grid view</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              'h-8 w-8 p-0',
              viewMode === 'list' ? 'bg-white shadow-sm' : 'text-gray-500 hover:text-gray-900',
            )}
            onClick={() => setViewMode('list')}
          >
            <ListIcon className="h-4 w-4" />
            <span className="sr-only">List view</span>
          </Button>
        </div>
      </div>

      {/* Resource Grid/List */}
      <div
        className={cn(
          'grid gap-6',
          viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1',
        )}
      >
        {resources.map((resource) => (
          <ResourceCard key={resource.id} resource={resource} viewMode={viewMode} />
        ))}
      </div>

      {/* Pagination - To be implemented if needed, for now just showing the list */}
      {/* {pagination && pagination.totalPages > 1 && <Pagination pagination={pagination} />} */}
    </div>
  )
}

function ResourceCard({
  resource,
  viewMode = 'grid',
}: {
  resource: Resource
  viewMode?: 'grid' | 'list'
}) {
  if (viewMode === 'list') {
    return (
      <article className="bg-white rounded-lg shadow-sm border overflow-hidden hover:shadow-md transition-shadow p-6 flex flex-col md:flex-row gap-6">
        <div className="flex-1">
          {/* Title */}
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            <Link
              href={`/knowledge-centre/${resource.id}`}
              className="hover:text-blue-600 transition-colors"
            >
              {resource.title}
            </Link>
          </h2>

          {/* Description */}
          <p className="text-gray-600 mb-4 line-clamp-2">{resource.description}</p>

          <div className="flex flex-wrap gap-2">
            {resource.themes?.map((theme) => (
              <span key={theme} className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded-full">
                {theme}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center gap-4 md:min-w-[140px] border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0 md:pl-6 mt-4 md:mt-0">
          {resource.year_published && (
            <span className="text-sm text-gray-500">{resource.year_published}</span>
          )}

          <Link
            href={`/knowledge-centre/${resource.id}`}
            className="text-blue-600 hover:underline font-medium text-sm whitespace-nowrap"
          >
            View Resource →
          </Link>
        </div>
      </article>
    )
  }

  return (
    <article className="bg-white rounded-lg shadow-sm border overflow-hidden hover:shadow-md transition-shadow p-6 flex flex-col h-full">
      {/* Title */}
      <h2 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
        <Link
          href={`/knowledge-centre/${resource.id}`}
          className="hover:text-blue-600 transition-colors"
        >
          {resource.title}
        </Link>
      </h2>

      {/* Description */}
      <p className="text-gray-600 mb-4 line-clamp-3 grow">{resource.description}</p>

      {/* Meta Information */}
      <div className="mt-auto pt-4 border-t border-gray-100">
        <div className="flex flex-wrap gap-2 mb-3">
          {resource.themes?.map((theme) => (
            <span key={theme} className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded-full">
              {theme}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between text-sm text-gray-500">
          {resource.year_published && <span>{resource.year_published}</span>}

          <Link
            href={`/knowledge-centre/${resource.id}`}
            className="text-blue-600 hover:underline font-medium"
          >
            View Resource →
          </Link>
        </div>
      </div>
    </article>
  )
}
