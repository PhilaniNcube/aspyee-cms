import React from 'react'
import TargetGroupHero from '@/components/ui/target-group-hero'
import TargetGroupTitleSection from '@/components/ui/target-group-title-section'
import ResourceList from '../policymakers/_components/resource-list'
import NewsEvents from '../policymakers/_components/news-and-events'
import { getResourcesForEducatorsWithPagination } from '@/lib/queries'

const EducatorsCorner = async () => {
  const resources = await getResourcesForEducatorsWithPagination()

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
