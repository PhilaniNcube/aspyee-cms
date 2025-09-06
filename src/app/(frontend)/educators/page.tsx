import React from 'react'
import TargetGroupHero from '@/components/ui/target-group-hero'
import TargetGroupTitleSection from '@/components/ui/target-group-title-section'
import ResourceList from '../policymakers/_components/resource-list'
import NewsEvents from '../policymakers/_components/news-and-events'
import { getResourcesForEducatorsWithPagination } from '@/lib/queries'

interface EducatorsPageProps {
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

const EducatorsCorner = async ({ searchParams }: EducatorsPageProps) => {
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

  const resources = await getResourcesForEducatorsWithPagination({
    page: 1,
    limit: 1000, // Get all resources for client-side filtering
  })

  return (
    <div className="">
      <TargetGroupHero
        title="Educators & Implementers Corner"
        description="Supporting educators, trainers and implementers with practical resources, best practices and innovative approaches to skills development and TVET delivery."
        backgroundImage="https://4kav3digtb.ufs.sh/f/FBDFb9YX4geO2PRx2rzOM7sxtk6jHilDYeuQU9LayhdfS3wX"
        bgColor="bg-brand-orange"
      />
      <TargetGroupTitleSection
        mainTitle="QUALITY EDUCATION AND TRAINING TRANSFORMS COMMUNITIES."
        subtitle="Discover tools, methodologies and insights to enhance your teaching and implementation practices."
      />
      <ResourceList
        initialResources={resources.docs}
        title="Resources for Educators & Implementers"
        targetGroup="Educators & Implementers"
      />
      <NewsEvents />
    </div>
  )
}

export default EducatorsCorner
