import React from 'react'
import { getNewsAndEventsPage } from '@/lib/queries/blogs-events'
import NewsAndEventsHero from './_components/news-and-events-hero'
import EventsGrid from './_components/events-grid'
import TweetGrid from './_components/tweet-grid'
import MasonryGrid from './_components/masonry-grid'
import Community from './_components/community'

const page = async () => {
  const newsAndEventsData = await getNewsAndEventsPage()

  if (!newsAndEventsData) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1>News and Events</h1>
        <p>No news and events page data found.</p>
      </div>
    )
  }

  const heroSection = newsAndEventsData.heroSection

  const eventsGrid = newsAndEventsData.latestNewsSection

  return (
    <div className="">
      <NewsAndEventsHero
        title={heroSection.heroTitle}
        subtitle={heroSection.heroSubtitle}
        backgroundImage={typeof heroSection.heroImage === 'object' ? heroSection.heroImage : null}
      />
      <EventsGrid eventsData={eventsGrid} />
      {newsAndEventsData.twitterFeed && newsAndEventsData.twitterFeed.length > 0 && (
        <TweetGrid twitterFeed={newsAndEventsData.twitterFeed} />
      )}
      <MasonryGrid />
      <Community />
    </div>
  )
}

export default page
