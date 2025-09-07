import React from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import { ChevronLeft } from 'lucide-react'

const ResourceLoading = () => {
  return (
    <div>
      {/* Hero Section Skeleton */}
      <Skeleton className="w-full h-64 mb-8 rounded-none" />

      <div className="container mx-auto max-w-[1520px] px-6 md:px-10 lg:px-16 py-12">
        {/* Back Button */}
        <div className="flex items-center mb-8">
          <ChevronLeft className="inline-block mr-2 text-gray-300" />
          <Skeleton className="h-4 w-32" />
        </div>

        {/* Border Separator */}
        <div className="border-t-2 w-full border-gray-200 my-8 flex flex-col md:flex-row">
          {/* Main Content Area */}
          <div className="flex-1 w-3/4 border-r-2 border-gray-200">
            {/* Featured Image Skeleton */}
            <div className="w-full pr-6 flex justify-center my-8 rounded-lg overflow-hidden">
              <Skeleton className="w-full max-h-80 h-80 rounded-lg mb-6" />
            </div>

            {/* Metadata Row */}
            <div className="flex items-center justify-between pr-6 mb-6">
              <div className="flex space-x-3 items-center">
                {/* Target Groups Badges */}
                <Skeleton className="h-6 w-20 rounded-full" />
                <Skeleton className="h-6 w-24 rounded-full" />
                {/* Date */}
                <Skeleton className="h-4 w-16" />
                {/* Download Count */}
                <Skeleton className="h-4 w-12" />
              </div>
              {/* Action Buttons */}
              <div className="flex items-center space-x-2">
                <Skeleton className="h-12 w-12 rounded" />
                <Skeleton className="h-12 w-12 rounded" />
              </div>
            </div>

            {/* Title */}
            <Skeleton className="h-8 w-3/4 mb-4" />

            {/* Publisher and Good Practice Badge */}
            <div className="flex items-center space-x-4 my-4">
              <Skeleton className="h-8 w-32 rounded-full" />
              <Skeleton className="h-4 w-1" />
              <Skeleton className="h-4 w-40" />
            </div>

            {/* Separator */}
            <div className="w-full h-px bg-slate-400 mb-4" />

            {/* Description */}
            <div className="space-y-2 mb-8">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>

            {/* Resource Files Section */}
            <div className="space-y-4">
              <Skeleton className="h-6 w-32" />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="border rounded-lg p-4 space-y-3">
                    <Skeleton className="h-8 w-8" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-1/2" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar - Related Resources */}
          <div className="flex-1 p-4 w-1/4 max-w-[350px]">
            <Skeleton className="h-6 w-40 mb-4" />
            <div className="flex flex-col gap-4">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="bg-white shadow-md rounded-xl">
                  {/* Related Resource Image */}
                  <Skeleton className="w-full h-32 rounded-t-lg mb-2" />
                  <div className="px-2 pb-2">
                    {/* Date */}
                    <Skeleton className="h-3 w-20 mb-1" />
                    {/* Badge */}
                    <Skeleton className="h-5 w-16 rounded mb-1" />
                    {/* Title */}
                    <Skeleton className="h-4 w-full mb-1" />
                    <Skeleton className="h-4 w-3/4 mb-1" />
                    {/* Publisher */}
                    <Skeleton className="h-3 w-24 mb-2" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResourceLoading
