'use client'

import React, { useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { format } from 'date-fns'
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react'
import { useQueryState } from 'nuqs'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import type { Blog } from '@/payload-types'
import { useRouter, usePathname } from 'next/navigation'

interface ArchivedBlogsClientProps {
  blogs: Blog[]
}

const ArchivedBlogsClient = ({ blogs }: ArchivedBlogsClientProps) => {
  const router = useRouter()
  const pathname = usePathname()
  const [year, setYear] = useQueryState('year')
  const [month, setMonth] = useQueryState('month')
  const [page, setPage] = useQueryState('page', { defaultValue: '1' })

  const currentPage = parseInt(page || '1', 10)
  const itemsPerPage = 10

  // Extract available years
  const years = useMemo(() => {
    const uniqueYears = new Set<string>()
    blogs.forEach((blog) => {
      if (blog.publishedDate) {
        uniqueYears.add(new Date(blog.publishedDate).getFullYear().toString())
      }
    })
    return Array.from(uniqueYears).sort((a, b) => b.localeCompare(a))
  }, [blogs])

  const effectiveYear = year || (years.length > 0 ? years[0] : null)

  // Extract available months for the selected year
  const months = useMemo(() => {
    if (!effectiveYear) return []
    const uniqueMonths = new Set<string>()
    blogs.forEach((blog) => {
      if (blog.publishedDate) {
        const blogYear = new Date(blog.publishedDate).getFullYear().toString()
        if (blogYear === effectiveYear) {
          const date = new Date(blog.publishedDate)
          const monthName = date.toLocaleString('default', { month: 'long' })
          uniqueMonths.add(monthName)
        }
      }
    })

    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ]
    return Array.from(uniqueMonths).sort((a, b) => {
      return monthNames.indexOf(a) - monthNames.indexOf(b)
    })
  }, [blogs, effectiveYear])

  const effectiveMonth = month || (months.length > 0 ? months[months.length - 1] : null)

  // Filter blogs based on selection
  const filteredBlogs = useMemo(() => {
    if (!effectiveYear || !effectiveMonth) return []
    return blogs
      .filter((blog) => {
        if (!blog.publishedDate) return false
        const date = new Date(blog.publishedDate)
        const blogYear = date.getFullYear().toString()
        const blogMonth = date.toLocaleString('default', { month: 'long' })
        return blogYear === effectiveYear && blogMonth === effectiveMonth
      })
      .sort((a, b) => {
        // Sort by date descending
        return new Date(b.publishedDate!).getTime() - new Date(a.publishedDate!).getTime()
      })
  }, [blogs, effectiveYear, effectiveMonth])

  // Calculate pagination for filtered blogs
  const totalPages = Math.ceil(filteredBlogs.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedBlogs = filteredBlogs.slice(startIndex, endIndex)

  const handleYearChange = (value: string) => {
    setYear(value)
    setMonth(null) // Reset month when year changes
    setPage('1') // Reset to first page
  }

  const handleMonthChange = (value: string) => {
    setMonth(value)
    setPage('1') // Reset to first page
  }

  const handlePageChange = (newPage: number) => {
    setPage(newPage.toString())
  }

  if (!blogs || blogs.length === 0) {
    return null
  }

  return (
    <section className="py-8 lg:py-12 w-full mx-auto">
      <div className="mb-8">
        <div className="border-l-8 border-brand-orange pl-4">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900">Archived Blogs</h2>
        </div>
        <p className="text-gray-600 mb-6">
          Select a year and month to browse our collection of {blogs.length} archived blog posts
          {filteredBlogs.length > 0 &&
            effectiveYear &&
            effectiveMonth &&
            ` (${filteredBlogs.length} for ${effectiveMonth} ${effectiveYear})`}
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="w-full sm:w-48">
            <Select value={effectiveYear || ''} onValueChange={handleYearChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select Year" />
              </SelectTrigger>
              <SelectContent>
                {years.map((y) => (
                  <SelectItem key={y} value={y}>
                    {y}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="w-full sm:w-48">
            <Select
              value={effectiveMonth || ''}
              onValueChange={handleMonthChange}
              disabled={!effectiveYear}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Month" />
              </SelectTrigger>
              <SelectContent>
                {months.map((m) => (
                  <SelectItem key={m} value={m}>
                    {m}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {filteredBlogs.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            {paginatedBlogs.map((blog) => {
              const author = typeof blog.author === 'object' ? blog.author : null
              const featuredImage = typeof blog.featuredImage === 'object' ? blog.featuredImage : null
              const categories = Array.isArray(blog.categories) ? blog.categories : []

              return (
                <Link
                  key={blog.id}
                  href={`${blog.sourceLink || '#'}`}
                  className="group block bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-300"
                >
                  {/* Featured Image */}
                  {featuredImage?.url && (
                    <div className="aspect-video relative overflow-hidden bg-gray-200">
                      <Image
                        src={featuredImage.url}
                        alt={featuredImage.alt || blog.title}
                        width={900}
                        height={506}
                        className="object-cover aspect-video w-full group-hover:scale-105 transition-transform duration-300"
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

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-8">
              <Button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                variant="outline"
                size="sm"
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Previous
              </Button>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">
                  Page {currentPage} of {totalPages}
                </span>
                <span className="text-sm text-gray-500">({filteredBlogs.length} total)</span>
              </div>
              <Button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                variant="outline"
                size="sm"
              >
                Next
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          )}
        </>
      ) : (
        effectiveYear &&
        effectiveMonth && (
          <div className="text-center py-12 text-gray-500">
            No blogs found for {effectiveMonth} {effectiveYear}.
          </div>
        )
      )}
    </section>
  )
}

export default ArchivedBlogsClient
