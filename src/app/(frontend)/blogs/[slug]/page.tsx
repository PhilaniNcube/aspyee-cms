import React from 'react'
import Link from 'next/link'
import { format } from 'date-fns'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getBlogBySlug, getBlogsPaginated } from '@/lib/queries/blogs-events'
import BlogContent from '../_components/blog-content'
import RelatedBlogs from '../_components/related-blogs'

interface BlogDetailPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({ params }: BlogDetailPageProps): Promise<Metadata> {
  const resolvedParams = await params
  const blog = await getBlogBySlug(resolvedParams.slug)

  if (!blog) {
    return {
      title: 'Blog Not Found',
    }
  }

  return {
    title: `${blog.title} | Blogs`,
    description: blog.excerpt,
    openGraph: {
      title: blog.title,
      description: blog.excerpt,
      images: [
        {
          url: typeof blog.featuredImage === 'object' ? blog.featuredImage.url || '' : '',
          width: 1200,
          height: 630,
          alt: blog.title,
        },
      ],
    },
  }
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const resolvedParams = await params
  const blog = await getBlogBySlug(resolvedParams.slug)

  if (!blog) {
    notFound()
  }

  // Get related blogs (same categories, excluding current blog)
  const relatedBlogsResult = await getBlogsPaginated(
    {
      categories: Array.isArray(blog.categories)
        ? blog.categories.map((cat: any) => (typeof cat === 'object' ? cat.id : cat))
        : [],
    },
    { limit: 3 },
  )

  // Filter out current blog from related
  const relatedBlogs = relatedBlogsResult.docs.filter((relatedBlog) => relatedBlog.id !== blog.id)

  const author = typeof blog.author === 'object' ? blog.author : null
  const categories = Array.isArray(blog.categories) ? blog.categories : []

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-brand-orange to-brand-orange-60 text-white pt-20">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            {/* Breadcrumb */}
            <nav className="mb-8">
              <ol className="flex items-center space-x-2 text-sm text-white/80">
                <li>
                  <Link href="/blogs" className="hover:text-white">
                    Blogs
                  </Link>
                </li>
                <li>/</li>
                <li className="text-white font-medium truncate">{blog.title}</li>
              </ol>
            </nav>

            {/* Hero Content */}
            <div className="text-center">
              {/* Categories */}
              {categories.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6 justify-center">
                  {categories.map((category) => {
                    const cat = typeof category === 'object' ? category : null
                    return cat ? (
                      <span
                        key={cat.id}
                        className="inline-block bg-white/20 backdrop-blur-sm text-white text-sm px-3 py-1 rounded-full"
                      >
                        {cat.name}
                      </span>
                    ) : null
                  })}
                </div>
              )}

              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">{blog.title}</h1>
              <p className="text-xl md:text-2xl opacity-90 mb-8 max-w-3xl mx-auto">
                {blog.excerpt}
              </p>

              {/* Blog Meta Info */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                {/* {author && (
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3">
                    <span className="text-sm opacity-75">Author</span>
                    <div className="font-semibold">
                      {author.firstName && author.lastName
                        ? `${author.firstName} ${author.lastName}`
                        : author.email}
                    </div>
                  </div>
                )} */}
                <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3">
                  <span className="text-sm opacity-75">Published</span>
                  <div className="font-semibold">
                    {format(new Date(blog.createdAt), 'MMMM d, yyyy')}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <BlogContent blog={blog} />

      {relatedBlogs.length > 0 && (
        <div className="border-t border-gray-200 bg-gray-50">
          <RelatedBlogs blogs={relatedBlogs} />
        </div>
      )}
    </div>
  )
}

// Generate static params for better performance
export async function generateStaticParams() {
  try {
    const blogsResult = await getBlogsPaginated({}, { limit: 100 })

    return blogsResult.docs.map((blog) => ({
      slug: blog.slug,
    }))
  } catch (error) {
    console.error('Error generating static params for blogs:', error)
    return []
  }
}
