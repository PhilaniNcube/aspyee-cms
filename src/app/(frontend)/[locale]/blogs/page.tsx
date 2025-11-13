import React from 'react'

import { Metadata } from 'next'
import { getBlogCategories, getBlogsPaginated, getBlogTags } from '@/lib/queries/blogs-events'
import BlogHero from './_components/blog-hero'
import BlogFilters from './_components/blog-filters'
import BlogList from './_components/blog-list'

interface BlogsPageProps {
  searchParams: Promise<{
    page?: string
    search?: string
    categories?: string
    tags?: string
    author?: string
  }>
}

export const metadata: Metadata = {
  title: 'Blogs | Knowledge Centre',
  description:
    'Explore our latest blog posts and articles on youth development, education, and policy making.',
}

export default async function BlogsPage({ searchParams }: BlogsPageProps) {
  const resolvedSearchParams = await searchParams
  const page = Number(resolvedSearchParams.page) || 1
  const limit = 12

  // Parse filters from search params
  const filters = {
    search: resolvedSearchParams.search,
    categories: resolvedSearchParams.categories?.split(',').filter(Boolean),
    tags: resolvedSearchParams.tags?.split(',').filter(Boolean),
    author: resolvedSearchParams.author,
  }

  // Fetch data in parallel
  const [blogsResult, categories, tags] = await Promise.all([
    getBlogsPaginated(filters, { page, limit }),
    getBlogCategories(),
    getBlogTags(),
  ])

  return (
    <div className="min-h-screen bg-gray-50">
      <BlogHero />

      <div className="container max-w-[1440px] mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-8">
              <BlogFilters categories={categories} tags={tags} initialFilters={filters} />
            </div>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-3">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Blog Posts</h2>
              <p className="text-gray-600">
                {blogsResult.totalDocs} post{blogsResult.totalDocs !== 1 ? 's' : ''} found
                {filters.search && ` for "${filters.search}"`}
              </p>
            </div>

            <BlogList
              blogs={blogsResult.docs}
              pagination={{
                page: blogsResult.page,
                totalPages: blogsResult.totalPages,
                hasNextPage: blogsResult.hasNextPage,
                hasPrevPage: blogsResult.hasPrevPage,
              }}
            />
          </main>
        </div>
      </div>
    </div>
  )
}
