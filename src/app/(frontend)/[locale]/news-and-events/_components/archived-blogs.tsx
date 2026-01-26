import { fetchArchivedBlogs } from '@/lib/queries/blogs'
import React, { Suspense } from 'react'
import ArchivedBlogsClient from './archived-blogs-client'

const ArchivedBlogs = async ({
  locale,
  searchParams,
}: {
  locale: string
  searchParams: { page?: string; year?: string; month?: string }
}) => {
  const blogs = await fetchArchivedBlogs(locale)

  // Show message if no blogs found
  if (blogs.length === 0) {
    return (
      <div className="py-8 lg:py-12 w-full mx-auto">
        <div className="mb-8">
          <div className="border-l-8 border-brand-orange pl-4">
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-900">Archived Blogs</h2>
          </div>
        </div>
        <div className="text-center py-12 text-gray-500">
          <p>No archived blogs available at the moment.</p>
        </div>
      </div>
    )
  }

  return (
    <Suspense fallback={<div>Loading archives</div>}>
      <ArchivedBlogsClient blogs={blogs} />
    </Suspense>
  )
}

export default ArchivedBlogs
