'use client'

import React, { useMemo, Suspense } from 'react'
import { Resource } from '@/payload-types'
import ResourceFilters from './resource-filters'
import Image from 'next/image'
import { Calendar, Share2, Bookmark, Download, Star, CircleOffIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

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
                <div
                  key={resource.id}
                  className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200"
                >
                  {/* Featured Image */}
                  <div className="relative h-48 bg-gradient-to-br from-blue-50 to-blue-100">
                    {resource.featured_image &&
                    typeof resource.featured_image === 'object' &&
                    'url' in resource.featured_image ? (
                      <Image
                        src={resource.featured_image.url || ''}
                        alt={resource.title}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <Image
                        src="https://4kav3digtb.ufs.sh/f/FBDFb9YX4geO2vwcZQrzOM7sxtk6jHilDYeuQU9LayhdfS3w"
                        alt={resource.title}
                        fill
                        className="object-cover"
                      />
                    )}

                    {/* Target Group Badge */}

                    {/* Good Practice Badge */}
                  </div>

                  <div className="p-6">
                    <div className="flex items-center justify-between p-0 mb-3">
                      {resource.target_groups && resource.target_groups.length > 0 && (
                        <div className="">
                          <Badge className="px-3 py-1 bg-blue-600 text-white text-xs font-medium rounded-full">
                            {(resource.target_groups as string[])[0]}
                          </Badge>
                        </div>
                      )}
                      <div className="flex items-center text-gray-500 text-sm">
                        <Calendar className="w-4 h-4 mr-1" />
                        {formatDate(resource.year_published)}
                      </div>
                    </div>
                    {/* Date */}

                    {/* Title */}
                    <h3 className="text-lg font-semibold capitalize text-gray-900 mb-3 line-clamp-2">
                      {resource.title}
                    </h3>

                    {/* Resource Type and Language */}
                    <div className="text-sm text-gray-600 mb-4">
                      <span>{getResourceTypeLabel(resource.type)}</span>
                      {resource.language && <span className="ml-2">| {resource.language}</span>}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center space-x-4">
                        <Button variant="ghost" size="sm" className="p-2 h-auto">
                          <Share2 className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="p-2 h-auto">
                          <Bookmark className="w-4 h-4" />
                        </Button>
                        <div className="flex items-center text-gray-500 text-sm">
                          <Download className="w-4 h-4 mr-1" />
                          254
                        </div>
                      </div>
                      {resource.good_practice === 'yes' ? (
                        <Badge className="">
                          <span className="inline-flex items-center px-2 py-1 bg-yellow-400 text-yellow-900 text-xs font-medium rounded-full">
                            <Star className="w-3 h-3 mr-1" />
                            Good Practice
                          </span>
                        </Badge>
                      ) : (
                        <Badge className="bg-red-100 text-red-800">
                          <CircleOffIcon className="w-3 h-3 mr-1" />
                          <span className="text-gray-500">Good Practice</span>
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ResourceList
