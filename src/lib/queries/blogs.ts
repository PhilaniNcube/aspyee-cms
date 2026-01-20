import 'server-only'
import { getPayload } from 'payload'
import config from '@payload-config'
import type { Blog } from '@/payload-types'

// Fetch all published blogs
export const fetchPublishedBlogs = async (locale: string = 'en'): Promise<Blog[]> => {
  const payload = await getPayload({ config })
  try {
    const blogs = await payload.find({
      collection: 'blogs',
      where: {
        and: [
          {
            published: {
              equals: true,
            },
          },
          {
            title: {
              not_equals: undefined,
            },
          },
        ],
      },
      locale: locale as any,
    })
    return blogs.docs as Blog[]
  } catch (error) {
    console.error('Error fetching published blogs:', error)
    throw error
  }
}

// Fetch a single blog by its slug
export const fetchBlogBySlug = async (
  slug: string,
  locale: string = 'en',
): Promise<Blog | null> => {
  const payload = await getPayload({ config })
  try {
    const blog = await payload.find({
      collection: 'blogs',
      where: {
        and: [
          {
            slug: {
              equals: slug,
            },
          },
          {
            title: {
              not_equals: undefined,
            },
          },
        ],
      },
      locale: locale as any,
    })
    return blog.docs[0] || null
  } catch (error) {
    console.error('Error fetching blog by slug:', error)
    throw error
  }
}

// fetch all archived blogs from the last 12 months and return the paginated result
export const fetchArchivedBlogs = async (locale: string = 'en'): Promise<Blog[]> => {
  const payload = await getPayload({ config })
  try {
    // Calculate the date 12 months ago from today
    const twelveMonthsAgo = new Date()
    twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 12)

    const blogs = await payload.find({
      collection: 'blogs',
      where: {
        and: [
          {
            archived: {
              equals: true,
            },
          },
          {
            publishedDate: {
              greater_than_equal: twelveMonthsAgo.toISOString(),
            },
          },
        ],
      },
      locale: locale as any,
    })
    return blogs.docs as Blog[]
  } catch (error) {
    console.error('Error fetching archived blogs:', error)
    throw error
  }
}

// add a function to return blogs based on a filter/search query that searches title and excerpt
export const fetchBlogsBySearchQuery = async (
  query: string,
  locale: string = 'en',
): Promise<Blog[]> => {
  const payload = await getPayload({ config })
  const searchTerm = query.trim()

  if (!searchTerm) return []

  try {
    const blogs = await payload.find({
      collection: 'blogs',
      where: {
        and: [
          {
            published: {
              equals: true,
            },
          },
          {
            or: [
              {
                title: {
                  contains: searchTerm,
                },
              },
              {
                excerpt: {
                  contains: searchTerm,
                },
              },
            ],
          },
        ],
      },
      sort: '-createdAt',
      locale: locale as any,
    })
    return blogs.docs as Blog[]
  } catch (error) {
    console.error('Error fetching blogs by search query:', error)
    throw error
  }
}
