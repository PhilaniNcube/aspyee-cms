import React from 'react'

interface TargetGroupTitleSectionProps {
  mainTitle: string
  subtitle: string
  accentColor?: string
}

const TargetGroupTitleSection: React.FC<TargetGroupTitleSectionProps> = ({
  mainTitle,
  subtitle,
  accentColor = 'bg-brand-orange',
}) => {
  return (
    <section className="bg-white py-16">
      <div className="container mx-auto max-w-[1440px] px-6 md:px-8 px-4">
        <div className="max-w-4xl items-stretch flex ">
          {/* Orange accent bar */}
          <div className={`w-[10px] h-20 lg:h-[110px] ${accentColor} mr-4`}></div>

          <div>
            <h2 className="text-[20px] md:text-[24px] leading-7 my-0 lg:text-[33px] font-bold text-brand">
              {mainTitle}
            </h2>
            {/* Subtitle */}
            <p
              className="text-xl font-medium md:text-2xl text-brand mt-0"
              style={{ marginTop: '10px' }}
            >
              {subtitle}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TargetGroupTitleSection
