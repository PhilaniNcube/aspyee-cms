import { Media } from '@/payload-types'
import Image from 'next/image'
import React from 'react'

const NewsAndEventsHero = () => {
  return (
    <div className="min-h-[644px] relative overflow-hidden">
      {/* Background Image */}
      <Image
        src="https://4kav3digtb.ufs.sh/f/FBDFb9YX4geOLq7jpsyfE8sWmyqn61lUQSjHgVRhpBL3bGew"
        alt="Policymakers Background"
        width={4096}
        height={2725}
        className="absolute inset-0 -z-10 pointer-events-none rotate-y-180 object-left object-cover w-full h-full"
      />
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/60 pointer-events-none"></div>
      <div className="relative z-10 lg:h-[644px] flex justify-center items-center ">
        <div className="container flex items-end h-full  mx-auto max-w-[1520px] w-[80%]   relative">
          <div className="lg:w-[550px] flex items-center p-0 lg:h-[250px] bg-brand-green/70 absolute bottom-0 left-[50px]">
            <h1
              className="text-2xl font-extrabold text-white px-4 "
              style={{ lineHeight: '1.2', marginBottom: 0 }}
            >
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
