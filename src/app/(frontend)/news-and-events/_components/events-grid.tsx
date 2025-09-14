import { Media } from '@/payload-types'
import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'

type EventsGridProps = {
  eventsData: {
    sectionTitle: string
    fullWidthSection?:
      | {
          image?: number | Media | null | undefined
          title?: string | null
          description?: string | null
          link?: string | null
          badgeText?: string | null
        }
      | undefined
    newsItems?:
      | {
          title: string
          description: string
          image: number | Media
          link: string
          id?: string | null
        }[]
      | null
  }
}

const EventsGrid = ({ eventsData }: EventsGridProps) => {
  const { sectionTitle, fullWidthSection, newsItems } = eventsData

  // Helper function to get image URL
  const getImageUrl = (image: number | Media | null | undefined): string => {
    if (!image) return ''
    if (typeof image === 'object' && 'url' in image) {
      return image.url || ''
    }
    return ''
  }

  return (
    <section className="py-16 px-4 max-w-7xl mx-auto">
      {/* Section Title */}
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
        {sectionTitle}
      </h2>

      {/* Full Width Featured Section */}
      {fullWidthSection && (
        <div className="mb-12">
          <Card className="overflow-hidden p-0">
            <div className="relative h-64 md:h-80 lg:h-[74vh]">
              {fullWidthSection.image && (
                <Image
                  src={getImageUrl(fullWidthSection.image)}
                  alt={
                    typeof fullWidthSection.image === 'object' && fullWidthSection.image?.alt
                      ? fullWidthSection.image.alt
                      : fullWidthSection.title || ''
                  }
                  fill
                  className="object-cover object-centre"
                />
              )}
              {/* Overlay Content */}
              <div className="absolute inset-0 bg-black/40 flex items-end">
                <div className="p-6 md:p-8 text-white max-w-2xl">
                  {fullWidthSection.badgeText && (
                    <Badge
                      variant="secondary"
                      className="mb-3 text-md rounded-full px-6 bg-blue-100 text-blue-600 border-0"
                    >
                      {fullWidthSection.badgeText}
                    </Badge>
                  )}
                  <h3 className="text-2xl md:text-3xl font-bold mb-3">{fullWidthSection.title}</h3>
                  <p className="text-lg mb-4 opacity-90">{fullWidthSection.description}</p>
                  {fullWidthSection.link && (
                    <Button asChild className="bg-blue-500 hover:bg-blue-600 text-white">
                      <Link href={fullWidthSection.link}>Event Details</Link>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* News Items Grid */}
      {newsItems && newsItems.length > 0 && (
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:grid-rows-3 lg:max-h-[1050px]"
          style={{ gridTemplateRows: 'repeat(3, minmax(0, 370px))' }}
        >
          {/* Item 1 - Spans 2 columns, 1 row */}
          {newsItems[0] && (
            <Card className="@container overflow-hidden hover:shadow-lg transition-shadow duration-300 lg:col-span-2 lg:row-span-1 lg:col-start-1 lg:row-start-1 p-0 flex flex-col md:flex-row">
              <div className="flex flex-col @md:flex-row">
                <div className="relative h-full w-full @md:w-1/2 @lg:w-full">
                  <Image
                    src={getImageUrl(newsItems[0].image)}
                    alt={
                      typeof newsItems[0].image === 'object' && newsItems[0].image?.alt
                        ? newsItems[0].image.alt
                        : newsItems[0].title
                    }
                    fill
                    className="object-cover w-full h-full"
                  />
                </div>
                <CardContent className="p-6">
                  <h4 className="font-bold text-lg @md:text-2xl mb-3 text-gray-900 overflow-hidden">
                    <span className="block truncate">{newsItems[0].title}</span>
                  </h4>
                  <p className="text-gray-600 @md:text-xl font-medium text-sm mb-4 overflow-hidden">
                    {newsItems[0].description}
                  </p>
                  {newsItems[0].link && (
                    <Link
                      className="!text-brand-orange !hover:text-brand-orange-60 capitalize font-medium"
                      href={newsItems[0].link}
                    >
                      Read more
                    </Link>
                  )}
                </CardContent>
              </div>
            </Card>
          )}

          {/* Item 2 - Column 1, Row 2 */}
          {newsItems[1] && (
            <Card className="group gap-0 overflow-hidden hover:shadow-lg transition-shadow duration-300 lg:col-span-1 lg:row-span-1 lg:col-start-1 lg:row-start-2 p-0">
              <div className="relative w-full aspect-video min-h-36 h-36 max-h-48 overflow-hidden">
                <Image
                  src={getImageUrl(newsItems[1].image)}
                  alt={
                    typeof newsItems[1].image === 'object' && newsItems[1].image?.alt
                      ? newsItems[1].image.alt
                      : newsItems[1].title
                  }
                  width={
                    typeof newsItems[1].image === 'object' && newsItems[1].image?.width
                      ? newsItems[1].image.width
                      : 400
                  }
                  height={
                    typeof newsItems[1].image === 'object' && newsItems[1].image?.height
                      ? newsItems[1].image.height
                      : 300
                  }
                  className="object-cover w-full h-full"
                />
              </div>
              <CardContent className="group px-6 py-4 h-full text-center group-hover:bg-brand-orange !group-hover:text-white transition-colors duration-300">
                <h4 className="font-bold line-clamp-1 text-center text-md mb-2 group-hover:text-white overflow-hidden">
                  {newsItems[1].title}
                </h4>
                <p className="text-gray-600 text-xs line-clamp-2 overflow-hidden group-hover:text-white">
                  {newsItems[1].description}
                </p>
                {newsItems[1].link && (
                  <Link
                    className="text-brand-orange !group-hover:text-white group-hover:text-white capitalize font-medium"
                    href={newsItems[1].link}
                  >
                    <span className="text-brand-orange group-hover:text-white">Read more</span>
                  </Link>
                )}
              </CardContent>
            </Card>
          )}

          {/* Item 3 - Column 2, Row 2 */}
          {newsItems[2] && (
            <Card className="group overflow-hidden gap-0 hover:bg-brand-orange hover:shadow-lg transition-all duration-300 lg:col-span-1 lg:row-span-1 lg:col-start-2 lg:row-start-2 p-0">
              <div className="relative w-full aspect-video min-h-36 h-36 max-h-48 overflow-hidden">
                <Image
                  src={getImageUrl(newsItems[2].image)}
                  alt={
                    typeof newsItems[2].image === 'object' && newsItems[2].image?.alt
                      ? newsItems[2].image.alt
                      : newsItems[2].title
                  }
                  width={
                    typeof newsItems[2].image === 'object' && newsItems[2].image?.width
                      ? newsItems[2].image.width
                      : 400
                  }
                  height={
                    typeof newsItems[2].image === 'object' && newsItems[2].image?.height
                      ? newsItems[2].image.height
                      : 300
                  }
                  className="object-cover w-full h-full"
                />
              </div>
              <CardContent className="group px-6 py-4 h-full text-center !group-hover:bg-brand-orange !group-hover:text-white transition-colors duration-300">
                <h4 className="font-bold line-clamp-1 text-center text-md mb-2 group-hover:text-white overflow-hidden">
                  {newsItems[2].title}
                </h4>
                <p className="text-gray-600 text-xs line-clamp-2 overflow-hidden group-hover:text-white">
                  {newsItems[2].description}
                </p>
                {newsItems[2].link && (
                  <Link
                    className="text-brand-orange !group-hover:text-white capitalize font-medium"
                    href={newsItems[2].link}
                  >
                    <span className="text-brand-orange group-hover:text-white">Read more</span>
                  </Link>
                )}
              </CardContent>
            </Card>
          )}

          {/* Item 4 - Column 1, Row 3 */}
          {newsItems[3] && (
            <Card className="group gap-0 overflow-hidden hover:shadow-lg transition-all hover:text-white hover:bg-brand-orange duration-300 lg:col-span-1 lg:row-span-1 lg:col-start-1 lg:row-start-3 p-0">
              <div className="relative min-h-36 h-36 max-h-48 w-full aspect-video overflow-hidden">
                <Image
                  src={getImageUrl(newsItems[3].image)}
                  alt={
                    typeof newsItems[3].image === 'object' && newsItems[3].image?.alt
                      ? newsItems[3].image.alt
                      : newsItems[3].title
                  }
                  width={
                    typeof newsItems[3].image === 'object' && newsItems[3].image?.width
                      ? newsItems[3].image.width
                      : 400
                  }
                  height={
                    typeof newsItems[3].image === 'object' && newsItems[3].image?.height
                      ? newsItems[3].image.height
                      : 300
                  }
                  className="object-cover w-full h-full"
                />
              </div>
              <CardContent className="group px-6 py-4 h-full text-center !group-hover:bg-brand-orange !group-hover:text-white transition-colors duration-300">
                <h4 className="font-bold line-clamp-1 text-center text-md mb-2 group-hover:text-white overflow-hidden">
                  {newsItems[3].title}
                </h4>
                <p className="text-gray-600 text-xs line-clamp-2 overflow-hidden group-hover:text-white">
                  {newsItems[3].description}
                </p>
                {newsItems[3].link && (
                  <Link
                    className="text-brand-orange !group-hover:text-white capitalize font-medium"
                    href={newsItems[3].link}
                  >
                    <span className="text-brand-orange group-hover:text-white">Read more</span>
                  </Link>
                )}
              </CardContent>
            </Card>
          )}

          {/* Item 5 - Column 2, Row 3 */}
          {newsItems[4] && (
            <Card className="group gap-0 overflow-hidden hover:shadow-lg transition-all hover:bg-brand-orange duration-300 lg:col-span-1 lg:row-span-1 lg:col-start-2 lg:row-start-3 p-0">
              <div className="relative w-full min-h-36 h-36 max-h-48 aspect-video overflow-hidden">
                <Image
                  src={getImageUrl(newsItems[4].image)}
                  alt={
                    typeof newsItems[4].image === 'object' && newsItems[4].image?.alt
                      ? newsItems[4].image.alt
                      : newsItems[4].title
                  }
                  width={
                    typeof newsItems[4].image === 'object' && newsItems[4].image?.width
                      ? newsItems[4].image.width
                      : 400
                  }
                  height={
                    typeof newsItems[4].image === 'object' && newsItems[4].image?.height
                      ? newsItems[4].image.height
                      : 300
                  }
                  className="object-cover w-full h-full"
                />
              </div>
              <CardContent className="group px-6 py-4 h-full text-center !group-hover:bg-brand-orange !group-hover:text-white transition-colors duration-300">
                <h4 className="font-bold line-clamp-1 text-center text-md mb-2 group-hover:text-white overflow-hidden">
                  {newsItems[4].title}
                </h4>
                <p className="text-gray-600 text-xs line-clamp-2 overflow-hidden group-hover:text-white">
                  {newsItems[4].description}
                </p>
                {newsItems[4].link && (
                  <Link className=" capitalize font-medium" href={newsItems[4].link}>
                    <span className="text-brand-orange group-hover:text-white">Read more</span>
                  </Link>
                )}
              </CardContent>
            </Card>
          )}

          {/* Item 6 - Column 3, Spans 3 rows with internal grid */}
          {newsItems[5] && (
            <Card className="gap-0 overflow-hidden hover:shadow-lg transition-shadow duration-300 lg:col-span-1 lg:row-span-3 lg:col-start-3 lg:row-start-1 p-0 ">
              <div className="relative row-span-1">
                <Image
                  src={getImageUrl(newsItems[5].image)}
                  alt={
                    typeof newsItems[5].image === 'object' && newsItems[5].image?.alt
                      ? newsItems[5].image.alt
                      : newsItems[5].title
                  }
                  width={
                    typeof newsItems[5].image === 'object' && newsItems[5].image?.width
                      ? newsItems[5].image.width
                      : 400
                  }
                  height={
                    typeof newsItems[5].image === 'object' && newsItems[5].image?.height
                      ? newsItems[5].image.height
                      : 300
                  }
                  className="object-cover"
                />
              </div>
              <CardContent className="group px-6 py-4 h-full text-white row-span-2 bg-green-600 transition-colors duration-300">
                <h4 className="font-bold text-lg mb-3 group-hover:text-white overflow-hidden">
                  {newsItems[5].title}
                </h4>
                <p
                  className="text-lg group-hover:text-white mb-4 overflow-hidden"
                  style={{
                    display: '-webkit-box',
                    WebkitBoxOrient: 'vertical' as const,
                  }}
                >
                  {newsItems[5].description}
                </p>
                {newsItems[5].link && (
                  <Link
                    className="text-brand-orange !group-hover:text-white capitalize font-medium"
                    href={newsItems[5].link}
                  >
                    <Button className="bg-white text-2xl px-9 text-green-600 hover:bg-gray-100 rounded-full capitalize font-medium">
                      Read more
                    </Button>
                  </Link>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </section>
  )
}

export default EventsGrid
