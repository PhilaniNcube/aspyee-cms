import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'

const CuratedResources = () => {
  return (
    <div className="py-28">
      <div className="max-w-[1440px] container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 ">
          <div>
            <h2 className="text-3xl lg:text-5xl text-brand font-semibold pl-2 mb-8 border-l-8 border-brand-orange">
              Curated Resources
            </h2>
            <h4 className="font-medium text-lg">
              Explore Africa’s skills transformation in one place.
            </h4>
            <p>
              From qualifications frameworks to workforce innovations, discover carefully curated
              resources designed to help policymakers, educators, and practitioners move from ideas
              to action.
            </p>
            <ul className="list-disc list-inside mt-4">
              <li>Stay ahead of trends.</li>
              <li>Learn from African-owned approaches.</li>
              <li>Equip yourself with the tools to transform skills systems.</li>
            </ul>
            <Button className="bg-brand-orange hover:bg-brand-orange/80 text-white px-12 text-lg rounded-full py-7 mt-24">
              Sign Up to Access Resources
            </Button>
          </div>
          <div className="w-full relative">
            <div className="absolute inset-0 flex items-end justify-center">
              <div className="w-4/5 h-4/5 relative bg-brand-orange rounded-lg overflow-visible">
                <Image
                  src="/images/portrait.png"
                  width={2000}
                  height={4000}
                  alt="Curated Resources"
                  className="absolute bottom-0 left-0 right-0 h-auto w-full object-cover object-top rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CuratedResources
