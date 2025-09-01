import React from 'react'
import TargetGroupHero from '@/components/ui/target-group-hero'
import TargetGroupTitleSection from '@/components/ui/target-group-title-section'
import ResourceList from '../policymakers/_components/resource-list'
import NewsEvents from '../policymakers/_components/news-and-events'
import { getResourcesForPrivateSector } from '@/lib/queries'

const PrivateSectorCorner = async () => {
  const resources = await getResourcesForPrivateSector()

  return (
    <div className="">
      <TargetGroupHero
        title="Private Sector / Employers Corner"
        description="Enabling private sector engagement in skills development through partnerships, investment opportunities and workforce development strategies."
      />
      <TargetGroupTitleSection
        mainTitle="PRIVATE SECTOR PARTNERSHIPS DRIVE SUSTAINABLE SKILLS ECOSYSTEMS."
        subtitle="Explore opportunities to invest in talent development and create meaningful employment pathways."
      />
      <ResourceList initialResources={resources} title="Resources for Private Sector / Employers" />
      <NewsEvents />
    </div>
  )
}

export default PrivateSectorCorner
