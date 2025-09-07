import { Badge } from '@/components/ui/badge'
import { title } from 'process'
import React from 'react'

const cards = [
  {
    title: 'For Policy Makers',
    image: '/images/policy.png',
  },
  {
    title: 'For Educators & Implementors',
    image: '/images/educators.png',
  },
  {
    title: 'For Researchers',
    image: '/images/researchers.png',
  },
  {
    title: 'For Youth',
    image: '/images/youth.png',
  },
]

const TopReads = () => {
  return (
    <div>
      <div className="max-w-[1520px] px-6 md:px-10 lg:px-16 mx-auto container py-24">
        <div className="border-l-8 pl-4 pb-1.5 pt-0 mt-0 border-brand-orange mb-10">
          <h2 className="text-3xl lg:text-5xl font-semibold text-[#595959]">Top Reads</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 ">
          {cards.map((card, index) => (
            <div key={index} className=" rounded-lg relative group">
              <img
                src={card.image}
                alt={card.title}
                className="w-full h-full object-cover rounded-md "
              />
              <div className="z-10 absolute inset-0 bg-black/30 p-6 overflow-hidden rounded-lg  transition-opacity duration-300 flex flex-col justify-end">
                <h3 className="text-lg font-semibold text-white relative group-hover:-translate-y-10 transition-transform duration-300">
                  {card.title}
                </h3>
                <Badge className="bg-brand-orange text-white rounded-full hover:bg-brand-orange-60 px-3 translate-y-16 group-hover:translate-0 transition-transform duration-300 absolute ">
                  Learn More
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default TopReads
