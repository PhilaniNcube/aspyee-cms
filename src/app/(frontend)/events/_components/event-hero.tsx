'use client'

import React from 'react'

export default function EventHero() {
  return (
    <div className="bg-gradient-to-r from-brand to-blue-600 text-white">
      <div className="container mx-auto px-4 py-16 md:pt-32">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Events & Conferences</h1>
          <p className="text-xl md:text-2xl opacity-90 mb-8">
            Join us for workshops, conferences, and networking events focused on youth development
            and education
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3">
              <span className="text-sm opacity-75">Upcoming Events</span>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3">
              <span className="text-sm opacity-75">Workshops</span>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3">
              <span className="text-sm opacity-75">Conferences</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
