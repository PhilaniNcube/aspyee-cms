'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Blog } from '@/payload-types'
import { format } from 'date-fns'
import { RichText } from '@payloadcms/richtext-lexical/react'

interface BlogContentProps {
  blog: Blog
}

export default function BlogContent({ blog }: BlogContentProps) {
  const featuredImage = typeof blog.featuredImage === 'object' ? blog.featuredImage : null

  return (
    <article className="max-w-4xl mx-auto px-4 py-8">
      {/* Featured Image */}
      {featuredImage?.url && (
        <div className="mb-8">
          <div className="aspect-video relative overflow-hidden rounded-lg">
            <Image
              src={featuredImage.url}
              alt={featuredImage.alt || blog.title}
              fill
              className="object-cover"
              priority
            />
          </div>
          {featuredImage.alt && (
            <p className="text-sm text-gray-600 mt-2 text-center italic">{featuredImage.alt}</p>
          )}
        </div>
      )}

      {/* Content */}
      <div className="prose prose-lg max-w-none mb-8">
        <RichText data={blog.content} />
      </div>

      {/* Tags */}
      {blog.tags && Array.isArray(blog.tags) && blog.tags.length > 0 && (
        <div className="border-t border-gray-200 pt-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {blog.tags.map((tagObj, index) => (
              <span
                key={index}
                className="inline-block bg-gray-100 text-gray-700 px-3 py-1 rounded-md text-sm hover:bg-gray-200 transition-colors"
              >
                #{tagObj.tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </article>
  )
}
