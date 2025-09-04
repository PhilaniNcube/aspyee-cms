import { Card } from '@/components/ui/card'
import { Bookmark, Download, FileText, Globe2 } from 'lucide-react'
import React from 'react'

const KnowledgeBase = () => {
  const statsCards = [
    {
      id: 1,
      icon: FileText,
      number: '5,000+',
      label: 'Resources',
    },
    {
      id: 2,
      icon: Globe2,
      number: '54',
      label: 'Countries',
    },
    {
      id: 3,
      icon: Bookmark,
      number: '2,500+',
      label: 'Contributors',
    },
    {
      id: 4,
      icon: Download,
      number: '50K+',
      label: 'Downloads',
    },
  ]

  return (
    <div className="bg-[#EFEFEF] py-16 mt-8">
      <div className="max-w-[1440px] px-6 md:px-10 lg:px-16 container mx-auto">
        <h2 className="text-3xl lg:text-5xl text-[#595959] font-semibold pl-2 mb-8 border-l-8 border-brand-orange">
          Knowledge Base
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statsCards.map((stat) => {
            const IconComponent = stat.icon
            return (
              <Card
                key={stat.id}
                className="bg-[#00B6CC1A] aspect-square p-10 text-center hover:shadow-md transition-shadow duration-200"
              >
                <div className="flex flex-col justify-center h-full items-start  space-y-3">
                  <IconComponent className="w-8 h-8 text-brand" />
                  <div
                    className="text-3xl md:text-6xl font-bold text-brand"
                    style={{ marginBottom: '0.3rem' }}
                  >
                    {stat.number}
                  </div>
                  <div className="text-base text-brand font-semibold">{stat.label}</div>
                </div>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default KnowledgeBase
