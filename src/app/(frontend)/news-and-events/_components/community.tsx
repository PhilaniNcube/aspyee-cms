import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const Community = () => {
  return (
    <div className="bg-brand">
      <div className="max-w-[1520px] px-6 md:px-12 lg:py-24 mx-auto">
        <h2 className="text-2xl font-bold text-white text-center">Join Our Events</h2>
        <div className="h-1 w-20 bg-brand-orange text-center mx-auto" />
        <div className="py-4 flex flex-col items-center">
          <p className="text-white text-center max-w-3xl mx-auto">
            Connect, learn, and grow. Take part in youth-focused bootcamps, digital skills labs, and
            policy forums across Africa. Our events bring together changemakers, innovators, and
            leaders working for a brighter future.
          </p>
          <Link href="/events" className="text-white ">
            <Button className="mx-auto max-w-2xl rounded-full bg-brand-orange hover:bg-brand-orange-60 text-white">
              Join the community
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Community
