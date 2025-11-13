import { Media } from '@/payload-types'
import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import Image from 'next/image'
import { format } from 'date-fns/format'
import { getNewsAndEventsPage } from '@/lib/queries/blogs-events'

type TweetGridProps = {
  twitterFeed: {
    tweet: string
    author: string
    date: string
    avatar?: number | Media | null | undefined
    id?: string | null
  }[]
}

const TweetGrid = async () => {
  const newsAndEventsData = await getNewsAndEventsPage()

  if (!newsAndEventsData) {
    return null
  }

  const { twitterFeed } = newsAndEventsData

  // Helper function to get image URL
  const getImageUrl = (image: number | Media | null | undefined): string => {
    if (!image) return ''
    if (typeof image === 'object' && 'url' in image) {
      return image.url || ''
    }
    return ''
  }

  if (!twitterFeed || twitterFeed.length === 0) {
    return null
  }

  // Get first 5 tweets
  const tweets = twitterFeed?.slice(0, 5)
  const firstFourTweets = tweets?.slice(0, 4)
  const fifthTweet = tweets?.[4]

  return (
    <section className="py-5 max-w-[1520px] w-[80%] lg:py-10 px-6 lg:px-16 rounded-4xl border-2 bg-gray-100 border-brand mx-auto mb-16">
      <h2 className="text-3xl font-medium mb-10 text-gray-900">Voices from the community</h2>
      {/* Twitter Feed Grid - 3 columns, 2 rows */}
      {tweets.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
          {/* First 2 tweets - row 1, columns 1-2 */}
          {firstFourTweets.slice(0, 2).map((tweet, index) => (
            <Card
              key={tweet.id || index}
              className="overflow-hidden hover:shadow-lg transition-shadow duration-300 p-0"
            >
              <CardContent className="p-6">
                {/* Classic Twitter Layout: Avatar left, Content right */}
                <div className="flex gap-3">
                  {/* Avatar - Top Left */}
                  <div className="flex-shrink-0">
                    {tweet.avatar ? (
                      <div className="relative w-12 h-12 rounded-full overflow-hidden">
                        <Image
                          src={getImageUrl(tweet.avatar)}
                          alt={`${tweet.author} avatar`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center">
                        <span className="text-gray-600 font-bold text-lg">
                          {tweet.author.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Tweet Content - Right Side */}
                  <div className="flex-1 min-w-0">
                    {/* Author and Date */}
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-bold text-gray-900 truncate">{tweet.author}</h4>
                    </div>

                    {/* Tweet Text */}
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed break-words">{tweet.tweet}</p>
              </CardContent>
            </Card>
          ))}

          {/* 5th tweet - column 3, spans 2 rows */}
          {fifthTweet && (
            <Card
              key={fifthTweet.id || 'fifth'}
              className="overflow-hidden hover:shadow-lg transition-shadow duration-300 p-0 lg:row-span-2"
            >
              <CardContent className="p-6 flex flex-col h-full">
                {/* Square Avatar Image at the top */}
                {fifthTweet.avatar ? (
                  <div className="relative w-full aspect-square mb-4 overflow-hidden">
                    <Image
                      src={getImageUrl(fifthTweet.avatar)}
                      alt={`${fifthTweet.author} avatar`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-full aspect-square mb-4 rounded-lg bg-gray-300 flex items-center justify-center">
                    <span className="text-gray-600 font-bold text-4xl">
                      {fifthTweet.author.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}

                {/* Tweet Content Below Image */}
                <div className="flex-1">
                  {/* Author and Date */}
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-bold text-gray-900">{fifthTweet.author}</h4>
                    <span className="text-gray-500">·</span>
                    <p className="text-sm text-gray-500">
                      {format(new Date(fifthTweet.date), 'MMMM dd, yyyy')}
                    </p>
                  </div>

                  {/* Tweet Text */}
                  <p className="text-gray-700 leading-relaxed">{fifthTweet.tweet}</p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Tweets 3 and 4 - row 2, columns 1-2 */}
          {firstFourTweets.slice(2, 4).map((tweet, index) => (
            <Card
              key={tweet.id || index + 2}
              className="overflow-hidden hover:shadow-lg transition-shadow duration-300 p-0"
            >
              <CardContent className="p-6">
                {/* Classic Twitter Layout: Avatar left, Content right */}
                <div className="flex gap-3">
                  {/* Avatar - Top Left */}
                  <div className="flex-shrink-0">
                    {tweet.avatar ? (
                      <div className="relative w-12 h-12 rounded-full overflow-hidden">
                        <Image
                          src={getImageUrl(tweet.avatar)}
                          alt={`${tweet.author} avatar`}
                          width={300}
                          height={300}
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center">
                        <span className="text-gray-600 font-bold text-lg">
                          {tweet.author.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Tweet Content - Right Side */}
                  <div className="flex-1 min-w-0">
                    {/* Author and Date */}
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-bold text-gray-900 truncate">{tweet.author}</h4>
                    </div>

                    {/* Tweet Text */}
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed break-words">{tweet.tweet}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </section>
  )
}

export default TweetGrid
