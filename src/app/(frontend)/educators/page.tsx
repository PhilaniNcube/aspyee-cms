import React from 'react'
import TargetGroupHero from '@/components/ui/target-group-hero'
import TargetGroupTitleSection from '@/components/ui/target-group-title-section'
import ResourceList from '../policymakers/_components/resource-list'
import NewsEvents from '../policymakers/_components/news-and-events'
import { getResourcesForEducators } from '@/lib/queries'

const EducatorsCorner = async () => {
  const resources = await getResourcesForEducators()

  return (
    <div className="">
      <TargetGroupHero
        title="Educators & Implementers Corner"
        description="Supporting educators, trainers and implementers with practical resources, best practices and innovative approaches to skills development and TVET delivery."
      />
      <TargetGroupTitleSection
        mainTitle="QUALITY EDUCATION AND TRAINING TRANSFORMS COMMUNITIES."
        subtitle="Discover tools, methodologies and insights to enhance your teaching and implementation practices."
      />
      <ResourceList initialResources={resources} title="Resources for Educators & Implementers" />
      <NewsEvents />
    </div>
  )
}

export default EducatorsCorner
