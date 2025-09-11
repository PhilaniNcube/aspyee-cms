'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Event } from '@/payload-types'
import { format, isBefore } from 'date-fns'

interface RelatedEventsProps {
  events: Event[]
}

export default function RelatedEvents({ events }: RelatedEventsProps) {
  if (events.length === 0) {
    return null
  }

  return (
    <section className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Events</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {events.map((event) => (
          <RelatedEventCard key={event.id} event={event} />
        ))}
      </div>
    </section>
  )
}

function RelatedEventCard({ event }: { event: Event }) {
  const featuredImage = typeof event.featuredImage === 'object' ? event.featuredImage : null
  const eventDate = new Date(event.date)
  const now = new Date()
  const isPastEvent = isBefore(eventDate, now)

  return (
    <article className="bg-white rounded-lg shadow-sm border overflow-hidden hover:shadow-md transition-shadow">
      {/* Featured Image */}
      {featuredImage?.url && (
        <div className="aspect-video relative overflow-hidden">
          <Image
            src={featuredImage.url}
            alt={featuredImage.alt || event.title}
            fill
            className="object-cover hover:scale-105 transition-transform duration-300"
          />
          {isPastEvent && (
            <div className="absolute top-2 left-2">
              <span className="bg-gray-800 text-white text-xs px-2 py-1 rounded">Past</span>
            </div>
          )}
        </div>
      )}

      <div className="p-4">
        {/* Date */}
        <div className="flex items-center gap-2 mb-2">
          <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">
            {format(eventDate, 'MMM dd')}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          <Link href={`/events/${event.id}`} className="hover:text-green-600 transition-colors">
            {event.title}
          </Link>
        </h3>

        {/* Location */}
        <div className="flex items-center gap-1 mb-2">
          <svg
            className="w-3 h-3 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <span className="text-xs text-gray-600 truncate">{event.location}</span>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{event.description}</p>

        {/* Organizer */}
        <div className="text-xs text-gray-500">
          <span>By {event.organizer}</span>
        </div>
      </div>
    </article>
  )
}
