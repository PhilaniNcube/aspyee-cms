import { Media } from '@/payload-types'
import Image from 'next/image'
import React from 'react'

const NewsAndEventsHero = ({
  title = 'News and Events',
  subtitle = 'Stay updated with the latest news and events',
  backgroundImage,
}: {
  title: string
  subtitle: string
  backgroundImage: Media | null
}) => {
  return (
    <div className="min-h-[644px] relative overflow-hidden">
      {/* Background Image */}
      <Image
        src={backgroundImage?.url || '/default-hero.jpg'}
        alt="Policymakers Background"
        width={backgroundImage?.width || 1920}
        height={backgroundImage?.height || 1080}
        className="absolute inset-0 -z-10 pointer-events-none rotate-y-180 object-left object-cover w-full h-full"
      />
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/60 pointer-events-none"></div>
      <div className="relative z-10 lg:h-[600px] flex justify-center items-center">
        <div className="container flex items-end h-full  mx-auto max-w-[1520px] px-6 md:px-10 lg:px-16 ">
          <div className="lg:w-[550px] p-0 lg:h-[250px]">
            <h1
              className="text-3xl md:text-2xl lg:text-3xl font-extrabold text-white px-4 "
              style={{ lineHeight: '1.2', marginBottom: 0 }}
            >
              {title}
            </h1>
            <p className="text-white px-4" style={{ marginTop: 0 }}>
              {subtitle}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewsAndEventsHero
