import { useInfiniteQuery } from '@tanstack/react-query'
import { Resource } from '@/payload-types'
import { ResourceFilters, PaginatedResult } from './use-resources'

interface UseInfiniteResourcesParams {
  filters?: ResourceFilters
  limit?: number
  enabled?: boolean
}

// Function to fetch a page of resources
async function fetchResourcesPage({
  pageParam = 1,
  filters = {},
  limit = 12,
}: {
  pageParam: number
  filters?: ResourceFilters
  limit?: number
}): Promise<PaginatedResult<Resource>> {
  const params = new URLSearchParams()

  // Add pagination
  params.set('page', pageParam.toString())
  params.set('limit', limit.toString())

  // Add filters (same logic as before)
  if (filters.search) {
    params.set('search', filters.search)
  }

  if (filters.type) {
    const types = Array.isArray(filters.type) ? filters.type : [filters.type]
    types.forEach((type) => params.append('type', type))
  }

  // ... add other filters as needed

  const response = await fetch(`/api/resources?${params.toString()}`)

  if (!response.ok) {
    throw new Error('Failed to fetch resources')
  }

  return response.json()
}

// React Query hook for infinite scrolling/loading
export function useInfiniteResources({
  filters = {},
  limit = 12,
  enabled = true,
}: UseInfiniteResourcesParams = {}) {
  return useInfiniteQuery({
    queryKey: ['resources', 'infinite', filters, limit],
    queryFn: ({ pageParam }) => fetchResourcesPage({ pageParam, filters, limit }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.hasNextPage ? lastPage.page + 1 : undefined
    },
    enabled,
    // Combine all pages into a single array
    select: (data) => ({
      pages: data.pages,
      pageParams: data.pageParams,
      resources: data.pages.flatMap((page) => page.docs),
      totalDocs: data.pages[0]?.totalDocs || 0,
      hasNextPage: data.pages[data.pages.length - 1]?.hasNextPage || false,
    }),
  })
}

export default useInfiniteResources
