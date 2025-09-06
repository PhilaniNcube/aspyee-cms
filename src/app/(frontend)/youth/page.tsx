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
        backgroundImage="https://4kav3digtb.ufs.sh/f/FBDFb9YX4geOKQT11qgCALFeP1D0qJGINsyX96z4n38uOmRr"
        bgColor="bg-[#9FB23F]"
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
