import React from 'react'
import { getNewsAndEventsPage } from '@/lib/queries/blogs-events'
import NewsAndEventsHero from './_components/news-and-events-hero'
import EventsGrid from './_components/events-grid'
import TweetGrid from './_components/tweet-grid'
import MasonryGrid from './_components/masonry-grid'
import Community from './_components/community'
import Support from '../knowledge-centre/_components/support'

const page = async () => {
  return (
    <div className="">
      <NewsAndEventsHero />
      <EventsGrid />

      <TweetGrid />
      {/* <MasonryGrid /> */}

      <Support />

      {/* <Community /> */}
    </div>
  )
}

export default page
