import { Media } from '@/payload-types'
import Image from 'next/image'
import React from 'react'

const NewsAndEventsHero = () => {
  return (
    <div className="min-h-[400px] lg:min-h-[644px] relative overflow-hidden">
      {/* Background Image */}
      <Image
        src="https://ernn9x55red.exactdn.com/wp-content/uploads/2025/09/News-1-1024x525.jpg?strip=all"
        alt="Policymakers Background"
        width={4096}
        height={2725}
        className="absolute inset-0 -z-10 pointer-events-none object-left object-cover w-full h-full"
      />
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-linear-to-b from-black/30 to-black/60 pointer-events-none"></div>
      <div className="relative z-10 h-[400px] lg:h-[644px] flex justify-center items-center ">
        <div className="container flex items-end h-full relative">
          <div className="w-full lg:w-[550px] flex items-center lg:items-start p-4 lg:p-0 h-auto lg:h-[200px] bg-brand-green/70 absolute bottom-0 left-0 lg:left-[50px]">
            <h1 className="font-extrabold text-white px-4 text-2xl! md:text-3xl! lg:text-[2.2em]! leading-[1.1]! mb-0">
              News &amp; Events
            </h1>
            {/* <p className="text-white px-4" style={{ marginTop: 0 }}>
              Empowering Africa's Youth through knowledge sharing and skills development
            </p> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewsAndEventsHero
