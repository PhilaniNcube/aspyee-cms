import TargetGroupHero from '@/components/ui/target-group-hero'
import TargetGroupTitleSection from '@/components/ui/target-group-title-section'
import { getResourcesForPolicymakersWithPagination } from '@/lib/queries/resources'
import ResourceList from './_components/resource-list'
import Testimonials from '../_components/testimonials'
import NewsEvents from './_components/news-and-events'

interface PolicymakersPageProps {
  searchParams: Promise<{
    page?: string
    limit?: string
    search?: string
    yearPublished?: string | string[]
    country?: string | string[]
    resourceType?: string | string[]
    targetGroup?: string | string[]
    theme?: string | string[]
    language?: string | string[]
  }>
}

const PolicymakersPage = async ({ searchParams }: PolicymakersPageProps) => {
  const params = await searchParams

  const page = parseInt(params.page || '1', 10)
  const limit = parseInt(params.limit || '8', 10)

  // Convert search params to filters
  const filters = {
    search: params.search,
    yearPublished: Array.isArray(params.yearPublished)
      ? params.yearPublished.map(Number).filter(Boolean)
      : params.yearPublished
        ? [Number(params.yearPublished)].filter(Boolean)
        : undefined,
    country: Array.isArray(params.country)
      ? params.country
      : params.country
        ? [params.country]
        : undefined,
    type: Array.isArray(params.resourceType)
      ? params.resourceType
      : params.resourceType
        ? [params.resourceType]
        : undefined,
    theme: Array.isArray(params.theme) ? params.theme : params.theme ? [params.theme] : undefined,
    language: Array.isArray(params.language)
      ? params.language
      : params.language
        ? [params.language]
        : undefined,
  }

  const resources = await getResourcesForPolicymakersWithPagination({
    page: 1,
    limit: 1000, // Get all resources for client-side filtering
  })

  return (
    <div className="">
      <TargetGroupHero
        title="Policy Makers"
        description="A collection of reports, case studies, frameworks and articles designed to support policymakers in shaping skills and employment."
        backgroundImage="https://4kav3digtb.ufs.sh/f/FBDFb9YX4geOKXc2i2gCALFeP1D0qJGINsyX96z4n38uOmRr"
        bgColor="bg-brand"
      />
      <TargetGroupTitleSection
        mainTitle="80% OF AFRICAN COUNTRIES ARE REFORMING TVET AND SKILLS SYSTEMS."
        subtitle="Use this momentum to drive coordinated, evidence-based change."
      />
      <ResourceList
        initialResources={resources.docs}
        title="Resources for Policymakers"
        targetGroup="Policymakers"
      />
      <NewsEvents />
      {/* <Testimonials /> */}
    </div>
  )
}

export default PolicymakersPage
