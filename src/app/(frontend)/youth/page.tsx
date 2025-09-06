import React from 'react'
import TargetGroupHero from '@/components/ui/target-group-hero'
import TargetGroupTitleSection from '@/components/ui/target-group-title-section'
import ResourceList from '../policymakers/_components/resource-list'
import NewsEvents from '../policymakers/_components/news-and-events'
import { getResourcesForYouthWithPagination } from '@/lib/queries'

interface YouthPageProps {
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

const YouthCorner = async ({ searchParams }: YouthPageProps) => {
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

  const resources = await getResourcesForYouthWithPagination({
    page: 1,
    limit: 1000, // Get all resources for client-side filtering
  })

  return (
    <div className="">
      <TargetGroupHero
        title="Youth Corner"
        description="Empowering young people with resources, opportunities and insights to build the skills needed for Africa's future economy and workforce transformation."
        backgroundImage="https://4kav3digtb.ufs.sh/f/FBDFb9YX4geOKQT11qgCALFeP1D0qJGINsyX96z4n38uOmRr"
        bgColor="bg-[#9FB23F]"
      />
      <TargetGroupTitleSection
        mainTitle="YOUTH ARE THE DRIVING FORCE OF AFRICA'S SKILLS TRANSFORMATION."
        subtitle="Access resources that help you build the skills, networks and opportunities needed for tomorrow's economy."
      />
      <ResourceList
        initialResources={resources.docs}
        title="Resources for Youth"
        targetGroup="Youth"
      />
      <NewsEvents />
    </div>
  )
}

export default YouthCorner
