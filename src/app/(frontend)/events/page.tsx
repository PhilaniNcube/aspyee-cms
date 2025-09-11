import React from 'react'

import { Metadata } from 'next'
import EventHero from './_components/event-hero'
import EventFilters from './_components/event-filters'
import EventList from './_components/event-list'
import { getEventsPaginated, getEventTags } from '@/lib/queries/blogs-events'

interface EventsPageProps {
  searchParams: Promise<{
    page?: string
    search?: string
    location?: string
    dateFrom?: string
    dateTo?: string
    tags?: string
    organizer?: string
  }>
}

export const metadata: Metadata = {
  title: 'Events | Knowledge Centre',
  description:
    'Discover upcoming events, workshops, and conferences on youth development and education.',
}

export default async function EventsPage({ searchParams }: EventsPageProps) {
  const resolvedSearchParams = await searchParams
  const page = Number(resolvedSearchParams.page) || 1
  const limit = 12

  // Parse filters from search params
  const filters = {
    search: resolvedSearchParams.search,
    location: resolvedSearchParams.location,
    dateFrom: resolvedSearchParams.dateFrom,
    dateTo: resolvedSearchParams.dateTo,
    tags: resolvedSearchParams.tags?.split(',').filter(Boolean),
    organizer: resolvedSearchParams.organizer,
  }

  // Fetch data in parallel
  const [eventsResult, tags] = await Promise.all([
    getEventsPaginated(filters, { page, limit }),
    getEventTags(),
  ])

  return (
    <div className="min-h-screen bg-gray-50">
      <EventHero />

      <div className="container max-w-[1440px] mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-8">
              <EventFilters tags={tags} initialFilters={filters} />
            </div>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-3">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Upcoming Events</h2>
              <p className="text-gray-600">
                {eventsResult.totalDocs} event{eventsResult.totalDocs !== 1 ? 's' : ''} found
                {filters.search && ` for "${filters.search}"`}
              </p>
            </div>

            <EventList
              events={eventsResult.docs}
              pagination={{
                page: eventsResult.page,
                totalPages: eventsResult.totalPages,
                hasNextPage: eventsResult.hasNextPage,
                hasPrevPage: eventsResult.hasPrevPage,
              }}
            />
          </main>
        </div>
      </div>
    </div>
  )
}
