import { Suspense } from 'react'
import {
  getResourcesForPolicymakersWithPagination,
  getResourcesForResearchersWithPagination,
  getResourcesForYouthWithPagination,
  getResourcesForEducatorsWithPagination,
  getResourcesForPrivateSectorWithPagination,
} from '@/lib/queries/resources'
import ResourceListClient from './resource-list-client'

interface ResourceListServerProps {
  title?: string
  targetGroup:
    | 'Policymakers'
    | 'Researchers'
    | 'Youth'
    | 'Educators & Implementers'
    | 'Private Sector / Employers'
}

/**
 * Server Component that fetches resources based on target group
 *
 * CACHE COMPONENTS READY:
 * To enable caching with Next.js 16 Cache Components, add "use cache" directive at the top
 * of this function after enabling experimental.cacheComponents in next.config.js
 *
 * Example:
 * "use cache"
 * async function ResourceListServer({ title = 'Resources', targetGroup }: ResourceListServerProps) {
 *   // ... rest of the code
 * }
 */
async function ResourceListServer({ title = 'Resources', targetGroup }: ResourceListServerProps) {
  // Select the appropriate query function based on target group
  let queryFunction
  switch (targetGroup) {
    case 'Policymakers':
      queryFunction = getResourcesForPolicymakersWithPagination
      break
    case 'Researchers':
      queryFunction = getResourcesForResearchersWithPagination
      break
    case 'Youth':
      queryFunction = getResourcesForYouthWithPagination
      break
    case 'Educators & Implementers':
      queryFunction = getResourcesForEducatorsWithPagination
      break
    case 'Private Sector / Employers':
      queryFunction = getResourcesForPrivateSectorWithPagination
      break
    default:
      queryFunction = getResourcesForPolicymakersWithPagination
  }

  // Fetch all resources for client-side filtering
  // This data fetch can be cached with Cache Components
  const resources = await queryFunction({
    page: 1,
    limit: 1000, // Get all resources for client-side filtering
  })

  return (
    <ResourceListClient initialResources={resources.docs} title={title} targetGroup={targetGroup} />
  )
}

/**
 * Exported component with Suspense boundary
 * Use this in your pages
 */
export default function ResourceList(props: ResourceListServerProps) {
  return (
    <Suspense
      fallback={
        <div className="!shadow-xl">
          <div className="flex container max-w-[1520px] px-6 md:px-10 lg:px-16 mx-auto py-8 flex-col lg:flex-row gap-8">
            <div className="lg:w-1/4">
              <div className="animate-pulse">
                <div className="h-8 bg-gray-200 rounded mb-4 w-32" />
                <div className="space-y-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="space-y-2">
                      <div className="h-6 bg-gray-200 rounded w-24" />
                      <div className="h-10 bg-gray-200 rounded" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="lg:w-3/4">
              <div className="animate-pulse">
                <div className="h-8 bg-gray-200 rounded mb-6 w-48" />
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="bg-gray-200 rounded-lg h-64" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    >
      <ResourceListServer {...props} />
    </Suspense>
  )
}
