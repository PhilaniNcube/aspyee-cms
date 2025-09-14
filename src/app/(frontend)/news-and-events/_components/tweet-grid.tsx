import { Media } from '@/payload-types'
import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import Image from 'next/image'
import { format } from 'date-fns/format'

type TweetGridProps = {
  twitterFeed: {
    tweet: string
    author: string
    date: string
    avatar?: number | Media | null | undefined
    id?: string | null
  }[]
}

const TweetGrid = ({ twitterFeed }: TweetGridProps) => {
  // Helper function to get image URL
  const getImageUrl = (image: number | Media | null | undefined): string => {
    if (!image) return ''
    if (typeof image === 'object' && 'url' in image) {
      return image.url || ''
    }
    return ''
  }

  // Get first 3 tweets
  const firstThreeTweets = twitterFeed.slice(0, 3)

  return (
    <section className="pt-36 pb-16 px-4 max-w-7xl mx-auto">
      {/* Twitter Feed Grid */}
      {firstThreeTweets.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {firstThreeTweets.map((tweet, index) => (
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
                      <span className="text-gray-500">·</span>
                      <p className="text-sm text-gray-500 whitespace-nowrap">
                        {format(new Date(tweet.date), 'MMMM dd, yyyy')}
                      </p>
                    </div>

                    {/* Tweet Text */}
                    <p className="text-gray-700 leading-relaxed break-words">{tweet.tweet}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </section>
  )
}

export default TweetGrid
