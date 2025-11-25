import React from 'react'
import { Metadata } from 'next'
import { fetchBlogsBySearchQuery } from '@/lib/queries/blogs'
import Link from 'next/link'
import { ArrowLeft, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import BlogList from '../_components/blog-list'

interface SearchPageProps {
  searchParams: Promise<{
    q?: string
  }>
}

export async function generateMetadata({ searchParams }: SearchPageProps): Promise<Metadata> {
  const resolvedSearchParams = await searchParams
  const query = resolvedSearchParams.q || ''

  return {
    title: query ? `Search Results for "${query}" | Blogs` : 'Search Blogs',
    description: `Search results for "${query}" in our blog posts and articles.`,
  }
}

export default async function BlogSearchPage({ searchParams }: SearchPageProps) {
  const resolvedSearchParams = await searchParams
  const query = resolvedSearchParams.q || ''

  // Fetch search results if query exists
  const blogs = query ? await fetchBlogsBySearchQuery(query) : []

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-linear-to-r from-blue-600 to-blue-800 text-white">
        <div className="container max-w-[1520px] w-[80%] mx-auto py-12 lg:pt-36">
          <div className="flex items-center gap-3 mb-4">
            <Search className="w-8 h-8" />
            <h1 className="text-4xl font-bold">Search Results</h1>
          </div>

          {query && (
            <p className="text-xl text-white/90">
              Showing results for: <span className="font-semibold">"{query}"</span>
            </p>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="container max-w-[1520px] w-[80%] mx-auto py-8">
        {!query ? (
          // No search query
          <div className="text-center py-12">
            <Search className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No search query provided</h2>
            <p className="text-gray-600 mb-6">
              Please enter a search term to find relevant blog posts.
            </p>
            <Link href="/blogs">
              <Button>Browse All Blogs</Button>
            </Link>
          </div>
        ) : blogs.length === 0 ? (
          // No results found
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-200 flex items-center justify-center">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No results found</h2>
            <p className="text-gray-600 mb-6">
              We couldn't find any blog posts matching "{query}". Try different keywords or browse
              all blogs.
            </p>
            <Link href="/blogs">
              <Button>Browse All Blogs</Button>
            </Link>
          </div>
        ) : (
          // Results found
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {blogs.length} {blogs.length === 1 ? 'result' : 'results'} found
              </h2>
              <p className="text-gray-600">Blog posts matching your search query</p>
            </div>

            <BlogList
              blogs={blogs}
              pagination={{
                page: 1,
                totalPages: 1,
                hasNextPage: false,
                hasPrevPage: false,
              }}
            />
          </div>
        )}
      </div>
    </div>
  )
}
