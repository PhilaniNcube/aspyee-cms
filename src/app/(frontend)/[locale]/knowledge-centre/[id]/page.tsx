import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { ResourceFilesSection } from '@/components/ui/resource-files-section'
import { AdditionalFilesSection } from '@/components/ui/additional-files-section'
import { getResourceById } from '@/lib/queries'
import { getRelatedResources } from '@/lib/queries/resources'
import { cn } from '@/lib/utils'
import {
  Bookmark,
  Calendar,
  ChevronLeft,
  Download,
  File,
  Share,
  Share2Icon,
  Star,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { Suspense } from 'react'
import Hero from '../_components/hero'
import ResourceHero from './resource-hero'
import { Button } from '@/components/ui/button'
import { addBookmark } from '@/lib/actions/bookmarks'
import ResourceDetail from './resource-detail'

type PageProps = {
  params: Promise<{
    id: number
  }>
}

const ResourcePage = async ({ params }: PageProps) => {
  // Server action wrapper to add a bookmark for this resource.
  // We accept FormData so it can be bound directly to the <form action>.

  const heroImage = 'https://4kav3digtb.ufs.sh/f/FBDFb9YX4geO2vwcZQrzOM7sxtk6jHilDYeuQU9LayhdfS3w'

  return (
    <div>
      <ResourceHero image={heroImage} />
      <div className="container mx-auto max-w-[1520px] w-[80%]  py-12">
        <Link href={`/policymakers`}>
          <ChevronLeft className="inline-block mr-2" />
          <span className=" hover:underline">Back to Resources</span>
        </Link>
      </div>
      <Suspense
        fallback={
          <div className="min-h-screen">
            {/* Hero Skeleton */}
            <div className="bg-gray-200 animate-pulse h-64 md:h-80" />

            {/* Content Skeleton */}
            <div className="container max-w-7xl mx-auto px-4 py-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                  <div className="animate-pulse space-y-4">
                    <div className="h-8 bg-gray-200 rounded w-3/4" />
                    <div className="h-4 bg-gray-200 rounded w-full" />
                    <div className="h-4 bg-gray-200 rounded w-5/6" />
                    <div className="h-4 bg-gray-200 rounded w-4/6" />
                  </div>
                  <div className="animate-pulse space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-full" />
                    <div className="h-4 bg-gray-200 rounded w-full" />
                    <div className="h-4 bg-gray-200 rounded w-3/4" />
                  </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                  <div className="animate-pulse space-y-4">
                    <div className="h-24 bg-gray-200 rounded" />
                    <div className="h-24 bg-gray-200 rounded" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        }
      >
        <ResourceDetail params={params} />
      </Suspense>
    </div>
  )
}

export default ResourcePage
