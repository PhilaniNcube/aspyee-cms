'use client'

import React, { Suspense } from 'react'
import { Resource } from '@/payload-types'
import ResourceFilters from './resource-filters'
import ResourceCard from './resource-card'
import Link from 'next/link'
import { useQueryStates, parseAsArrayOf, parseAsString, parseAsInteger, parseAsBoolean } from 'nuqs'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { FILTER_MAPPINGS } from '@/lib/filter-options'

// Simple types for this component
interface PaginatedResult<T> {
  docs: T[]
  totalDocs: number
  totalPages: number
  page: number
  limit: number
  hasNextPage: boolean
  hasPrevPage: boolean
  nextPage: number | null
  prevPage: number | null
}

interface ResourceListProps {
  initialResources: Resource[]
  title?: string
  targetGroup?: string // Optional: for target-group specific filtering
  paginationData?: {
    totalDocs: number
    totalPages: number
    hasNextPage: boolean
    hasPrevPage: boolean
    currentPage: number
    limit: number
  }
}

interface FilterState {
  search?: string | null
  yearPublished?: string[] | null
  country?: string[] | null
  resourceType?: string[] | null
  targetGroup?: string[] | null
  theme?: string[] | null
  language?: string[] | null
  goodPractice?: boolean | null
  page?: number | null
}

// Helper function to get resource type label
const getResourceTypeLabel = (type: string) => {
  // Use the mapping from the collection schema
  return FILTER_MAPPINGS.resourceType.valueToLabel[type] || type
}

// Helper function to format date
const formatDate = (dateString: string | number | null | undefined) => {
  if (!dateString) return ''

  if (typeof dateString === 'number') {
    return `${dateString}`
  }

  try {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    })
  } catch {
    return dateString.toString()
  }
}

// Pagination component
interface PaginationProps {
  currentPage: number
  totalPages: number
  hasNextPage: boolean
  hasPrevPage: boolean
  onPageChange: (page: number) => void
  isLoading?: boolean
}

