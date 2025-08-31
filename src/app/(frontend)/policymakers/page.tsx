import React from 'react'
import PolicymakersHero from './_components/policymakers-hero'
import { getResourcesForPolicymakers } from '@/lib/queries/resources'
import TitleSection from './_components/title-section'
import ResourceList from './_components/resource-list'
import Testimonials from '../_components/testimonials'

const PolicymakersPage = async () => {
  const resources = await getResourcesForPolicymakers()

  return (
    <div className="">
      <PolicymakersHero />
      <TitleSection />
      <ResourceList initialResources={resources} />
      <Testimonials />
    </div>
  )
}

export default PolicymakersPage
