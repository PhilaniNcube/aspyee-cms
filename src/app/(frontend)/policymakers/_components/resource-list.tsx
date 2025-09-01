'use client'

import React, { useMemo, Suspense } from 'react'
import { Resource } from '@/payload-types'
import ResourceFilters from './resource-filters'
import ResourceCard from './resource-card'
import Link from 'next/link'

interface ResourceListProps {
  initialResources: Resource[]
}

interface FilterState {
  yearPublished?: string[] | null
  country?: string[] | null
  resourceType?: string[] | null
  targetGroup?: string[] | null
  theme?: string[] | null
  language?: string[] | null
}

// Helper function to get resource type label
const getResourceTypeLabel = (type: string) => {
  const typeMap: Record<string, string> = {
    academic: 'Academic / Research Paper',
    case_study: 'Case Study / Good Practice',
    evaluation: 'Evaluation Review',
    framework: 'Framework/Standard',
    multimedia: 'Multimedia',
    policy: 'Policy/Strategy',
    report: 'Report/Data',
    toolkit: 'Toolkit/Guide',
  }
  return typeMap[type] || type
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

const ResourceList: React.FC<ResourceListProps> = ({ initialResources }) => {
  const [filters, setFilters] = React.useState<FilterState>({})

  // Filter resources based on active filters
  const filteredResources = useMemo(() => {
    let filtered = [...initialResources]

    // Filter by year published
    if (filters.yearPublished && filters.yearPublished.length > 0) {
      filtered = filtered.filter((resource) =>
        filters.yearPublished!.includes(resource.year_published?.toString() || ''),
      )
    }

    // Filter by country
    if (filters.country && filters.country.length > 0) {
      filtered = filtered.filter((resource) => {
        if (!resource.countries || !Array.isArray(resource.countries)) return false
        return filters.country!.some((filterCountry) =>
          (resource.countries as string[]).includes(filterCountry),
        )
      })
    }

    // Filter by resource type
    if (filters.resourceType && filters.resourceType.length > 0) {
      filtered = filtered.filter((resource) => filters.resourceType!.includes(resource.type))
    }

    // Filter by target group
    if (filters.targetGroup && filters.targetGroup.length > 0) {
      filtered = filtered.filter((resource) => {
        if (!resource.target_groups || !Array.isArray(resource.target_groups)) return false
        return filters.targetGroup!.some((filterGroup) =>
          (resource.target_groups as string[]).includes(filterGroup),
        )
      })
    }

    // Filter by theme
    if (filters.theme && filters.theme.length > 0) {
      filtered = filtered.filter((resource) => {
        if (!resource.themes || !Array.isArray(resource.themes)) return false
        return filters.theme!.some((filterTheme) =>
          (resource.themes as string[]).includes(filterTheme),
        )
      })
    }

    // Filter by language
    if (filters.language && filters.language.length > 0) {
      filtered = filtered.filter((resource) => filters.language!.includes(resource.language))
    }

    return filtered
  }, [initialResources, filters])

  const handleFiltersChange = (newFilters: FilterState) => {
    setFilters(newFilters)
  }

  return (
    <div className="container max-w-[1440px] mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className="lg:w-1/4">
          <div className="sticky top-4">
            <Suspense
              fallback={<div className="p-4 text-center text-gray-500">Loading filters...</div>}
            >
              <ResourceFilters onFiltersChange={handleFiltersChange} />
            </Suspense>
          </div>
        </div>

        {/* Resources Grid */}
        <div className="lg:w-3/4">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Resources for Policymakers</h2>
            <p className="text-gray-600 mt-2">
              Showing {filteredResources.length} of {initialResources.length} resources
            </p>
          </div>

          {filteredResources.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No resources found matching your filters.</p>
              <p className="text-gray-400 text-sm mt-2">
                Try adjusting your filters to see more results.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6">
              {filteredResources.map((resource) => (
                <Link key={resource.id} href={`/knowledge-centre/${resource.id}`}>
                  <ResourceCard
                    key={resource.id}
                    resource={resource}
                    getResourceTypeLabel={getResourceTypeLabel}
                    formatDate={formatDate}
                  />
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ResourceList