const ResourceList: React.FC<ResourceListProps> = ({
  initialResources,
  title = 'Resources',
  targetGroup,
  paginationData: propPaginationData,
}) => {
  // URL state management for filters and pagination
  const [filters, setFilters] = useQueryStates({
    search: parseAsString,
    yearPublished: parseAsArrayOf(parseAsString),
    country: parseAsArrayOf(parseAsString),
    resourceType: parseAsArrayOf(parseAsString),
    targetGroup: parseAsArrayOf(parseAsString),
    theme: parseAsArrayOf(parseAsString),
    language: parseAsArrayOf(parseAsString),
    goodPractice: parseAsBoolean,
    page: parseAsInteger.withDefault(1),
  })

  // Use the URL state to filter the initialResources
  const filteredResources = React.useMemo(() => {
    let resources = initialResources

    // Search filter - searches in title and description
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase()
      resources = resources.filter((resource) => {
        const title = resource.title?.toLowerCase() || ''
        const description = resource.description?.toLowerCase() || ''

        return title.includes(searchTerm) || description.includes(searchTerm)
      })
    }

    // Year published filter
    if (filters.yearPublished && filters.yearPublished.length > 0) {
      resources = resources.filter((resource) => {
        if (resource.year_published === null || resource.year_published === undefined) {
          return false
        }
        return filters.yearPublished!.includes(resource.year_published.toString())
      })
    }

    // Country filter - countries is an array of strings
    if (filters.country && filters.country.length > 0) {
      resources = resources.filter((resource) => {
        if (!resource.countries || !Array.isArray(resource.countries)) return false

        return resource.countries.some((country: string) => filters.country!.includes(country))
      })
    }

    // Resource type filter
    if (filters.resourceType && filters.resourceType.length > 0) {
      resources = resources.filter(
        (resource) => resource.type && filters.resourceType!.includes(resource.type),
      )
    }

    // Target group filter - target_groups is an array of strings
    if (filters.targetGroup && filters.targetGroup.length > 0) {
      resources = resources.filter((resource) => {
        if (!resource.target_groups || !Array.isArray(resource.target_groups)) return false

        return resource.target_groups.some((group: string) => filters.targetGroup!.includes(group))
      })
    }

    // Theme filter - themes is an array of strings
    if (filters.theme && filters.theme.length > 0) {
      resources = resources.filter((resource) => {
        if (!resource.themes || !Array.isArray(resource.themes)) return false

        return resource.themes.some((theme: string) => filters.theme!.includes(theme))
      })
    }

    // Language filter
    if (filters.language && filters.language.length > 0) {
      resources = resources.filter(
        (resource) => resource.language && filters.language!.includes(resource.language),
      )
    }

    // Good practice filter
    if (filters.goodPractice === true) {
      resources = resources.filter((resource) => resource.good_practice === 'yes')
    }

    return resources
  }, [initialResources, filters, propPaginationData])

  const [currentPage, setCurrentPage] = React.useState(filters.page || 1)
  const [isChangingPage, setIsChangingPage] = React.useState(false)
  const itemsPerPage = 12 // Fixed number for client-side pagination

  // Calculate pagination data based on filtered resources (client-side)
  const paginationData = React.useMemo(() => {
    const totalPages = Math.ceil(filteredResources.length / itemsPerPage) || 1
    const hasNextPage = currentPage < totalPages
    const hasPrevPage = currentPage > 1
    const nextPage = hasNextPage ? currentPage + 1 : null
    const prevPage = hasPrevPage ? currentPage - 1 : null

    return {
      totalDocs: filteredResources.length,
      totalPages,
      hasNextPage,
      hasPrevPage,
      currentPage,
      nextPage,
      prevPage,
      limit: itemsPerPage,
    }
  }, [filteredResources.length, currentPage, itemsPerPage]) // Get current page resources
  const currentPageResources = React.useMemo(() => {
    // Client-side pagination: slice the filtered resources
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return filteredResources.slice(startIndex, endIndex)
  }, [filteredResources, currentPage, itemsPerPage])

  // Reset to page 1 when filters change
  React.useEffect(() => {
    if (currentPage > paginationData.totalPages && paginationData.totalPages > 0) {
      setCurrentPage(1)
      setFilters((current) => ({ ...current, page: 1 }))
    }
  }, [paginationData.totalPages, currentPage, setFilters])

  // Handler for page changes
  const handlePageChange = React.useCallback(
    (page: number) => {
      setIsChangingPage(true)
      setCurrentPage(page)

      // Update URL state with the new page
      setFilters((current) => ({ ...current, page }))

      // Scroll to top of resources section
      const listElement = document.getElementById('list')
      if (listElement) {
        listElement.scrollIntoView({ behavior: 'smooth' })
      }

      // Reset loading state after a brief delay
      setTimeout(() => setIsChangingPage(false), 300)
    },
    [setFilters],
  )

  // Enhanced Pagination component
  const Pagination: React.FC<PaginationProps> = ({
    currentPage,
    totalPages,
    hasNextPage,
    hasPrevPage,
    onPageChange,
    isLoading = false,
  }) => {
    const handlePrevious = () => {
      if (hasPrevPage && currentPage > 1) {
        onPageChange(currentPage - 1)
      }
    }

    const handleNext = () => {
      if (hasNextPage && currentPage < totalPages) {
        onPageChange(currentPage + 1)
      }
    }

    const handlePageClick = (page: number) => {
      if (page !== currentPage && page >= 1 && page <= totalPages) {
        onPageChange(page)
      }
    }

    // Generate page numbers to display
    const getPageNumbers = () => {
      const delta = 2 // Number of pages to show on each side of current page
      const pages: (number | string)[] = []

      // Always show first page
      if (totalPages > 1) {
        pages.push(1)
      }

      // Add pages around current page
      const start = Math.max(2, currentPage - delta)
      const end = Math.min(totalPages - 1, currentPage + delta)

      // Add ellipsis if there's a gap after first page
      if (start > 2) {
        pages.push('...')
      }

      // Add pages in range
      for (let i = start; i <= end; i++) {
        if (i !== 1 && i !== totalPages) {
          pages.push(i)
        }
      }

      // Add ellipsis if there's a gap before last page
      if (end < totalPages - 1) {
        pages.push('...')
      }

      // Always show last page
      if (totalPages > 1) {
        pages.push(totalPages)
      }

      return pages
    }

    if (totalPages <= 1) return null

    const pageNumbers = getPageNumbers()

    return (
      <div className="flex flex-col items-center gap-4 mt-8">
        {/* Results summary */}
        <div className="text-sm text-gray-600">
          Showing {(currentPage - 1) * paginationData.limit + 1} to{' '}
          {Math.min(currentPage * paginationData.limit, paginationData.totalDocs)} of{' '}
          {paginationData.totalDocs} results
        </div>

        {/* Pagination controls */}
        <div className="flex items-center gap-1">
          {/* Previous button */}
          <Button
            variant="outline"
            size="sm"
            onClick={handlePrevious}
            disabled={!hasPrevPage || isLoading}
            className="flex items-center gap-1"
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>

          {/* Page numbers */}
          <div className="flex items-center gap-1 mx-2">
            {pageNumbers.map((page, index) => (
              <React.Fragment key={`page-${page}-${index}`}>
                {page === '...' ? (
                  <span className="px-2 py-1 text-gray-400">...</span>
                ) : (
                  <Button
                    variant={currentPage === page ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => handlePageClick(page as number)}
                    disabled={isLoading}
                    className={`min-w-[40px] ${
                      currentPage === page
                        ? 'bg-orange-500 hover:bg-orange-600 text-white'
                        : 'hover:bg-orange-50'
                    }`}
                  >
                    {page}
                  </Button>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Next button */}
          <Button
            variant="outline"
            size="sm"
            onClick={handleNext}
            disabled={!hasNextPage || isLoading}
            className="flex items-center gap-1"
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Jump to page (for large pagination) */}
        {totalPages > 10 && (
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-600">Go to page:</span>
            <input
              type="number"
              min="1"
              max={totalPages}
              value={currentPage}
              onChange={(e) => {
                const page = parseInt(e.target.value)
                if (page >= 1 && page <= totalPages) {
                  handlePageClick(page)
                }
              }}
              className="w-16 px-2 py-1 border border-gray-300 rounded text-center focus:outline-none focus:ring-2 focus:ring-orange-500"
              disabled={isLoading}
            />
            <span className="text-gray-600">of {totalPages}</span>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="!shadow-xl">
      <div className="flex container max-w-[1520px] px-6 md:px-10 lg:px-16 mx-auto py-8 flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className="lg:w-1/4">
          <div className="sticky top-4">
            <Suspense
              fallback={<div className="p-4 text-center text-gray-500">Loading filters...</div>}
            >
              <ResourceFilters />
            </Suspense>
          </div>
        </div>

        {/* Resources Grid */}
        <div className="lg:w-3/4">
          {/* No results state */}
          {initialResources.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No resources found.</p>
              <p className="text-gray-400 text-sm mt-2">
                Try adjusting your filters to see more results.
              </p>
            </div>
          )}

          {/* Resources Grid */}
          {filteredResources.length > 0 && (
            <>
              {/* Results header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
                <p className="text-sm text-gray-600">
                  {paginationData.totalDocs} resource{paginationData.totalDocs !== 1 ? 's' : ''}{' '}
                  found
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6" id="list">
                {isChangingPage
                  ? // Loading state during page changes
                    Array.from({ length: itemsPerPage }).map((_, index) => (
                      <div
                        key={`loading-${index}`}
                        className="animate-pulse bg-gray-200 rounded-lg h-64"
                      />
                    ))
                  : currentPageResources.map((resource) => (
                      <Link key={resource.id} href={`/knowledge-centre/${resource.id}`}>
                        <ResourceCard
                          resource={resource}
                          getResourceTypeLabel={getResourceTypeLabel}
                          formatDate={formatDate}
                        />
                      </Link>
                    ))}
              </div>

              {/* Pagination */}
              {paginationData.totalPages > 1 && (
                <Pagination
                  currentPage={paginationData.currentPage}
                  totalPages={paginationData.totalPages}
                  hasNextPage={paginationData.hasNextPage}
                  hasPrevPage={paginationData.hasPrevPage}
                  onPageChange={handlePageChange}
                  isLoading={isChangingPage}
                />
              )}
            </>
          )}

          {/* No results after filtering */}
          {filteredResources.length === 0 && initialResources.length > 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No resources match your current filters.</p>
              <p className="text-gray-400 text-sm mt-2">
                Try adjusting or clearing your filters to see more results.
              </p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => {
                  setFilters({
                    search: null,
                    yearPublished: null,
                    country: null,
                    resourceType: null,
                    targetGroup: null,
                    theme: null,
                    language: null,
                    page: 1,
                  })
                }}
              >
                Clear All Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ResourceList
