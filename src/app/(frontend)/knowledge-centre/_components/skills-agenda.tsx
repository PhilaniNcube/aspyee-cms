import React from 'react'

const SkillsAgenda = () => {
  return (
    <div className="bg-brand text-white py-16 md:py-24">
      <div className="max-w-[1440px] mx-auto container">
        <h2 className="text-3xl lg:text-5xl text-center font-semibold ">
          Contribute to Africa&apos;s Skills Agenda
        </h2>
        <div className="flex justify-center my-6">
          <div className="w-44 h-2 bg-brand-orange" />
        </div>
        <h3 className="text-center text-lg md:text-xl max-w-3xl mx-auto">
          Your Experience can inspire change.
        </h3>
        <div className="flex justify-center">
          <p className="text-center text-sm lg:text-base max-w-3xl  mx-auto mt-4 md:mt-6">
            ASPYEE grows through the knowledge shared directly from the field. Whether it&apos;s a
            project case study, a new tool, or lessons learned, your contribution helps others
            across the continent learn what works.
          </p>
        </div>
        <div className="flex justify-center mt-8 md:mt-12">
          <button className="bg-brand-orange text-xl rounded-full text-white py-2 px-4">
            Submit Your Contribution
          </button>
        </div>
      </div>
    </div>
  )
}

export default SkillsAgenda
