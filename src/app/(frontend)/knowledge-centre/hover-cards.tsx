import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Settings, Megaphone, Search, Users, Briefcase } from 'lucide-react'

export default function HoverCards() {
  const cards = [
    {
      id: 1,
      title: 'For policy makers',
      description: 'Shape evidence-based reforms',
      color: 'bg-[#00B6CC]',
      hoverColor: 'hover:bg-[#00B6CC]',
      icon: Megaphone,
      profileImage: '/images/blue.png',
    },
    {
      id: 2,
      title: 'For educators & implementers',
      description: 'Strengthen programmes and curricula',
      color: 'bg-brand-orange',
      hoverColor: 'bg-brand-orange',
      icon: Settings,
      profileImage: '/images/orange.png',
    },
    {
      id: 3,
      title: 'For researchers',
      description: 'Access data frameworks and comparative analysis',
      color: 'bg-black/20',
      hoverColor: 'hover:bg-black/20',
      icon: Search,
      profileImage: '/images/grey.png',
    },
    {
      id: 4,
      title: 'For youth',
      description: 'Find opportunities, stories and pathways into the field',
      color: 'bg-[#9FB23F]',
      hoverColor: 'hover:bg-[#9FB23F]',
      icon: Users,
      profileImage: '/images/green.png',
    },
    {
      id: 5,
      title: 'Employers & The Private Sector',
      description: 'Drive innovation, partnerships and future ready talent',
      color: 'bg-[#CBA95F]',
      hoverColor: 'hover:bg-[#CBA95F]',
      icon: Briefcase,
      profileImage: '/images/brown.png',
    },
  ]

  return (
    <div className=" pt-4 pb-8">
      <div className="max-w-[1440px] px-6 md:px-8 container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {cards.map((card) => {
            const IconComponent = card.icon
            return (
              <Card
                key={card.id}
                className={`
                  relative overflow-hidden cursor-pointer transition-all duration-500 ease-in-out
                  ${card.color} ${card.hoverColor} text-white
                  group border-2 
                  h-48 hover:h-80
                `}
              >
                {/* Card content */}
                <div className="pt-10 p-4 h-full flex flex-col">
                  {/* Image/Icon container */}
                  <div className="flex-1 flex flex-col items-center justify-start">
                    {/* Profile image (default state) */}
                    <div className="group-hover:opacity-0 group-hover:scale-75 transition-all duration-300 ease-in-out">
                      <div className="w-16 h-16 rounded-full bg-white p-1">
                        <img
                          src={card.profileImage || '/placeholder.svg'}
                          alt="Profile"
                          className="w-full h-full rounded-full object-cover"
                        />
                      </div>
                    </div>

                    {/* Icon (hover state) */}
                    <div className="absolute inset-0 flex items-start justify-center pt-14 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out">
                      <IconComponent className="w-12 h-12" />
                    </div>

                    {/* Title */}
                    <h3 className="text-sm text-center leading-tight mb-2 transition-all duration-300 ease-in-out group-hover:font-semibold">
                      {card.title}
                    </h3>

                    {/* Subtitle and button that appear on hover */}
                    <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out delay-150 text-center">
                      <p className="text-xs leading-relaxed mb-4 px-2">{card.description}</p>
                      <Button
                        variant="secondary"
                        size="sm"
                        className="bg-white/20 hover:bg-white/30 text-white border-white/30 text-xs"
                      >
                        View All
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>

        <Button className="bg-brand-orange hover:bg-brand-orange/80 text-white px-12 text-lg rounded-full py-6 mt-24">
          Explore All Resources
        </Button>
      </div>
    </div>
  )
}
