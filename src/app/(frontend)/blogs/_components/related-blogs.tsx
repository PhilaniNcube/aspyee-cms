'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Blog } from '@/payload-types'
import { format } from 'date-fns'

interface RelatedBlogsProps {
  blogs: Blog[]
}

export default function RelatedBlogs({ blogs }: RelatedBlogsProps) {
  if (blogs.length === 0) {
    return null
  }

  return (
    <section className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Articles</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <RelatedBlogCard key={blog.id} blog={blog} />
        ))}
      </div>
    </section>
  )
}

function RelatedBlogCard({ blog }: { blog: Blog }) {
  const featuredImage = typeof blog.featuredImage === 'object' ? blog.featuredImage : null
  const author = typeof blog.author === 'object' ? blog.author : null

  return (
    <article className="bg-white rounded-lg shadow-sm border overflow-hidden hover:shadow-md transition-shadow">
      {/* Featured Image */}
      {featuredImage?.url && (
        <div className="aspect-video relative overflow-hidden">
          <Image
            src={featuredImage.url}
            alt={featuredImage.alt || blog.title}
            fill
            className="object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}

      <div className="p-4">
        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          <Link href={`/blogs/${blog.slug}`} className="hover:text-blue-600 transition-colors">
            {blog.title}
          </Link>
        </h3>

        {/* Excerpt */}
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{blog.excerpt}</p>

        {/* Meta Information */}
        <div className="flex items-center justify-between text-xs text-gray-500">
          {author && (
            <span>
              {author.firstName && author.lastName
                ? `${author.firstName} ${author.lastName}`
                : author.email}
            </span>
          )}
          <time dateTime={blog.createdAt}>{format(new Date(blog.createdAt), 'MMM dd')}</time>
        </div>
      </div>
    </article>
  )
}
