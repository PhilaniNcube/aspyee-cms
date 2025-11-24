import { fetchArchivedBlogs } from '@/lib/queries/blogs'
import React, { Suspense } from 'react'
import ArchivedBlogsClient from './archived-blogs-client'

const ArchivedBlogs = async ({ locale }: { locale: string }) => {
  const archivedBlogs = await fetchArchivedBlogs(locale)

  return (
    <Suspense fallback={<div>Loading archives</div>}>
      <ArchivedBlogsClient blogs={archivedBlogs} />
    </Suspense>
  )
}

export default ArchivedBlogs
