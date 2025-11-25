'use client'

import React from 'react'
import Link from 'next/link'
import { Resource } from '@/payload-types'
import { formatDate } from '@/lib/i18n'

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
      {/* Resource Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {resources.map((resource) => (
          <ResourceCard key={resource.id} resource={resource} />
        ))}
      </div>

      {/* Pagination - To be implemented if needed, for now just showing the list */}
      {/* {pagination && pagination.totalPages > 1 && <Pagination pagination={pagination} />} */}
    </div>
  )
}

function ResourceCard({ resource }: { resource: Resource }) {
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
