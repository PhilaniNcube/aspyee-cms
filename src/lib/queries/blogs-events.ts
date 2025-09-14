import { Blog, Event, NewsAndEventsPage } from '@/payload-types'
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

// Filter interfaces for blogs
export interface BlogFilters {
  search?: string
  categories?: string | string[]
  tags?: string | string[]
  author?: string
}

// Filter interfaces for events
export interface EventFilters {
  search?: string
  location?: string
  dateFrom?: string
  dateTo?: string
  tags?: string | string[]
  organizer?: string
}

/**
 * Fetches blogs with pagination and filtering support
 */
export async function getBlogsPaginated(
  filters: BlogFilters = {},
  pagination: PaginationParams = {},
): Promise<PaginatedResult<Blog>> {
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
        { excerpt: { contains: searchTerm } },
        { 'tags.tag': { contains: searchTerm } },
      ]
    }

    // Categories filter
    if (filters.categories) {
      if (Array.isArray(filters.categories)) {
        where.categories = { in: filters.categories }
      } else {
        where.categories = { equals: filters.categories }
      }
    }

    // Tags filter
    if (filters.tags) {
      if (Array.isArray(filters.tags)) {
        where['tags.tag'] = { in: filters.tags }
      } else {
        where['tags.tag'] = { contains: filters.tags }
      }
    }

    // Author filter
    if (filters.author) {
      where.author = { equals: filters.author }
    }

    console.log('Blog Query where:', JSON.stringify(where, null, 2))

    const result = await payload.find({
      collection: 'blogs',
      where,
      page,
      limit,
      sort: '-createdAt',
      depth: 2, // Include related data like author and categories
    })

    return {
      docs: result.docs,
      totalDocs: result.totalDocs,
      totalPages: result.totalPages,
      page: result.page || 1,
      limit: result.limit,
      hasNextPage: result.hasNextPage || false,
      hasPrevPage: result.hasPrevPage || false,
      nextPage: result.nextPage ?? null,
      prevPage: result.prevPage ?? null,
    }
  } catch (error) {
    console.error('Error fetching blogs:', error)
    throw new Error('Failed to fetch blogs')
  }
}

/**
 * Fetches a single blog by slug
 */
export async function getBlogBySlug(slug: string): Promise<Blog | null> {
  try {
    const payload = await getPayload({ config })

    const result = await payload.find({
      collection: 'blogs',
      where: {
        slug: { equals: slug },
      },
      limit: 1,
      depth: 2, // Include related data like author and categories
    })

    return result.docs[0] || null
  } catch (error) {
    console.error('Error fetching blog by slug:', error)
    return null
  }
}

/**
 * Fetches events with pagination and filtering support
 */
export async function getEventsPaginated(
  filters: EventFilters = {},
  pagination: PaginationParams = {},
): Promise<PaginatedResult<Event>> {
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
        { location: { contains: searchTerm } },
        { organizer: { contains: searchTerm } },
        { 'tags.tag': { contains: searchTerm } },
      ]
    }

    // Location filter
    if (filters.location) {
      where.location = { contains: filters.location }
    }

    // Date range filters
    if (filters.dateFrom) {
      where.date = { ...where.date, greater_than_equal: filters.dateFrom }
    }

    if (filters.dateTo) {
      where.date = { ...where.date, less_than_equal: filters.dateTo }
    }

    // Tags filter
    if (filters.tags) {
      if (Array.isArray(filters.tags)) {
        where['tags.tag'] = { in: filters.tags }
      } else {
        where['tags.tag'] = { contains: filters.tags }
      }
    }

    // Organizer filter
    if (filters.organizer) {
      where.organizer = { contains: filters.organizer }
    }

    console.log('Event Query where:', JSON.stringify(where, null, 2))

    const result = await payload.find({
      collection: 'events',
      where,
      page,
      limit,
      sort: 'date', // Sort by event date (upcoming first)
      depth: 1,
    })

    return {
      docs: result.docs,
      totalDocs: result.totalDocs,
      totalPages: result.totalPages,
      page: result.page || 1,
      limit: result.limit,
      hasNextPage: result.hasNextPage || false,
      hasPrevPage: result.hasPrevPage || false,
      nextPage: result.nextPage ?? null,
      prevPage: result.prevPage ?? null,
    }
  } catch (error) {
    console.error('Error fetching events:', error)
    throw new Error('Failed to fetch events')
  }
}

/**
 * Fetches a single event by ID
 */
export async function getEventById(id: string): Promise<Event | null> {
  try {
    const payload = await getPayload({ config })

    const result = await payload.findByID({
      collection: 'events',
      id,
      depth: 1,
    })

    return result || null
  } catch (error) {
    console.error('Error fetching event by ID:', error)
    return null
  }
}

/**
 * Get all blog categories for filtering
 */
export async function getBlogCategories() {
  try {
    const payload = await getPayload({ config })

    const result = await payload.find({
      collection: 'categories',
      limit: 100,
      sort: 'name',
    })

    return result.docs
  } catch (error) {
    console.error('Error fetching blog categories:', error)
    return []
  }
}

/**
 * Get all unique blog tags for filtering
 */
export async function getBlogTags() {
  try {
    const payload = await getPayload({ config })

    const result = await payload.find({
      collection: 'blogs',
      limit: 1000,
      depth: 0,
    })

    // Extract unique tags
    const tags = new Set<string>()
    result.docs.forEach((blog) => {
      if (blog.tags && Array.isArray(blog.tags)) {
        blog.tags.forEach((tagObj: any) => {
          if (tagObj.tag) {
            tags.add(tagObj.tag)
          }
        })
      }
    })

    return Array.from(tags).sort()
  } catch (error) {
    console.error('Error fetching blog tags:', error)
    return []
  }
}

/**
 * Get all unique event tags for filtering
 */
export async function getEventTags() {
  try {
    const payload = await getPayload({ config })

    const result = await payload.find({
      collection: 'events',
      limit: 1000,
      depth: 0,
    })

    // Extract unique tags
    const tags = new Set<string>()
    result.docs.forEach((event) => {
      if (event.tags && Array.isArray(event.tags)) {
        event.tags.forEach((tagObj: any) => {
          if (tagObj.tag) {
            tags.add(tagObj.tag)
          }
        })
      }
    })

    return Array.from(tags).sort()
  } catch (error) {
    console.error('Error fetching event tags:', error)
    return []
  }
}

/**
 * Fetches the first NewsAndEventsPage configuration
 */
export async function getNewsAndEventsPage(): Promise<NewsAndEventsPage | null> {
  try {
    const payload = await getPayload({ config })

    const result = await payload.find({
      collection: 'news-and-events-page',
      limit: 1,
      depth: 2, // Include related media
    })

    return result.docs[0] || null
  } catch (error) {
    console.error('Error fetching news and events page:', error)
    return null
  }
}
