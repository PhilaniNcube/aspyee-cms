import React from 'react'

const TitleSection = () => {
  return (
    <section className="bg-white py-16">
      <div className="container mx-auto max-w-[1520px] px-6 md:px-10 lg:px-16">
        <div className="max-w-4xl items-stretch flex ">
          {/* Orange accent bar */}
          <div className="w-[10px] h-20 lg:h-[110px] bg-brand-orange mr-4"></div>

          <div>
            <h2 className="text-[20px] md:text-[24px] leading-7 my-0 lg:text-[33px] font-bold text-brand">
              80% OF AFRICAN COUNTRIES ARE REFORMING{' '}
              <span className="block">TVET AND SKILLS SYSTEMS.</span>
            </h2>
            {/* Subtitle */}
            <p
              className="text-xl font-medium md:text-2xl text-brand mt-0"
              style={{ marginTop: '10px' }}
            >
              Use this momentum to drive coordinated, evidence-based change.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TitleSection
