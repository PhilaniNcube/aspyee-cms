import Image from 'next/image'
import React from 'react'

const PolicymakersHero = () => {
  return (
    <div className="min-h-[564px] relative overflow-hidden">
      {/* Background Image */}
      <Image
        src="https://4kav3digtb.ufs.sh/f/FBDFb9YX4geO2vwcZQrzOM7sxtk6jHilDYeuQU9LayhdfS3w"
        alt="Policymakers Background"
        layout="fill"
        objectFit="cover"
        className="absolute inset-0 -z-10 pointer-events-none"
      />
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/60 pointer-events-none"></div>
      <div className="relative z-10 h-[564px] flex justify-center items-center p-4">
        <div className="container mx-auto max-w-[1440px] px-6 md:px-8 ">
          <h1 className="text-5xl font-extrabold text-white">Policy Makers</h1>
          <p className="mt-2 text-[28px] leading-8 text-white max-w-[721px]">
            A collection of reports, case studies, frameworks and articles designed to support
            policymakers in shaping skills and employment.
          </p>
        </div>
      </div>
    </div>
  )
}

export default PolicymakersHero
