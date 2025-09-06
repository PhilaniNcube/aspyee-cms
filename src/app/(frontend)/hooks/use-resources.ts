import { useQuery } from '@tanstack/react-query'
import { Resource } from '@/payload-types'

// Client-side types (matching server-side types)
export interface ResourceFilters {
  search?: string
  type?: string | string[]
  theme?: string | string[]
  language?: string | string[]
  country?: string | string[]
  targetGroup?: string | string[]
  yearPublished?: number | number[]
  goodPractice?: 'yes' | 'no'
}

export interface PaginatedResult<T> {
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

interface UseResourcesParams {
  filters?: ResourceFilters
  page?: number
  limit?: number
  enabled?: boolean
}

// Function to fetch resources from API
async function fetchResources({
  filters = {},
  page = 1,
  limit = 12,
}: {
  filters?: ResourceFilters
  page?: number
  limit?: number
}): Promise<PaginatedResult<Resource>> {
  const params = new URLSearchParams()

  // Add pagination
  params.set('page', page.toString())
  params.set('limit', limit.toString())

  // Add filters
  if (filters.search) {
    params.set('search', filters.search)
  }

  if (filters.type) {
    const types = Array.isArray(filters.type) ? filters.type : [filters.type]
    types.forEach((type) => params.append('type', type))
  }

  if (filters.theme) {
    const themes = Array.isArray(filters.theme) ? filters.theme : [filters.theme]
    themes.forEach((theme) => params.append('theme', theme))
  }

  if (filters.language) {
    const languages = Array.isArray(filters.language) ? filters.language : [filters.language]
    languages.forEach((lang) => params.append('language', lang))
  }

  if (filters.country) {
    const countries = Array.isArray(filters.country) ? filters.country : [filters.country]
    countries.forEach((country) => params.append('country', country))
  }

  if (filters.targetGroup) {
    const targetGroups = Array.isArray(filters.targetGroup)
      ? filters.targetGroup
      : [filters.targetGroup]
    targetGroups.forEach((group) => params.append('targetGroup', group))
  }

  if (filters.yearPublished) {
    const years = Array.isArray(filters.yearPublished)
      ? filters.yearPublished
      : [filters.yearPublished]
    years.forEach((year) => params.append('yearPublished', year.toString()))
  }

  if (filters.goodPractice) {
    params.set('goodPractice', filters.goodPractice)
  }

  const response = await fetch(`/api/resources?${params.toString()}`)

  if (!response.ok) {
    throw new Error('Failed to fetch resources')
  }

  return response.json()
}

// React Query hook for fetching resources
export function useResources({
  filters = {},
  page = 1,
  limit = 12,
  enabled = true,
}: UseResourcesParams = {}) {
  return useQuery({
    queryKey: ['resources', filters, page, limit],
    queryFn: () => fetchResources({ filters, page, limit }),
    enabled: Boolean(enabled), // Ensure it's always a boolean
    placeholderData: (previousData: PaginatedResult<Resource> | undefined) => previousData, // Keep previous data while loading new data
  })
}

// Hook specifically for fetching resources with initial data (for SSR)
export function useResourcesWithInitialData({
  initialData,
  filters = {},
  page = 1,
  limit = 12,
  enabled = true,
}: UseResourcesParams & {
  initialData: PaginatedResult<Resource>
}) {
  return useQuery({
    queryKey: ['resources', filters, page, limit],
    queryFn: () => fetchResources({ filters, page, limit }),
    initialData,
    enabled: Boolean(enabled), // Ensure it's always a boolean
    placeholderData: (previousData: PaginatedResult<Resource> | undefined) => previousData,
  })
}
