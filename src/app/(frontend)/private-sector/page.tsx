import React from 'react'
import TargetGroupHero from '@/components/ui/target-group-hero'
import TargetGroupTitleSection from '@/components/ui/target-group-title-section'
import ResourceList from '../policymakers/_components/resource-list'
import NewsEvents from '../policymakers/_components/news-and-events'
import { getResourcesForPrivateSectorWithPagination } from '@/lib/queries'

const PrivateSectorCorner = async () => {
  const resources = await getResourcesForPrivateSectorWithPagination()

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
