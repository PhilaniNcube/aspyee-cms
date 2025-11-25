import React from 'react'
import { Metadata } from 'next'
import { fetchBlogsBySearchQuery } from '@/lib/queries/blogs'
import { getResourcesPaginated } from '@/lib/queries/resources'
import Link from 'next/link'
import { ArrowLeft, Search, FileText, BookOpen } from 'lucide-react'
import { Button } from '@/components/ui/button'
import BlogList from '../blogs/_components/blog-list'
import ResourceList from '@/components/resource-list'


interface SearchPageProps {
  params: Promise<{
    locale: string
  }>
  searchParams: Promise<{
    q?: string
  }>
}

export async function generateMetadata({ searchParams }: SearchPageProps): Promise<Metadata> {
  const resolvedSearchParams = await searchParams
  const query = resolvedSearchParams.q || ''

  return {
    title: query ? `Search Results for "${query}"` : 'Search',
    description: `Search results for "${query}" in our content.`,
  }
}

export default async function SearchPage({ params, searchParams }: SearchPageProps) {
  const { locale } = await params
  const resolvedSearchParams = await searchParams
  const query = resolvedSearchParams.q || ''

  // Fetch search results if query exists
  const [blogs, resourcesData] = query ? await Promise.all([
    fetchBlogsBySearchQuery(query, locale),
    getResourcesPaginated({ search: query }, { locale, limit: 100 }) // Fetching more resources to show
  ]) : [[], { docs: [], totalDocs: 0 }]

  const resources = resourcesData.docs
  const totalResults = blogs.length + resources.length

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
              Please enter a search term to find relevant content.
            </p>
            <div className="flex justify-center gap-4">
              <Link href="/blogs">
                <Button variant="outline">Browse Blogs</Button>
              </Link>
              {/* Add link to resources if available */}
            </div>
          </div>
        ) : totalResults === 0 ? (
          // No results found
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-200 flex items-center justify-center">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No results found</h2>
            <p className="text-gray-600 mb-6">
              We couldn't find any content matching "{query}". Try different keywords.
            </p>
            <div className="flex justify-center gap-4">
              <Link href="/blogs">
                <Button variant="outline">Browse Blogs</Button>
              </Link>
            </div>
          </div>
        ) : (
          // Results found
          <div className="space-y-12">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {totalResults} {totalResults === 1 ? 'result' : 'results'} found
              </h2>
              <p className="text-gray-600">Content matching your search query</p>
            </div>

            {/* Blogs Section */}
            {blogs.length > 0 && (
              <section>
                <div className="flex items-center gap-2 mb-6 pb-2 border-b">
                  <BookOpen className="w-6 h-6 text-blue-600" />
                  <h3 className="text-2xl font-bold text-gray-800">Blogs ({blogs.length})</h3>
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
              </section>
            )}

            {/* Resources Section */}
            {resources.length > 0 && (
              <section>
                <div className="flex items-center gap-2 mb-6 pb-2 border-b">
                  <FileText className="w-6 h-6 text-blue-600" />
                  <h3 className="text-2xl font-bold text-gray-800">Resources ({resources.length})</h3>
                </div>
                <ResourceList
                  resources={resources}
                />
              </section>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
