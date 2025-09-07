import React from 'react'
import { Skeleton } from '@/components/ui/skeleton'

const PolicymakersLoading = () => {
  return (
    <div className="">
      {/* Hero Section Skeleton */}
      <div className="relative bg-gray-100">
        <Skeleton className="w-full h-96 rounded-none" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center max-w-4xl px-6">
            <Skeleton className="h-12 w-80 mx-auto mb-4" />
            <Skeleton className="h-6 w-96 mx-auto" />
          </div>
        </div>
      </div>

      {/* Title Section Skeleton */}
      <div className="bg-white py-16">
        <div className="container mx-auto max-w-[1520px] px-6 md:px-10 lg:px-16 text-center">
          <Skeleton className="h-10 w-full max-w-4xl mx-auto mb-4" />
          <Skeleton className="h-6 w-full max-w-2xl mx-auto" />
        </div>
      </div>

      {/* Resource List Section Skeleton */}
      <div className="container mx-auto max-w-[1520px] px-6 md:px-10 lg:px-16 py-16">
        {/* Section Title */}
        <div className="mb-8">
          <Skeleton className="h-8 w-80 mb-4" />
        </div>

        {/* Filter/Search Bar */}
        <div className="mb-8 flex flex-col md:flex-row gap-4">
          <Skeleton className="h-12 flex-1" />
          <Skeleton className="h-12 w-32" />
          <Skeleton className="h-12 w-32" />
        </div>

        {/* Resource Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white shadow-md rounded-xl overflow-hidden">
              {/* Resource Image */}
              <Skeleton className="w-full h-48" />
              <div className="p-4">
                {/* Date and Badge */}
                <div className="flex items-center justify-between mb-2">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-6 w-24 rounded-full" />
                </div>
                {/* Title */}
                <Skeleton className="h-6 w-full mb-2" />
                <Skeleton className="h-6 w-3/4 mb-3" />
                {/* Description */}
                <div className="space-y-2 mb-4">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
                {/* Publisher */}
                <Skeleton className="h-4 w-32" />
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-8">
          <Skeleton className="h-12 w-32 mx-auto" />
        </div>
      </div>

      {/* News & Events Section Skeleton */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto max-w-[1520px] px-6 md:px-10 lg:px-16">
          <Skeleton className="h-8 w-64 mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden">
                <Skeleton className="w-full h-40" />
                <div className="p-4">
                  <Skeleton className="h-4 w-20 mb-2" />
                  <Skeleton className="h-6 w-full mb-2" />
                  <Skeleton className="h-6 w-2/3 mb-3" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PolicymakersLoading
