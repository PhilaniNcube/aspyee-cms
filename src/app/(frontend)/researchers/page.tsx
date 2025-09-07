import React from 'react'
import TargetGroupHero from '@/components/ui/target-group-hero'
import TargetGroupTitleSection from '@/components/ui/target-group-title-section'
import ResourceList from '../policymakers/_components/resource-list'
import NewsEvents from '../policymakers/_components/news-and-events'
import { getResourcesForResearchersWithPagination } from '@/lib/queries'

interface ResearchersPageProps {
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

const ResearchersCorner = async ({ searchParams }: ResearchersPageProps) => {
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

  const resources = await getResourcesForResearchersWithPagination({
    page: 1,
    limit: 1000, // Get all resources for client-side filtering
  })

  return (
    <div className="">
      <TargetGroupHero
        title="Researchers Corner"
        description="A collection of academic papers, research reports, case studies and analytical frameworks designed to support researchers in advancing skills development knowledge."
        backgroundImage="https://4kav3digtb.ufs.sh/f/FBDFb9YX4geOAE8qVmcQsnyRDjEh4OY83wBUgpK1LGdkzVxm"
        bgColor="bg-[#00000073]"
      />
      <TargetGroupTitleSection
        mainTitle="EVIDENCE-BASED RESEARCH DRIVES INNOVATION IN SKILLS DEVELOPMENT."
        subtitle="Access the latest research and contribute to the knowledge base that shapes Africa's skills transformation."
      />
      <ResourceList
        initialResources={resources.docs}
        title="Resources for Researchers"
        targetGroup="Researchers "
      />
      <NewsEvents />
      {/* <Testimonials /> */}
    </div>
  )
}

export default ResearchersCorner
