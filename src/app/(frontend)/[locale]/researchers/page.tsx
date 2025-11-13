import React from 'react'
import TargetGroupHero from '@/components/ui/target-group-hero'
import TargetGroupTitleSection from '@/components/ui/target-group-title-section'
import ResourceList from '../policymakers/_components/resource-list'
import NewsEvents from '../policymakers/_components/news-and-events'

const ResearchersCorner = async () => {
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
      <ResourceList title="Resources for Researchers" targetGroup="Researchers" />
      <NewsEvents />
      {/* <Testimonials /> */}
    </div>
  )
}

export default ResearchersCorner
