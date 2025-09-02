import Image from 'next/image'
import React from 'react'

const Hero = () => {
  return (
    <div className="min-h-[564px] relative overflow-hidden">
      {/* Background Image */}
      <Image
        src="https://4kav3digtb.ufs.sh/f/FBDFb9YX4geOCWACmTjj5LdxWmT7rvE2bnZNA69cODKaozRI"
        alt="Policymakers Background"
        layout="fill"
        objectFit="cover"
        className="absolute inset-0 -z-10 pointer-events-none"
      />
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/60 pointer-events-none"></div>
      <div className="relative z-10 lg:h-[600px] flex justify-center items-center">
        <div className="container flex items-end h-full  mx-auto max-w-[1440px] px-6 md:px-8 ">
          <div className="bg-[#9FB23FCC] lg:w-[550px] p-0 lg:h-[250px]">
            <h1 className="text-3xl md:text-2xl lg:text-3xl font-extrabold text-white p-4 ">
              The Knowledge Centre
            </h1>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
