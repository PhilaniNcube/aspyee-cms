import { Resource } from '@/payload-types'
import { getPayload } from 'payload'
import config from '@payload-config'

// Pagination interfaces
export interface PaginationParams {
  page?: number
  limit?: number
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

// Filter interfaces
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

/**
 * Fetches resources with pagination and filtering support
 */
export async function getResourcesPaginated(
  filters: ResourceFilters = {},
  pagination: PaginationParams = {},
): Promise<PaginatedResult<Resource>> {
  try {
    const payload = await getPayload({ config })
    const { page = 1, limit = 12 } = pagination

    // Build the where clause dynamically
    const where: any = {}

    // Search across multiple fields
    if (filters.search && filters.search.trim()) {
      const searchTerm = filters.search.trim()
      where.or = [
        { title: { contains: searchTerm } },
        { description: { contains: searchTerm } },
        { themes: { contains: searchTerm } },
        { target_groups: { contains: searchTerm } },
        { countries: { contains: searchTerm } },
      ]
    }

    // Type filter
    if (filters.type) {
      if (Array.isArray(filters.type)) {
        where.type = { in: filters.type }
      } else {
        where.type = { equals: filters.type }
      }
    }

    // Theme filter
    if (filters.theme) {
      if (Array.isArray(filters.theme)) {
        where.themes = { in: filters.theme }
      } else {
        where.themes = { contains: filters.theme }
      }
    }

    // Language filter
    if (filters.language) {
      if (Array.isArray(filters.language)) {
        where.language = { in: filters.language }
      } else {
        where.language = { equals: filters.language }
      }
    }

    // Country filter
    if (filters.country) {
      if (Array.isArray(filters.country)) {
        where.countries = { in: filters.country }
      } else {
        where.countries = { contains: filters.country }
      }
    }

    // Target group filter
    if (filters.targetGroup) {
      if (Array.isArray(filters.targetGroup)) {
        where.target_groups = { in: filters.targetGroup }
      } else {
        where.target_groups = { contains: filters.targetGroup }
      }
    }

    // Year published filter
    if (filters.yearPublished) {
      if (Array.isArray(filters.yearPublished)) {
        where.year_published = { in: filters.yearPublished }
      } else {
        where.year_published = { equals: filters.yearPublished }
      }
    }

    // Good practice filter
    if (filters.goodPractice) {
      where.good_practice = { equals: filters.goodPractice }
    }

    const result = await payload.find({
      collection: 'resources',
      where,
      page,
      limit,
      sort: '-createdAt', // Sort by newest first
    })

    return {
      docs: result.docs as Resource[],
      totalDocs: result.totalDocs,
      totalPages: result.totalPages,
      page: result.page || page,
      limit: result.limit,
      hasNextPage: result.hasNextPage || false,
      hasPrevPage: result.hasPrevPage || false,
      nextPage: result.nextPage || null,
      prevPage: result.prevPage || null,
    }
  } catch (error) {
    console.error('Error fetching paginated resources:', error)
    return {
      docs: [],
      totalDocs: 0,
      totalPages: 0,
      page: 1,
      limit: pagination.limit || 12,
      hasNextPage: false,
      hasPrevPage: false,
      nextPage: null,
      prevPage: null,
    }
  }
}

/**
 * Fetches related resources based on shared target groups, type, or themes, excluding the current resource
 */
export async function getRelatedResources(
  resource: Resource,
  limit: number = 5,
): Promise<Resource[]> {
  try {
    const payload = await getPayload({ config })

    // Build a where clause to find resources with at least one matching target group, type, or theme, but not the same id
    const where: any = {
      id: { not_equals: resource.id },
    }

    // Prefer to match by target_groups, type, or themes if available
    if (resource.target_groups && resource.target_groups.length > 0) {
      where.target_groups = { in: resource.target_groups }
    }
    if (resource.type) {
      where.type = { equals: resource.type }
    }
    if (resource.themes && resource.themes.length > 0) {
      where.themes = { in: resource.themes }
    }

    const result = await payload.find({
      collection: 'resources',
      where,
      limit,
    })

    return result.docs as Resource[]
  } catch (error) {
    console.error('Error fetching related resources:', error)
    return []
  }
}

/**
 * Fetches resources that have "Policymakers" in their target_groups with pagination
 */
/**
 * Fetches resources that have "Policymakers" in their target_groups with pagination and filtering
 */
export async function getResourcesForPolicymakersWithPagination(
  params: { filters?: ResourceFilters } & PaginationParams = {},
): Promise<PaginatedResult<Resource>> {
  const { filters = {}, ...pagination } = params
  return getResourcesPaginated({ ...filters, targetGroup: 'Policymakers' }, pagination)
}

/**
 * Fetches resources that have "Researchers" in their target_groups with pagination and filtering
 */
export async function getResourcesForResearchersWithPagination(
  params: { filters?: ResourceFilters } & PaginationParams = {},
): Promise<PaginatedResult<Resource>> {
  const { filters = {}, ...pagination } = params
  return getResourcesPaginated({ ...filters, targetGroup: 'Researchers' }, pagination)
}

/**
 * Fetches resources that have "Youth" in their target_groups with pagination and filtering
 */
export async function getResourcesForYouthWithPagination(
  params: { filters?: ResourceFilters } & PaginationParams = {},
): Promise<PaginatedResult<Resource>> {
  const { filters = {}, ...pagination } = params
  return getResourcesPaginated({ ...filters, targetGroup: 'Youth' }, pagination)
}

/**
 * Fetches resources that have "Educators & Implementers" in their target_groups with pagination and filtering
 */
export async function getResourcesForEducatorsWithPagination(
  params: { filters?: ResourceFilters } & PaginationParams = {},
): Promise<PaginatedResult<Resource>> {
  const { filters = {}, ...pagination } = params
  return getResourcesPaginated({ ...filters, targetGroup: 'Educators & Implementers' }, pagination)
}

/**
 * Fetches resources that have "Private Sector / Employers" in their target_groups with pagination and filtering
 */
export async function getResourcesForPrivateSectorWithPagination(
  params: { filters?: ResourceFilters } & PaginationParams = {},
): Promise<PaginatedResult<Resource>> {
  const { filters = {}, ...pagination } = params
  return getResourcesPaginated(
    { ...filters, targetGroup: 'Private Sector / Employers' },
    pagination,
  )
}

/**
 * Fetches resources that have "TVET Managers / Principals" in their target_groups with pagination
 */
export async function getResourcesForTVETManagersWithPagination(
  pagination: PaginationParams = {},
): Promise<PaginatedResult<Resource>> {
  return getResourcesPaginated({ targetGroup: 'TVET Managers / Principals' }, pagination)
}

/**
 * Fetches resources that have "HR / Labour Market Actors" in their target_groups with pagination
 */
export async function getResourcesForHRLabourMarketWithPagination(
  pagination: PaginationParams = {},
): Promise<PaginatedResult<Resource>> {
  return getResourcesPaginated({ targetGroup: 'HR / Labour Market Actors' }, pagination)
}

/**
 * Fetches resources that have "Donors & Development Partners" in their target_groups with pagination
 */
export async function getResourcesForDonorsWithPagination(
  pagination: PaginationParams = {},
): Promise<PaginatedResult<Resource>> {
  return getResourcesPaginated({ targetGroup: 'Donors & Development Partners' }, pagination)
}

/**
 * Fetches resources by target group with pagination
 */
export async function getResourcesByTargetGroupWithPagination(
  targetGroup: string,
  pagination: PaginationParams = {},
): Promise<PaginatedResult<Resource>> {
  return getResourcesPaginated({ targetGroup }, pagination)
}

/**
 * Fetches all resources with optional filters and pagination
 */
export async function getAllResourcesWithPagination(
  filters: ResourceFilters = {},
  pagination: PaginationParams = {},
): Promise<PaginatedResult<Resource>> {
  return getResourcesPaginated(filters, pagination)
}

/**
 * Fetches a single resource by ID
 */
export async function getResourceById(id: number): Promise<Resource | null> {
  try {
    const payload = await getPayload({ config })

    const result = await payload.findByID({
      collection: 'resources',
      id,
    })

    return result as Resource
  } catch (error) {
    console.error(`Error fetching resource with ID ${id}:`, error)
    return null
  }
}

// Legacy compatibility functions - return only the docs array for backward compatibility
// These should be gradually migrated to use the new paginated functions

/**
 * @deprecated Use getResourcesForPolicymakersWithPagination instead
 */
export async function getResourcesForPolicymakersLegacy(): Promise<Resource[]> {
  const result = await getResourcesForPolicymakersWithPagination({ limit: 100 })
  return result.docs
}

/**
 * @deprecated Use getResourcesForResearchersWithPagination instead
 */
export async function getResourcesForResearchersLegacy(): Promise<Resource[]> {
  const result = await getResourcesForResearchersWithPagination({ limit: 100 })
  return result.docs
}

/**
 * @deprecated Use getResourcesForYouthWithPagination instead
 */
export async function getResourcesForYouthLegacy(): Promise<Resource[]> {
  const result = await getResourcesForYouthWithPagination({ limit: 100 })
  return result.docs
}

/**
 * @deprecated Use getResourcesForEducatorsWithPagination instead
 */
export async function getResourcesForEducatorsLegacy(): Promise<Resource[]> {
  const result = await getResourcesForEducatorsWithPagination({ limit: 100 })
  return result.docs
}

/**
 * @deprecated Use getResourcesForPrivateSectorWithPagination instead
 */
export async function getResourcesForPrivateSectorLegacy(): Promise<Resource[]> {
  const result = await getResourcesForPrivateSectorWithPagination({ limit: 100 })
  return result.docs
}

/**
 * @deprecated Use getResourcesForTVETManagersWithPagination instead
 */
export async function getResourcesForTVETManagersLegacy(): Promise<Resource[]> {
  const result = await getResourcesForTVETManagersWithPagination({ limit: 100 })
  return result.docs
}

/**
 * @deprecated Use getResourcesForHRLabourMarketWithPagination instead
 */
export async function getResourcesForHRLabourMarketLegacy(): Promise<Resource[]> {
  const result = await getResourcesForHRLabourMarketWithPagination({ limit: 100 })
  return result.docs
}

/**
 * @deprecated Use getResourcesForDonorsWithPagination instead
 */
export async function getResourcesForDonorsLegacy(): Promise<Resource[]> {
  const result = await getResourcesForDonorsWithPagination({ limit: 100 })
  return result.docs
}

/**
 * @deprecated Use getResourcesByTargetGroupWithPagination instead
 */
export async function getResourcesByTargetGroupLegacy(targetGroup: string): Promise<Resource[]> {
  const result = await getResourcesByTargetGroupWithPagination(targetGroup, { limit: 100 })
  return result.docs
}

// Backward compatibility exports - these maintain the original function names
// but call the legacy versions that return Resource[] instead of PaginatedResult<Resource>

export { getResourcesForPolicymakersLegacy as getResourcesForPolicymakers }
export { getResourcesForResearchersLegacy as getResourcesForResearchers }
export { getResourcesForYouthLegacy as getResourcesForYouth }
export { getResourcesForEducatorsLegacy as getResourcesForEducators }
export { getResourcesForPrivateSectorLegacy as getResourcesForPrivateSector }
export { getResourcesForTVETManagersLegacy as getResourcesForTVETManagers }
export { getResourcesForHRLabourMarketLegacy as getResourcesForHRLabourMarket }
export { getResourcesForDonorsLegacy as getResourcesForDonors }
export { getResourcesByTargetGroupLegacy as getResourcesByTargetGroup }
export { getAllResourcesLegacy as getAllResources }

/**
 * @deprecated Use getAllResourcesWithPagination instead
 */
export async function getAllResourcesLegacy(
  options: {
    type?: string
    theme?: string
    language?: string
    country?: string
    goodPractice?: 'yes' | 'no'
    limit?: number
  } = {},
): Promise<Resource[]> {
  const filters: ResourceFilters = {
    type: options.type,
    theme: options.theme,
    language: options.language,
    country: options.country,
    goodPractice: options.goodPractice,
  }
  const pagination: PaginationParams = {
    limit: options.limit || 50,
  }
  const result = await getAllResourcesWithPagination(filters, pagination)
  return result.docs
}
