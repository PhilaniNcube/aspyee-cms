import React from 'react'
import { getNewsAndEventsPage } from '@/lib/queries/blogs-events'
import NewsAndEventsHero from './_components/news-and-events-hero'
import EventsGrid from './_components/events-grid'
import TweetGrid from './_components/tweet-grid'
import MasonryGrid from './_components/masonry-grid'
import Community from './_components/community'
import Support from '../knowledge-centre/_components/support'

const page = async ({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ page?: string; year?: string; month?: string }>
}) => {
  return (
    <div className="">
      <NewsAndEventsHero />
      <EventsGrid params={params} searchParams={searchParams} />

      <TweetGrid />
      {/* <MasonryGrid /> */}

      <Support />

      {/* <Community /> */}
    </div>
  )
}

export default page
