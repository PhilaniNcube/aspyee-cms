'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Blog } from '@/payload-types'
import { format } from 'date-fns'
import { LayoutGrid, List as ListIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface BlogListProps {
  blogs: Blog[]
  pagination: {
    page: number
    totalPages: number
    hasNextPage: boolean
    hasPrevPage: boolean
  }
}

export default function BlogList({ blogs, pagination }: BlogListProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  if (blogs.length === 0) {
    return (
      <div className="text-center py-12 md:pt-32">
        <div className="text-6xl mb-4">📝</div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">No blogs found</h3>
        <p className="text-gray-600">Try adjusting your filters or search terms.</p>
      </div>
    )
  }

  return (
    <div>
      <div className="flex justify-end mb-6">
        <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-lg">
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              'h-8 w-8 p-0',
              viewMode === 'grid' ? 'bg-white shadow-sm' : 'text-gray-500 hover:text-gray-900',
            )}
            onClick={() => setViewMode('grid')}
          >
            <LayoutGrid className="h-4 w-4" />
            <span className="sr-only">Grid view</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              'h-8 w-8 p-0',
              viewMode === 'list' ? 'bg-white shadow-sm' : 'text-gray-500 hover:text-gray-900',
            )}
            onClick={() => setViewMode('list')}
          >
            <ListIcon className="h-4 w-4" />
            <span className="sr-only">List view</span>
          </Button>
        </div>
      </div>

      {/* Blog Grid/List */}
      <div
        className={cn(
          'grid gap-8 mb-8',
          viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1',
        )}
      >
        {blogs.map((blog) => (
          <Link className="cursor-pointer block h-full" key={blog.id} href={`${blog.sourceLink || '#'}`}>
            <BlogCard blog={blog} viewMode={viewMode} />
          </Link>
        ))}
      </div>

      {/* Pagination */}
      {pagination.totalPages > 1 && <Pagination pagination={pagination} />}
    </div>
  )
}

function BlogCard({ blog, viewMode = 'grid' }: { blog: Blog; viewMode?: 'grid' | 'list' }) {
  const author = typeof blog.author === 'object' ? blog.author : null
  const featuredImage = typeof blog.featuredImage === 'object' ? blog.featuredImage : null
  const categories = Array.isArray(blog.categories) ? blog.categories : []

  if (viewMode === 'list') {
    return (
      <article className="bg-white rounded-lg shadow-sm border overflow-hidden hover:shadow-md transition-shadow flex flex-col md:flex-row h-full">
        {/* Featured Image */}
        {featuredImage?.url && (
          <div className="relative w-full md:w-64 md:shrink-0 aspect-video md:aspect-auto">
            <Image
              src={featuredImage.url}
              alt={featuredImage.alt || blog.title}
              fill
              className="object-cover"
            />
          </div>
        )}

        <div className="p-6 flex flex-col grow">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-2">
            {/* Categories */}
            {categories.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {categories.slice(0, 2).map((category) => {
                  const cat = typeof category === 'object' ? category : null
                  return cat ? (
                    <span
                      key={cat.id}
                      className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
                    >
                      {cat.name}
                    </span>
                  ) : null
                })}
              </div>
            )}
            
            {/* Date */}
            <div className="text-sm text-gray-500 whitespace-nowrap">
              {blog.publishedDate ? (
                <time dateTime={blog.publishedDate}>
                  {format(new Date(blog.publishedDate), 'MMM dd, yyyy')}
                </time>
              ) : (
                <time dateTime={blog.createdAt}>
                  {format(new Date(blog.createdAt), 'MMM dd, yyyy')}
                </time>
              )}
            </div>
          </div>

          {/* Title */}
          <h2 className="text-xl font-semibold text-gray-900 mb-3">
            <div className="hover:text-blue-600 transition-colors">{blog.title}</div>
          </h2>

          {/* Excerpt */}
          <p className="text-gray-600 mb-4 line-clamp-2 grow">{blog.excerpt}</p>

          {/* Tags */}
          {blog.tags && Array.isArray(blog.tags) && blog.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-auto pt-4 border-t border-gray-100">
              {blog.tags.slice(0, 5).map((tagObj, index) => (
                <span
                  key={index}
                  className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded"
                >
                  #{tagObj.tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </article>
    )
  }

  return (
    <article className="bg-white rounded-lg shadow-sm border overflow-hidden hover:shadow-md transition-shadow h-full flex flex-col">
      {/* Featured Image */}
      {featuredImage?.url && (
        <div className="aspect-video relative overflow-hidden shrink-0">
          <Image
            src={featuredImage.url}
            alt={featuredImage.alt || blog.title}
            fill
            className="object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}

      <div className="p-6 flex flex-col grow">
        {/* Categories */}
        {categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {categories.slice(0, 2).map((category) => {
              const cat = typeof category === 'object' ? category : null
              return cat ? (
                <span
                  key={cat.id}
                  className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
                >
                  {cat.name}
                </span>
              ) : null
            })}
          </div>
        )}

        {/* Title */}
        <h2 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
          <div className="hover:text-blue-600 transition-colors">{blog.title}</div>
        </h2>

        {/* Excerpt */}
        <p className="text-gray-600 mb-4 line-clamp-3 grow">{blog.excerpt}</p>

        {/* Meta Information */}
        <div className="flex items-center justify-between text-sm text-gray-500 mt-auto pt-4 border-t border-gray-100">
          {/* <div className="flex items-center gap-2">
            {author && (
              <span>
                By{' '}
                {author.firstName && author.lastName
                  ? `${author.firstName} ${author.lastName}`
                  : author.email}
              </span>
            )}
          </div> */}
          {blog.publishedDate ? (
            <time dateTime={blog.publishedDate}>
              {format(new Date(blog.publishedDate), 'MMM dd, yyyy')}
            </time>
          ) : (
            <time dateTime={blog.createdAt}>
              {format(new Date(blog.createdAt), 'MMM dd, yyyy')}
            </time>
          )}
        </div>

        {/* Tags */}
        {blog.tags && Array.isArray(blog.tags) && blog.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-3">
            {blog.tags.slice(0, 3).map((tagObj, index) => (
              <span
                key={index}
                className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded"
              >
                #{tagObj.tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  )
}

function Pagination({ pagination }: { pagination: BlogListProps['pagination'] }) {
  const { page, totalPages, hasNextPage, hasPrevPage } = pagination

  return (
    <div className="flex items-center justify-center gap-2">
      {hasPrevPage && (
        <Link
          href={`/blogs?page=${page - 1}`}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Previous
        </Link>
      )}

      <span className="px-4 py-2 text-sm text-gray-600">
        Page {page} of {totalPages}
      </span>

      {hasNextPage && (
        <Link
          href={`/blogs?page=${page + 1}`}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Next
        </Link>
      )}
    </div>
  )
}
