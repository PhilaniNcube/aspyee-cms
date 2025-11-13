import React from 'react'
import Link from 'next/link'
import { format } from 'date-fns'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import EventContent from '../_components/event-content'
import RelatedEvents from '../_components/related-events'
import { getEventById, getEventsPaginated } from '@/lib/queries/blogs-events'

interface EventDetailPageProps {
  params: Promise<{
    id: string
  }>
}

export async function generateMetadata({ params }: EventDetailPageProps): Promise<Metadata> {
  const resolvedParams = await params
  const event = await getEventById(resolvedParams.id)

  if (!event) {
    return {
      title: 'Event Not Found',
    }
  }

  return {
    title: `${event.title} | Events`,
    description: event.description,
    openGraph: {
      title: event.title,
      description: event.description,
      images: [
        {
          url: typeof event.featuredImage === 'object' ? event.featuredImage.url || '' : '',
          width: 1200,
          height: 630,
          alt: event.title,
        },
      ],
    },
  }
}

export default async function EventDetailPage({ params }: EventDetailPageProps) {
  const resolvedParams = await params
  const event = await getEventById(resolvedParams.id)

  if (!event) {
    notFound()
  }

  // Get related events (same location or similar tags, excluding current event)
  const relatedEventsResult = await getEventsPaginated(
    {
      location: event.location,
    },
    { limit: 3 },
  )

  // Filter out current event from related
  const relatedEvents = relatedEventsResult.docs.filter(
    (relatedEvent) => relatedEvent.id !== event.id,
  )

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-brand to-blue-600 text-white pt-20">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            {/* Breadcrumb */}
            <nav className="mb-8">
              <ol className="flex items-center space-x-2 text-sm text-white/80">
                <li>
                  <Link href="/events" className="hover:text-white">
                    Events
                  </Link>
                </li>
                <li>/</li>
                <li className="text-white font-medium truncate">{event.title}</li>
              </ol>
            </nav>

            {/* Hero Content */}
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">{event.title}</h1>
              <p className="text-xl md:text-2xl opacity-90 mb-8 max-w-3xl mx-auto">
                {event.description}
              </p>

              {/* Event Meta Info */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3">
                  <span className="text-sm opacity-75">Date</span>
                  <div className="font-semibold">
                    {format(new Date(event.date), 'MMMM d, yyyy')}
                  </div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3">
                  <span className="text-sm opacity-75">Location</span>
                  <div className="font-semibold">{event.location}</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3">
                  <span className="text-sm opacity-75">Organizer</span>
                  <div className="font-semibold">{event.organizer}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <EventContent event={event} />

      {relatedEvents.length > 0 && (
        <div className="border-t border-gray-200 bg-gray-50">
          <RelatedEvents events={relatedEvents} />
        </div>
      )}
    </div>
  )
}

// Generate static params for better performance
export async function generateStaticParams() {
  try {
    const eventsResult = await getEventsPaginated({}, { limit: 100 })

    return eventsResult.docs.map((event) => ({
      id: event.id.toString(),
    }))
  } catch (error) {
    console.error('Error generating static params for events:', error)
    return []
  }
}
