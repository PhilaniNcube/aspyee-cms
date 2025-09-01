import React from 'react'
import TargetGroupHero from '@/components/ui/target-group-hero'
import TargetGroupTitleSection from '@/components/ui/target-group-title-section'
import ResourceList from '../policymakers/_components/resource-list'
import NewsEvents from '../policymakers/_components/news-and-events'
import { getResourcesForResearchers } from '@/lib/queries'

const ResearchersCorner = async () => {
  const resources = await getResourcesForResearchers()

  return (
    <div className="">
      <TargetGroupHero
        title="Researchers"
        description="A collection of academic papers, research reports, case studies and analytical frameworks designed to support researchers in advancing skills development knowledge."
      />
      <TargetGroupTitleSection
        mainTitle="EVIDENCE-BASED RESEARCH DRIVES INNOVATION IN SKILLS DEVELOPMENT."
        subtitle="Access the latest research and contribute to the knowledge base that shapes Africa's skills transformation."
      />
      <ResourceList initialResources={resources} title="Resources for Researchers" />
      <NewsEvents />
      {/* <Testimonials /> */}
    </div>
  )
}

export default ResearchersCorner
