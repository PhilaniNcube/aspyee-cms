import 'server-only'
import { getPayload } from 'payload'
import config from '@payload-config'
import type { GoodPractice } from '@/payload-types'

// Fetch all published good practices
export const fetchPublishedGoodPractices = async (
  locale: string = 'en',
): Promise<GoodPractice[]> => {
  const payload = await getPayload({ config })
  try {
    const goodPractices = await payload.find({
      collection: 'good-practices',
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
      sort: '-publicationDate',
    })
    return goodPractices.docs as GoodPractice[]
  } catch (error) {
    console.error('Error fetching published good practices:', error)
    throw error
  }
}

// Fetch a single good practice by its slug
export const fetchGoodPracticeBySlug = async (
  slug: string,
  locale: string = 'en',
): Promise<GoodPractice | null> => {
  const payload = await getPayload({ config })
  try {
    const goodPractice = await payload.find({
      collection: 'good-practices',
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
    return goodPractice.docs[0] || null
  } catch (error) {
    console.error('Error fetching good practice by slug:', error)
    throw error
  }
}

// Fetch all good practices (including unpublished for admin purposes)
export const fetchAllGoodPractices = async (
  locale: string = 'en',
): Promise<GoodPractice[]> => {
  const payload = await getPayload({ config })
  try {
    const goodPractices = await payload.find({
      collection: 'good-practices',
      where: {
        title: {
          not_equals: undefined,
        },
      },
      locale: locale as any,
      limit: 1000,
      sort: '-publicationDate',
    })
    return goodPractices.docs as GoodPractice[]
  } catch (error) {
    console.error('Error fetching all good practices:', error)
    throw error
  }
}

// Fetch good practices by search query (searches title and content)
export const fetchGoodPracticesBySearchQuery = async (
  query: string,
  locale: string = 'en',
): Promise<GoodPractice[]> => {
  const payload = await getPayload({ config })
  const searchTerm = query.trim()

  if (!searchTerm) return []

  try {
    const goodPractices = await payload.find({
      collection: 'good-practices',
      where: {
        and: [
          {
            published: {
              equals: true,
            },
          },
          {
            title: {
              contains: searchTerm,
            },
          },
        ],
      },
      sort: '-publicationDate',
      locale: locale as any,
    })
    return goodPractices.docs as GoodPractice[]
  } catch (error) {
    console.error('Error fetching good practices by search query:', error)
    throw error
  }
}
