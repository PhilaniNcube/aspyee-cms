import React from 'react'
import TargetGroupHero from '@/components/ui/target-group-hero'
import TargetGroupTitleSection from '@/components/ui/target-group-title-section'
import ResourceList from '../policymakers/_components/resource-list'
import NewsEvents from '../policymakers/_components/news-and-events'
import { getResourcesForYouth } from '@/lib/queries'

const YouthCorner = async () => {
  const resources = await getResourcesForYouth()

  return (
    <div className="">
      <TargetGroupHero
        title="Youth Corner"
        description="Empowering young people with resources, opportunities and insights to build the skills needed for Africa's future economy and workforce transformation."
      />
      <TargetGroupTitleSection
        mainTitle="YOUTH ARE THE DRIVING FORCE OF AFRICA'S SKILLS TRANSFORMATION."
        subtitle="Access resources that help you build the skills, networks and opportunities needed for tomorrow's economy."
      />
      <ResourceList initialResources={resources} title="Resources for Youth" />
      <NewsEvents />
    </div>
  )
}

export default YouthCorner
