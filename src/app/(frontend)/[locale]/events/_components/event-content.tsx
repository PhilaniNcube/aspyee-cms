'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Event } from '@/payload-types'
import { format, isAfter, isBefore } from 'date-fns'

interface EventContentProps {
  event: Event
}

export default function EventContent({ event }: EventContentProps) {
  const featuredImage = typeof event.featuredImage === 'object' ? event.featuredImage : null
  const eventDate = new Date(event.date)
  const now = new Date()
  const isPastEvent = isBefore(eventDate, now)

  return (
    <article className="max-w-4xl mx-auto px-4 py-8">
      {/* Event Status */}
      {isPastEvent && (
        <div className="mb-8">
          <span className="inline-block bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
            Past Event
          </span>
        </div>
      )}

      {/* Featured Image */}
      {featuredImage?.url && (
        <div className="mb-8">
          <div className="aspect-video relative overflow-hidden rounded-lg">
            <Image
              src={featuredImage.url}
              alt={featuredImage.alt || event.title}
              fill
              className="object-cover"
              priority
            />
          </div>
          {featuredImage.alt && (
            <p className="text-sm text-gray-600 mt-2 text-center italic">{featuredImage.alt}</p>
          )}
        </div>
      )}

      {/* About This Event */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">About This Event</h2>
        <div className="prose prose-lg max-w-none">
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">{event.description}</p>
        </div>
      </div>

      {/* Tags */}
      {event.tags && Array.isArray(event.tags) && event.tags.length > 0 && (
        <div className="border-t border-gray-200 pt-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Event Tags</h3>
          <div className="flex flex-wrap gap-2">
            {event.tags.map((tagObj, index) => (
              <span
                key={index}
                className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-md text-sm hover:bg-green-200 transition-colors"
              >
                #{tagObj.tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      {!isPastEvent && (
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium">
              Register for Event
            </button>
            <button className="border border-green-600 text-green-600 px-6 py-3 rounded-lg hover:bg-green-50 transition-colors font-medium">
              Add to Calendar
            </button>
          </div>
          <p className="text-sm text-gray-600 mt-3">
            Registration and calendar functionality would be implemented based on your requirements.
          </p>
        </div>
      )}
    </article>
  )
}
