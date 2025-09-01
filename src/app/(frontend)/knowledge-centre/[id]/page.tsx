import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { getResourceById } from '@/lib/queries'
import { getRelatedResources } from '@/lib/queries/resources'
import { cn } from '@/lib/utils'
import { Bookmark, Calendar, ChevronLeft, Download, Share, Share2Icon, Star } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Hero from '../_components/hero'
import ResourceHero from './resource-hero'

type PageProps = {
  params: Promise<{
    id: number
  }>
}

const ResourcePage = async ({ params }: PageProps) => {
  const { id } = await params

  // Fetch resource data using the id
  const resource = await getResourceById(id)

  if (!resource) {
    return <div>Resource not found</div>
  }

  // Fallback pattern for hero image
  const heroImage =
    resource.featured_image &&
    typeof resource.featured_image === 'object' &&
    resource.featured_image.url
      ? resource.featured_image.url
      : 'https://4kav3digtb.ufs.sh/f/FBDFb9YX4geO2vwcZQrzOM7sxtk6jHilDYeuQU9LayhdfS3w'

  // Fetch 2 related resources
  const relatedResources = await getRelatedResources(resource, 2)

  return (
    <div>
      <ResourceHero image={heroImage} title={resource.title} />
      <div className="container mx-auto max-w-[1440px] py-12">
        <Link href={`/policymakers`}>
          <ChevronLeft className="inline-block mr-2" />
          <span className=" hover:underline">Back to Resources</span>
        </Link>
        {/* Featured Image or Fallback */}

        <div className="border-t-2 w-full border-gray-200 my-8 flex flex-col md:flex-row">
          <div className="flex-1 w-3/4 border-r-2 border-gray-200">
            <div className="w-full pr-6 flex justify-center my-8 rounded-lg overflow-hidden">
              <Image
                layout="responsive"
                width={1440}
                height={960}
                src={
                  resource.featured_image &&
                  typeof resource.featured_image === 'object' &&
                  resource.featured_image.url
                    ? resource.featured_image.url
                    : 'https://4kav3digtb.ufs.sh/f/FBDFb9YX4geO2vwcZQrzOM7sxtk6jHilDYeuQU9LayhdfS3w'
                }
                alt={
                  resource.featured_image &&
                  typeof resource.featured_image === 'object' &&
                  resource.featured_image.alt
                    ? resource.featured_image.alt
                    : 'Resource featured image'
                }
                className="max-h-80 object-cover w-full rounded-lg mb-6"
              />
            </div>
            <div className="flex items-center justify-between pr-6">
              <div className="flex space-x-3 items-center">
                {resource.target_groups &&
                  resource.target_groups.map((group) => {
                    return (
                      <Badge className="bg-blue-100 text-brand font-medium">
                        <span key={group}>{group}</span>
                      </Badge>
                    )
                  })}
                <span>
                  <Calendar className="inline-block mr-1" />
                  {resource.year_published}
                </span>
                <span className="flex items-center text-gray-400">
                  <Download className="inline-block mr-1" />
                  254
                </span>
              </div>
              <div className="flex items-center space-x-2 text-gray-800">
                <Link href={resource.link}>
                  <Download className="inline-block  h-8 w-8" />
                </Link>
                <Link href={resource.link}>
                  <Bookmark className="inline-block  h-8 w-8" />
                </Link>
                <Link href={resource.link}>
                  <Share2Icon className="inline-block  h-8 w-8" />
                </Link>
              </div>
            </div>
            <h2 className="text-lg md:text-2xl lg:text-3xl capitalize text-brand font-bold">
              {resource.title}
            </h2>
            <div className="flex items-center space-x-4 text-gray-600 my-4">
              <Badge
                className={cn(' text-white font-thin rounded-full px-4', {
                  'bg-amber-500': resource.good_practice === 'yes',
                  'bg-gray-300': resource.good_practice === 'no',
                })}
              >
                <Star className="inline-block mr-1 fill-white text-white" />
                <span>
                  {resource.good_practice === 'yes' ? 'Good Practice' : 'Not a Good Practice'}
                </span>
              </Badge>
              <div className="flex items-center space-x-1">
                <span className="material-icons text-gray-400">Publisher</span>
                <span>|</span>
                <span className="text-gray-600">{resource.publisher}</span>
              </div>
            </div>
            <Separator orientation="horizontal" className=" bg-slate-400" />
            <p>{resource.description}</p>
          </div>
          <div className="flex-1 p-4 w-1/4 max-w-[350px]">
            <h2 className="text-lg font-semibold mb-4">Related Resources</h2>
            <div className="flex flex-col gap-4">
              {relatedResources.length === 0 && (
                <div className="text-gray-400">No related resources found.</div>
              )}
              {relatedResources.map((rel) => {
                const relImage =
                  rel.featured_image &&
                  typeof rel.featured_image === 'object' &&
                  rel.featured_image.url
                    ? rel.featured_image.url
                    : 'https://4kav3digtb.ufs.sh/f/FBDFb9YX4geO2vwcZQrzOM7sxtk6jHilDYeuQU9LayhdfS3w'
                return (
                  <div key={rel.id} className="bg-white rounded-xl shadow p-3 flex flex-col gap-2">
                    <div className="w-full h-32 rounded-lg overflow-hidden mb-2">
                      <Image
                        src={relImage}
                        alt={
                          rel.featured_image &&
                          typeof rel.featured_image === 'object' &&
                          rel.featured_image.alt
                            ? rel.featured_image.alt
                            : 'Resource image'
                        }
                        width={350}
                        height={128}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div className="flex items-center text-gray-500 text-sm mb-1 gap-2">
                      <Calendar className="inline-block mr-1 w-4 h-4" />
                      {rel.year_published || ''}
                    </div>
                    {rel.target_groups && rel.target_groups.length > 0 && (
                      <Badge className="bg-blue-100 text-brand font-medium mb-1">
                        {rel.target_groups[0]}
                      </Badge>
                    )}
                    <div className="font-semibold text-gray-800 text-base line-clamp-2 mb-1">
                      {rel.title}
                    </div>
                    <div className="text-xs text-gray-500 mb-2">
                      {rel.publisher ? rel.publisher : 'Author | Organisation'}
                    </div>
                    <Link
                      href={`/knowledge-centre/${rel.id}`}
                      className="bg-orange-500 hover:bg-orange-600 text-white rounded-full px-6 py-2 text-center font-semibold transition-colors"
                    >
                      View resource
                    </Link>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResourcePage
