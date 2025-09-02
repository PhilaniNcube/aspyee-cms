import React from 'react'
import Image from 'next/image'
import { Calendar, Share2, Bookmark, Download, Star, CircleOffIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Resource } from '@/payload-types'
import { cn } from '@/lib/utils'

interface ResourceCardProps {
  resource: Resource
  getResourceTypeLabel: (type: string) => string
  formatDate: (date: string | number | null | undefined) => string
}

// use a switch statement to determine the badge color based on the theme
const themeColors: Record<string, string> = {
  'Industrial, technical and vocational training': '!bg-blue-600 !text-white',
  'Gender and Transformation': '!bg-pink-600 !text-white',
  'Entrepreneurship and informal sector formalisation': '!bg-purple-600 !text-white',
  'Human Capital Development': '!bg-green-600 !text-white',
  'Agribusiness and agricultural skills': '!bg-emerald-600 !text-white',
  'Labour migration & mobility': '!bg-orange-600 !text-white',
  'Digital skills & future of work': '!bg-cyan-600 !text-white',
  'Education systems & policy': '!bg-indigo-600 !text-white',
  'Financing & investment in skills': '!bg-yellow-500 !text-black',
  'Informal sector & livelihoods': '!bg-red-600 !text-white',
  'Green skills / sustainability': '!bg-lime-600 !text-white',
  'Innovation & partnerships': '!bg-violet-600 !text-white',
  Governance: '!bg-slate-600 !text-white',
}

const getBadgeColor = (theme: string) => {
  // Normalize theme string for matching
  const normalizedTheme = theme.trim()
  return themeColors[normalizedTheme] || '!bg-gray-400 !text-white'
}

const ResourceCard: React.FC<ResourceCardProps> = ({
  resource,
  getResourceTypeLabel,
  formatDate,
}) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
      {/* Featured Image */}
      <div className="relative w-full aspect-video bg-gradient-to-br from-blue-50 to-blue-100">
        {resource.featured_image &&
        typeof resource.featured_image === 'object' &&
        'url' in resource.featured_image ? (
          <Image
            src={resource.featured_image.url || ''}
            alt={resource.title}
            width={1920}
            height={1080}
            className="object-cover aspect-video"
          />
        ) : (
          <Image
            src="https://4kav3digtb.ufs.sh/f/FBDFb9YX4geO2vwcZQrzOM7sxtk6jHilDYeuQU9LayhdfS3w"
            alt={resource.title}
            width={1920}
            height={1080}
            className="object-cover aspect-video"
          />
        )}

        {/* Theme badges positioned over the image */}
        <div className="absolute bottom-3 left-3 flex gap-2 flex-wrap max-w-[calc(100%-1.5rem)]">
          {resource.themes && resource.themes.length > 0
            ? (resource.themes as string[]).map((group) => (
                <Badge
                  key={group}
                  variant="outline"
                  className={cn('rounded-full border-0 shadow-sm', getBadgeColor(group))}
                >
                  {group}
                </Badge>
              ))
            : null}
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center justify-between p-0 mb-3">
          <div className="flex items-center text-gray-500 text-sm">
            <Calendar className="w-4 h-4 mr-1" />
            {formatDate(resource.year_published)}
          </div>
        </div>
        {/* Title */}
        <h3 className="text-lg font-semibold capitalize text-gray-900 mb-3 line-clamp-1">
          {resource.title}
        </h3>
        <p className="text-foreground line-clamp-2 text-xs">{resource.description}</p>

        {/* Resource Type and Language */}
        <div className="text-sm text-gray-600 mb-4">
          <span>{getResourceTypeLabel(resource.type)}</span>
          {resource.language && <span className="ml-2">| {resource.language}</span>}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-1">
            <Button variant="ghost" className="p-2 h-auto">
              <Share2 className="w-8 h-8" />
            </Button>
            <Button variant="ghost" className="p-2 h-auto">
              <Bookmark className="w-8 h-8" />
            </Button>
            <div className="flex items-center text-sm">
              <Download className="w-4 h-4 mr-1" />
              254
            </div>
          </div>
          {resource.good_practice === 'yes' ? (
            <Badge className=" bg-yellow-400 rounded-full">
              <span className="inline-flex items-center px-2 py-1  text-yellow-900 text-xs font-medium rounded-full">
                <Star className="w-3 h-3 mr-1 text-white fill-white" />
                Good Practice
              </span>
            </Badge>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default ResourceCard
