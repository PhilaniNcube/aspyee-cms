import { Youtube } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const HowToPortal = () => {
  return (
    <div className="bg-brand shadow-lg">
      <div className="max-w-[1440px] px-6 md:px-10 lg:px-16 mx-auto container py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="text-white">
            <div className="text-3xl lg:text-5xl font-semibold border-l-8 pl-4 py-1 border-brand-orange">
              <h2>
                How to use this <br />
                portal
              </h2>
            </div>
            <p className="text-lg font-semibold">Your guide to getting the most out of ASPYEE.</p>
            <p>Watch this short walkthrough to see how you can:</p>
            <ul className="list-disc list-inside mt-4">
              <li>Find the latest tools, case studies, and insights</li>
              <li>Explore initiatives shaping the future of work in Africa</li>
              <li>Connect with peers and partners across the continent</li>
            </ul>
          </div>
          <div className="w-full h-64 lg:h-auto flex items-center justify-center bg-white rounded-xl aspect-video overflow-hidden">
            <Image src="/images/icon/logos_youtube-icon.svg" alt="Youtube" width={96} height={68} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default HowToPortal
