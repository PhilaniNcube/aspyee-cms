import { fetchArchivedBlogs } from '@/lib/queries/blogs'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { format } from 'date-fns'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Calendar, Clock } from 'lucide-react'

const ArchivedBlogs = async ({ locale }: { locale: string }) => {
  const archivedBlogs = await fetchArchivedBlogs(locale)

  console.log('Archived Blogs:', archivedBlogs)

  if (!archivedBlogs || archivedBlogs.length === 0) {
    return null
  }

  // Group the archived blogs by month and year
  const groupedBlogs = archivedBlogs.reduce(
    (acc, blog) => {
      if (!blog.publishedDate) return acc
      const month = new Date(blog.publishedDate).toLocaleString('default', { month: 'long' })
      const year = new Date(blog.publishedDate).getFullYear()
      const key = `${month} ${year}`
      if (!acc[key]) {
        acc[key] = []
      }
      acc[key].push(blog)
      return acc
    },
    {} as Record<string, typeof archivedBlogs>,
  )

  // Sort groups by date (most recent first)
  const sortedGroups = Object.entries(groupedBlogs).sort((a, b) => {
    const dateA = new Date(a[1][0].publishedDate!)
    const dateB = new Date(b[1][0].publishedDate!)
    return dateB.getTime() - dateA.getTime()
  })

  return (
    <section className="py-8 lg:py-12 w-full mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-semibold text-gray-900 mb-2">Archived Blogs</h2>
        <p className="text-gray-600">
          Browse through our collection of {archivedBlogs.length} archived blog posts
        </p>
      </div>

      <Accordion type="multiple" className="w-full space-y-4">
        {sortedGroups.map(([periodKey, blogs]) => (
          <AccordionItem
            key={periodKey}
            value={periodKey}
            className="border border-gray-200 rounded-lg shadow-sm overflow-hidden bg-white"
          >
            <AccordionTrigger className="px-6 py-4 text-left font-semibold text-gray-900 hover:bg-gray-50 transition-colors duration-200 hover:no-underline">
              <div className="flex items-center justify-between w-full pr-4">
                <span className="text-lg">{periodKey}</span>
                <span className="text-sm font-normal text-gray-500">
                  {blogs.length} {blogs.length === 1 ? 'post' : 'posts'}
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6 bg-gray-50">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                {blogs.map((blog) => {
                  const author = typeof blog.author === 'object' ? blog.author : null
                  const featuredImage =
                    typeof blog.featuredImage === 'object' ? blog.featuredImage : null
                  const categories = Array.isArray(blog.categories) ? blog.categories : []

                  return (
                    <Link
                      key={blog.id}
                      href={`/blogs/${blog.slug}`}
                      className="group block bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-300"
                    >
                      {/* Featured Image */}
                      {featuredImage?.url && (
                        <div className="aspect-video relative overflow-hidden bg-gray-200">
                          <Image
                            src={featuredImage.url}
                            alt={featuredImage.alt || blog.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      )}

                      <div className="p-5">
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
                        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-brand-orange transition-colors">
                          {blog.title}
                        </h3>

                        {/* Excerpt */}
                        {blog.excerpt && (
                          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{blog.excerpt}</p>
                        )}

                        {/* Meta Information */}
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          {blog.publishedDate && (
                            <div className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              <span>{format(new Date(blog.publishedDate), 'MMM d, yyyy')}</span>
                            </div>
                          )}
                          {author && author.firstName && author.lastName && (
                            <div className="flex items-center gap-1">
                              <span>By {`${author.firstName} ${author.lastName}`}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  )
}

export default ArchivedBlogs
