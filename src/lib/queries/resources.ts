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
