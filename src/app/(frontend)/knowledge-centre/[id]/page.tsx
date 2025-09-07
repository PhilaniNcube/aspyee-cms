import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { ResourceFilesSection } from '@/components/ui/resource-files-section'
import { AdditionalFilesSection } from '@/components/ui/additional-files-section'
import { getResourceById } from '@/lib/queries'
import { getRelatedResources } from '@/lib/queries/resources'
import { cn } from '@/lib/utils'
import {
  Bookmark,
  Calendar,
  ChevronLeft,
  Download,
  File,
  Share,
  Share2Icon,
  Star,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Hero from '../_components/hero'
import ResourceHero from './resource-hero'
import { Button } from '@/components/ui/button'
import { addBookmark } from '@/lib/actions/bookmarks'

type PageProps = {
  params: Promise<{
    id: number
  }>
}

const ResourcePage = async ({ params }: PageProps) => {
  const { id } = await params

  // Fetch resource data using the id
  const resource = await getResourceById(id)

  console.log('Resource data:', resource)

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

  // Server action wrapper to add a bookmark for this resource.
  // We accept FormData so it can be bound directly to the <form action>.
  async function bookmarkAction(formData: FormData) {
    'use server'
    const resourceIdRaw = formData.get('resourceId')
    const resourceId = typeof resourceIdRaw === 'string' ? Number(resourceIdRaw) : id
    if (!Number.isNaN(resourceId)) {
      await addBookmark(resourceId)
    }
  }

  return (
    <div>
      <ResourceHero image={heroImage} title={resource.title} />
      <div className="container mx-auto max-w-[1520px] px-6 md:px-10 lg:px-16 py-12">
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
                      <Badge key={group} className="bg-blue-100 text-brand font-medium">
                        <span>{group}</span>
                      </Badge>
                    )
                  })}
                <span>
                  <Calendar className="inline-block mr-1" />
                  {resource.year_published}
                </span>
                <span className="flex items-center text-gray-400">
                  <Download className="inline-block mr-1" />
                  {resource.download_count || 0}
                </span>
              </div>
              <div className="flex items-center space-x-2 text-gray-800">
                <form action={bookmarkAction}>
                  <input type="hidden" name="resourceId" value={resource.id} />
                  <Button type="submit" variant="ghost" className="bg-slate-100 hover:bg-slate-200">
                    <Bookmark className="inline-block  h-8 w-8" />
                  </Button>
                </form>
                <Link href={resource.link}>
                  <Button variant="ghost" className="bg-slate-100 hover:bg-slate-200">
                    <Share2Icon className="inline-block  h-8 w-8" />
                  </Button>
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

            <br />
            <ResourceFilesSection
              files={resource.files || []}
              title="Resource Files"
              showStats={true}
              showFilter={true}
              defaultView="grid"
              resourceId={resource.id}
            />

            {/* Additional Files Section */}
            {resource.additional_files && resource.additional_files.length > 0 && (
              <div className="mt-8">
                <AdditionalFilesSection
                  additionalFiles={resource.additional_files}
                  title="Additional Files"
                  showStats={true}
                  showFilter={true}
                  defaultView="grid"
                  resourceId={resource.id}
                  collapsible={true}
                  defaultOpen={false}
                />
              </div>
            )}
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
                  <Link
                    href={`/knowledge-centre/${rel.id}`}
                    key={rel.id}
                    className="bg-white shadow-md hover:shadow-lg rounded-xlflex flex-col gap-2"
                  >
                    <div className="w-full h-32 rounded-t-lg overflow-hidden mb-2">
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
                    <div className="px-2">
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
                    </div>
                  </Link>
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
