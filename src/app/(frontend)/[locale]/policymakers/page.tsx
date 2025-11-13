import TargetGroupHero from '@/components/ui/target-group-hero'
import TargetGroupTitleSection from '@/components/ui/target-group-title-section'
import ResourceList from './_components/resource-list'
import NewsEvents from './_components/news-and-events'

const PolicymakersPage = async () => {
  return (
    <div className="">
      <TargetGroupHero
        title="Policymakers Corner"
        description="A collection of reports, case studies, frameworks and articles designed to support policymakers in shaping skills and employment."
        backgroundImage="https://4kav3digtb.ufs.sh/f/FBDFb9YX4geOKXc2i2gCALFeP1D0qJGINsyX96z4n38uOmRr"
        bgColor="bg-brand"
      />
      <TargetGroupTitleSection
        mainTitle="80% OF AFRICAN COUNTRIES ARE REFORMING TVET AND SKILLS SYSTEMS."
        subtitle="Use this momentum to drive coordinated, evidence-based change."
      />
      <ResourceList title="Resources for Policymakers" targetGroup="Policymakers" />
      <NewsEvents />
      {/* <Testimonials /> */}
    </div>
  )
}

export default PolicymakersPage
