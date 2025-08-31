import { Resource } from '@/payload-types'
import { getPayload } from 'payload'
import config from '@payload-config'

/**
 * Fetches resources that have "Policymakers" in their target_groups
 */
export async function getResourcesForPolicymakers(): Promise<Resource[]> {
  try {
    const payload = await getPayload({ config })

    const result = await payload.find({
      collection: 'resources',
      where: {
        target_groups: {
          contains: 'Policymakers',
        },
      },
    })

    return result.docs as Resource[]
  } catch (error) {
    console.error('Error fetching policymaker resources:', error)
    return []
  }
}

/**
 * Fetches resources by target group
 */
export async function getResourcesByTargetGroup(targetGroup: string): Promise<Resource[]> {
  try {
    const payload = await getPayload({ config })

    const result = await payload.find({
      collection: 'resources',
      where: {
        target_groups: {
          contains: targetGroup,
        },
      },
    })

    return result.docs as Resource[]
  } catch (error) {
    console.error(`Error fetching resources for target group ${targetGroup}:`, error)
    return []
  }
}

/**
 * Fetches all resources with optional filters
 */
export async function getAllResources(
  options: {
    type?: string
    theme?: string
    language?: string
    country?: string
    goodPractice?: 'yes' | 'no'
    limit?: number
  } = {},
): Promise<Resource[]> {
  try {
    const payload = await getPayload({ config })

    // Build the where clause dynamically
    const where: any = {}

    if (options.type) {
      where.type = { equals: options.type }
    }
    if (options.theme) {
      where.themes = { contains: options.theme }
    }
    if (options.language) {
      where.language = { equals: options.language }
    }
    if (options.country) {
      where.countries = { contains: options.country }
    }
    if (options.goodPractice) {
      where.good_practice = { equals: options.goodPractice }
    }

    const result = await payload.find({
      collection: 'resources',
      where,
      limit: options.limit || 50, // Default limit if not specified
    })

    return result.docs as Resource[]
  } catch (error) {
    console.error('Error fetching resources:', error)
    return []
  }
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
