'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Event } from '@/payload-types'
import { format, isAfter, isBefore } from 'date-fns'

interface EventListProps {
  events: Event[]
  pagination: {
    page: number
    totalPages: number
    hasNextPage: boolean
    hasPrevPage: boolean
  }
}

export default function EventList({ events, pagination }: EventListProps) {
  if (events.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">📅</div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">No events found</h3>
        <p className="text-gray-600">Try adjusting your filters or search terms.</p>
      </div>
    )
  }

  return (
    <div>
      {/* Event Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {events.map((event) => (
          <Link className="cursor-pointer" key={event.id} href={`/events/${event.id}`}>
            <EventCard event={event} />
          </Link>
        ))}
      </div>

      {/* Pagination */}
      {pagination.totalPages > 1 && <Pagination pagination={pagination} />}
    </div>
  )
}

function EventCard({ event }: { event: Event }) {
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
            <div className="absolute top-4 left-4">
              <span className="bg-gray-800 text-white text-xs px-2 py-1 rounded">Past Event</span>
            </div>
          )}
        </div>
      )}

      <div className="p-6">
        {/* Date Badge */}
        <div className="flex items-center gap-2 mb-3">
          <div className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full font-medium">
            {format(eventDate, 'MMM dd, yyyy')}
          </div>
          <div className="text-sm text-gray-600">{format(eventDate, 'h:mm a')}</div>
        </div>

        {/* Title */}
        <h2 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
          <Link href={`/events/${event.id}`} className="hover:text-green-600 transition-colors">
            {event.title}
          </Link>
        </h2>

        {/* Location */}
        <div className="flex items-center gap-2 mb-3">
          <svg
            className="w-4 h-4 text-gray-500"
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
          <span className="text-sm text-gray-600">{event.location}</span>
        </div>

        {/* Description */}
        <p className="text-gray-600 mb-4 line-clamp-3">{event.description}</p>

        {/* Organizer */}
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center gap-2">
            <span>Organized by</span>
            <span className="font-medium text-gray-700">{event.organizer}</span>
          </div>
        </div>

        {/* Tags */}
        {event.tags && Array.isArray(event.tags) && event.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {event.tags.slice(0, 3).map((tagObj, index) => (
              <span
                key={index}
                className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded"
              >
                #{tagObj.tag}
              </span>
            ))}
          </div>
        )}

        {/* CTA Button */}
        <div className="mt-4 pt-4 border-t border-gray-100">
          <Link
            href={`/events/${event.id}`}
            className="inline-flex items-center justify-center w-full bg-brand-orange !text-white py-2 px-4 rounded-md hover:bg-brand-orange/80 transition-colors text-sm font-medium"
          >
            View Details
          </Link>
        </div>
      </div>
    </article>
  )
}

function Pagination({ pagination }: { pagination: EventListProps['pagination'] }) {
  const { page, totalPages, hasNextPage, hasPrevPage } = pagination

  return (
    <div className="flex items-center justify-center gap-2">
      {hasPrevPage && (
        <Link
          href={`/events?page=${page - 1}`}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Previous
        </Link>
      )}

      <span className="px-4 py-2 text-sm text-gray-600">
        Page {page} of {totalPages}
      </span>

      {hasNextPage && (
        <Link
          href={`/events?page=${page + 1}`}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Next
        </Link>
      )}
    </div>
  )
}
