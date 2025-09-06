import React from 'react'
import TargetGroupHero from '@/components/ui/target-group-hero'
import TargetGroupTitleSection from '@/components/ui/target-group-title-section'
import ResourceList from '../policymakers/_components/resource-list'
import NewsEvents from '../policymakers/_components/news-and-events'
import { getResourcesForPrivateSectorWithPagination } from '@/lib/queries'

interface PrivateSectorPageProps {
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

const PrivateSectorCorner = async ({ searchParams }: PrivateSectorPageProps) => {
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

  const resources = await getResourcesForPrivateSectorWithPagination({
    page: 1,
    limit: 1000, // Get all resources for client-side filtering
  })

  return (
    <div className="">
      <TargetGroupHero
        title="Private Sector / Employers Corner"
        description="Enabling private sector engagement in skills development through partnerships, investment opportunities and workforce development strategies."
        backgroundImage="https://4kav3digtb.ufs.sh/f/FBDFb9YX4geODxN6VBxbIGrKLd3XnBj2iNtZ71gzJvHo6uc4"
        bgColor="bg-[#CBA95F]"
      />
      <TargetGroupTitleSection
        mainTitle="PRIVATE SECTOR PARTNERSHIPS DRIVE SUSTAINABLE SKILLS ECOSYSTEMS."
        subtitle="Explore opportunities to invest in talent development and create meaningful employment pathways."
      />
      <ResourceList
        initialResources={resources.docs}
        title="Resources for Private Sector / Employers"
        targetGroup="Private Sector / Employers"
      />
      <NewsEvents />
    </div>
  )
}

export default PrivateSectorCorner
