import { Media } from '@/payload-types'
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { getNewsAndEventsPage } from '@/lib/queries/blogs-events'
import { format } from 'date-fns/format'
import ArchivedBlogs from './archived-blogs'

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

const EventsGrid = async ({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ page?: string; year?: string; month?: string }>
}) => {
  const { locale } = await params
  const resolvedSearchParams = await searchParams

  const newsAndEventsData = await getNewsAndEventsPage(locale)

  if (!newsAndEventsData) {
    return null
  }

  const eventsGrid = newsAndEventsData.latestNewsSection

  const { sectionTitle, fullWidthSection, newsItems } = eventsGrid

  // Helper function to get image URL.
  // Prefer constructing the URL directly from the UploadThing file key (_key)
  // stored on every media record — this bypasses the url field which can be
  // stale (local /api/media/file/... path) when disableLocalStorage wasn't set.
  const UPLOADTHING_APP_ID = '4kav3digtb'
  const getImageUrl = (image: number | Media | null | undefined): string => {
    if (!image || typeof image !== 'object') return ''

    // _key is the UploadThing file key — always reliable when present
    if ('_key' in image && image._key) {
      return `https://${UPLOADTHING_APP_ID}.ufs.sh/f/${image._key}`
    }

    // Fall back to the url field
    const url = ('url' in image && image.url) ? image.url : ''
    if (!url) return ''

    // If it's still a relative/local path, prepend the server URL
    if (url.startsWith('/')) {
      return `https://centre.aspyee.org${url}`
    }
    return url
  }

  return (
    <section className="py-16 lg:py-24 px-4 max-w-[1520px] w-[80%] mx-auto">
      {/* Section Title */}
      <div className="border-l-8 border-brand-orange pl-4 mb-12">
        <h2 className="text-2xl md:text-3xl font-semibold mb-12 text-gray-900">{sectionTitle}</h2>
      </div>
      {/* Full Width Featured Section */}
      {fullWidthSection && (
        <div className="mb-12">
          <Card className="group overflow-hidden p-0">
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
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              {/* Overlay Content */}
              <div className="absolute inset-0 flex items-end ">
                <div className="p-6 md:p-8 text-white max-w-2xl">
                  {fullWidthSection.badgeText && (
                    <small className="mb-3 text-sm text-white">
                      {format(newsAndEventsData.createdAt, 'MMMM dd')} |{' '}
                      {fullWidthSection.badgeText}
                    </small>
                  )}
                  <h3 className="text-lg sm:text-2xl md:text-3xl font-bold mb-3">{fullWidthSection.title}</h3>
                  <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-out">
                    <div className="overflow-hidden">
                      <p className="text-xs line-clamp-3 lg:line-clamp-none md:text-sm mb-4 text-balance opacity-90">
                        {fullWidthSection.description}
                      </p>
                      {fullWidthSection.link && (
                        <Button
                          asChild
                          className="bg-brand hover:bg-brand-dark px-8 text-white rounded-full"
                        >
                          <Link href={fullWidthSection.link}>Download Brochure</Link>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* News Items Grid */}
      {newsItems && newsItems.length > 0 && (
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1fr_1fr_0.7fr] gap-6 lg:grid-rows-[auto_auto_auto]"
        >
          {/* Item 1 - Spans 2 columns, 1 row */}
          {newsItems[0] && (
            <Card className="@container overflow-hidden hover:shadow-lg transition-shadow duration-300 lg:col-span-2 lg:row-span-1 lg:col-start-1 lg:row-start-1 p-0 flex flex-col md:flex-row">
              <div className="grid @md:grid-cols-2 h-full w-full">
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
                  <CardTitle className="font-semibold text-md mb-3 leading-6 text-gray-700 overflow-hidden">
                    <span className="block ">{newsItems[0].title}</span>
                  </CardTitle>
                  <p className="text-gray-600 leading-5 text-xs font-thin mb-4 overflow-hidden">
                    {newsItems[0].description}
                  </p>
                  {newsItems[0].link && (
                    <Link
                      className="text-brand-orange! !hover:text-brand-orange-60 hover:font-bold capitalize font-medium"
                      href={newsItems[0].link}
                    >
                      <span className="text-sm">Read more</span>
                    </Link>
                  )}
                </CardContent>
              </div>
            </Card>
          )}

          {/* Item 2 - Column 1, Row 2 */}
          {newsItems[1] && (
            <Card className="group bg-brand-orange gap-0 overflow-hidden hover:shadow-lg transition-shadow duration-300 lg:col-span-1 lg:row-span-1 lg:col-start-1 lg:row-start-2 p-0">
              <CardHeader className="p-0 m-0">
                <div className="relative w-full aspect-video overflow-hidden">
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
                        : 500
                    }
                    height={
                      typeof newsItems[1].image === 'object' && newsItems[1].image?.height
                        ? newsItems[1].image.height
                        : 300
                    }
                    className="object-cover w-full aspect-video"
                  />
                </div>
              </CardHeader>
              <CardContent className="group px-6 py-2 h-full bg-brand-orange text-white transition-colors duration-300">
                <CardTitle className="font-medium text-md leading-5 group-hover:text-white overflow-hidden">
                  {newsItems[1].title}
                </CardTitle>
                <p
                  // style={{ margin: 0 }}
                  className="text-white font-thin text-xs leading-5 text-balance py-1 my-0  overflow-hidden group-hover:text-white"
                >
                  {newsItems[1].description}
                </p>
                {newsItems[1].link && (
                  <Link
                    className="text-white !group-hover:text-white group-hover:text-white capitalize font-medium"
                    href={newsItems[1].link}
                  >
                    <span className="text-white group-hover:text-white text-sm">Read more</span>
                  </Link>
                )}
              </CardContent>
            </Card>
          )}

          {/* Item 3 - Column 2, Row 2 */}
          {newsItems[2] && (
            <Card className="group overflow-hidden gap-0 bg-slate-100 hover:shadow-lg transition-all duration-300 lg:col-span-1 lg:row-span-1 lg:col-start-2 lg:row-start-2 p-0">
              <CardHeader className="p-0 m-0">
                <div className="relative w-full overflow-hidden">
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
              </CardHeader>
              <CardContent className="group m-0 px-6 py-2 h-full bg-slate-100 transition-colors duration-300">
                <CardTitle className="text-md mb-2 text-gray-600  overflow-hidden">
                  {newsItems[4].title}
                </CardTitle>
                <p className="text-xs overflow-hidden leading-5 font-thin text-gray-600 ">
                  {newsItems[4].description}
                </p>
                {newsItems[4].link && (
                  <Link className=" capitalize font-medium" href={newsItems[4].link}>
                    <span className=" text-brand-orange hover:font-bold text-sm">Read more</span>
                  </Link>
                )}
              </CardContent>
            </Card>
          )}

          {/* Item 4 - Column 1, Row 3 */}
          {newsItems[3] && (
            <div className="group gap-0 rounded-2xl h-fit max-h-[400px] shadow-md overflow-hidden transition-all hover:text-white duration-300 lg:col-span-1 lg:row-span-1 lg:col-start-1 lg:row-start-3 p-0">
              <div className="relative w-full aspect-video overflow-hidden">
                <video
                  src={newsItems[3].link}
                  controls
                  className="object-cover aspect-video w-full h-full"
                />
              </div>
              <div className="group px-2 py-2  transition-colors duration-300">
                <h3 className=" text-md mb-2 leading-5 text-gray-600 overflow-hidden">
                  {newsItems[3].title}
                </h3>
                {newsItems[3].link && (
                  <Link
                    className="text-gray-800 capitalize font-medium"
                    href="https://aspyee.org/africa-critical-skills-bank/"
                  >
                    <span className="text-brand-orange hover:font-bold">Learn more</span>
                  </Link>
                )}
              </div>
            </div>
          )}

          <div className="flex flex-col gap-6 overflow-hidden transition-shadow duration-300 lg:col-span-1 lg:row-span-3 lg:col-start-3 lg:row-start-1 p-0 ">
            {newsItems[5] && (
              <Card className="p-0 rounded-2xl overflow-hidden gap-0 hover:shadow-lg">
                <CardHeader className="p-0 m-0">
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
                      className="w-full object-cover"
                    />
                  </div>
                </CardHeader>
                <CardContent className="group px-3 pb-5 h-full row-span-2 transition-colors duration-300">
                  <CardTitle className="font-medium text-md! text-gray-600 overflow-hidden">
                    {newsItems[5].title}
                  </CardTitle>
                  <p
                    className="text-xs font-thin text-gray-600 overflow-hidden"
                    style={{
                      display: '-webkit-box',
                      WebkitBoxOrient: 'vertical' as const,
                      marginBottom: '1rem',
                    }}
                  >
                    {newsItems[5].description}
                  </p>
                  {newsItems[5].link && (
                    <Link
                      className="text-brand-orange font-medium text-sm"
                      href={newsItems[5].link}
                    >
                      <span className="text-brand-orange hover:font-bold text-sm">Read more</span>
                    </Link>
                  )}
                </CardContent>
              </Card>
            )}
            {newsItems[6] && (
              <Card className="p-0 rounded-2xl overflow-hidden hover:shadow-lg gap-0">
                <CardHeader className="p-0 m-0">
                  <div className="relative row-span-1">
                    <Image
                      src={getImageUrl(newsItems[6].image)}
                      alt={
                        typeof newsItems[6].image === 'object' && newsItems[6].image?.alt
                          ? newsItems[6].image.alt
                          : newsItems[6].title
                      }
                      width={
                        typeof newsItems[6].image === 'object' && newsItems[6].image?.width
                          ? newsItems[6].image.width
                          : 400
                      }
                      height={
                        typeof newsItems[6].image === 'object' && newsItems[6].image?.height
                          ? newsItems[6].image.height
                          : 300
                      }
                      className="w-full aspect-square object-cover"
                    />
                  </div>
                </CardHeader>
                <CardContent className="group px-3 pb-5 h-full row-span-2 py-1 transition-colors duration-300">
                  <CardTitle className="font-medium text-md! text-gray-600 overflow-hidden">
                    {newsItems[6].title}
                  </CardTitle>
                  <p
                    className="text-xs text-gray-600 font-thin overflow-hidden"
                    style={{
                      display: '-webkit-box',
                      WebkitBoxOrient: 'vertical' as const,
                      marginBottom: '1rem',
                    }}
                  >
                    {newsItems[6].description}
                  </p>
                  {newsItems[6].link && (
                    <Link
                      className="text-brand-orange font-medium text-sm"
                      href={newsItems[6].link}
                    >
                      <span className="text-brand-orange hover:font-bold text-sm">Read more</span>
                    </Link>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Add a component for the archived blogs */}
          </div>
        </div>
      )}


      {/* ── Upcoming Events ─────────────────────────────────────── */}
      <div className="mt-16 mb-12">
        <div className="border-l-8 border-brand-orange pl-4 mb-8">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900">Upcoming Events</h2>
        </div>

        {/* SRH Webinar Card */}
        <div className="group bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow duration-300 flex flex-col md:flex-row">
          {/* Square image */}
          <div className="relative w-full aspect-square md:aspect-auto md:w-72 md:h-72 lg:w-80 lg:h-80 shrink-0">
            <Image
              src="/images/webinar.jpeg"
              alt="AUDA-NEPAD SRH Youth Webinar"
              fill
              className="object-cover"
            />
          </div>

          {/* Event details */}
          <div className="flex flex-col justify-between p-6 md:p-8 flex-1">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="inline-flex items-center gap-1.5 bg-brand-orange text-white text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide">
                  Webinar
                </span>
                <span className="text-xs text-gray-500 font-medium">Friday, 15 May 2026</span>
              </div>

              <h3 className="text-lg md:text-xl font-bold text-gray-900 leading-snug mb-3">
                AUDA-NEPAD Youth Sexual &amp; Reproductive Health (SRH) Webinar
              </h3>

              <p className="text-xs text-gray-500 mb-1">
                In partnership with the{' '}
                <span className="font-semibold text-gray-700">Southern Africa Youth Forum (SAYoF)</span> and{' '}
                <span className="font-semibold text-gray-700">Pan African Youth Union (PYU)</span>
              </p>

              <p className="text-xs text-gray-600 mt-3">
                A platform for youth leaders and advocates to share experiences, best practices, and policy
                recommendations to advance Sexual and Reproductive Health (SRH) across the continent — amplifying
                youth voices and strengthening advocacy towards integrating SRH into national and continental
                development frameworks.
              </p>

              {/* Meta grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 mb-4 gap-3">
                <div className="bg-gray-50 rounded-xl px-4">
                  <p className="text-xs text-gray-400 uppercase tracking-wide font-semibold mb-0.5">Date</p>
                  <p className="text-sm font-semibold text-gray-800">Friday, 15 May 2026</p>
                </div>
                <div className="bg-gray-50 rounded-xl px-4">
                  <p className="text-xs text-gray-400 uppercase tracking-wide font-semibold mb-0.5">Time</p>
                  <p className="text-sm font-semibold text-gray-800">14h30 – 16h00 (SAST)</p>
                </div>
                <div className="bg-gray-50 rounded-xl px-4">
                  <p className="text-xs text-gray-400 uppercase tracking-wide font-semibold mb-0.5">Format</p>
                  <p className="text-sm font-semibold text-gray-800">Virtual (Zoom)</p>
                </div>
              </div>
            </div>

            <div>
              <Link
                href="https://zoom.us/webinar/register/WN_q6cjR-A7THOdJCMxV_BSQA"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-brand-orange hover:bg-brand-orange/90 text-white font-semibold text-sm px-8 py-3 rounded-full transition-colors duration-200"
              >
                Register Here
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* ── End Upcoming Events ──────────────────────────────────── */}

      <div className="mt-16 relative rounded-2xl overflow-hidden">
        <Image
          src="/images/jamies.webp"
          alt="Decorative Bottom"
          width={1920}
          height={1080}
          className="w-full aspect-8/3 object-cover h-auto"
        />
        <div className="absolute inset-0 p-6 flex flex-col justify-end items-start bg-linear-to-r from-black/70 via-black/40 to-transparent">
          <small className="text-sm text-white">September 14 | Claire Wanja</small>
          <h3 className="text-2xl md:text-3xl font-bold text-white max-w-2xl my-4">
            African youth hailed as continent&apos;s tech future
          </h3>
          <p className="text-white font-thin text-sm leading-6 text-balance mt-2 max-w-2xl">
            Education CS Julius Ogamba underlined that the initiative complements Kenya&apos;s
            Bottom-Up Economic Transformation Agenda (BETA) by equipping young people with practical
            skills to drive manufacturing and job creation
          </p>
          <Link
            className="text-white px-12 py-2 font-medium text-sm bg-brand hover:bg-brand-dark rounded-full my-5"
            href="https://www.kbc.co.ke/african-youth-hailed-as-continents-tech-future/"
          >
            <span className="text-white text-sm">Read More</span>
          </Link>
        </div>
      </div>
      <ArchivedBlogs locale={locale} searchParams={resolvedSearchParams} />
    </section>
  )
}

export default EventsGrid
