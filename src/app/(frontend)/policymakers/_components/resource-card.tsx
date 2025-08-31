import React from 'react'
import Image from 'next/image'
import { Calendar, Share2, Bookmark, Download, Star, CircleOffIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Resource } from '@/payload-types'

interface ResourceCardProps {
  resource: Resource
  getResourceTypeLabel: (type: string) => string
  formatDate: (date: string | number | null | undefined) => string
}

// Map target group to badge color classes
const targetGroupColors: Record<string, string> = {
  Policymakers: 'bg-blue-600 text-white',
  'Educators & Implementers': 'bg-green-600 text-white',
  Youth: 'bg-yellow-500 text-white',
  'Private Sector / Employers': 'bg-purple-600 text-white',
  Researchers: 'bg-pink-600 text-white',
  'TVET Managers / Principals': 'bg-indigo-600 text-white',
  'HR / Labour Market Actors': 'bg-orange-600 text-white',
  'Donors & Development Partners': 'bg-teal-600 text-white',
}

const ResourceCard: React.FC<ResourceCardProps> = ({
  resource,
  getResourceTypeLabel,
  formatDate,
}) => {
  // Pick the first target group for badge color
  const targetGroup =
    resource.target_groups && resource.target_groups.length > 0
      ? (resource.target_groups as string[])[0]
      : undefined
  const badgeClass = targetGroup
    ? `${targetGroupColors[targetGroup] || 'bg-gray-400 text-white'} px-3 py-1 text-xs font-medium rounded-full`
    : ''
  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
      {/* Featured Image */}
      <div className="relative h-48 bg-gradient-to-br from-blue-50 to-blue-100">
        {resource.featured_image &&
        typeof resource.featured_image === 'object' &&
        'url' in resource.featured_image ? (
          <Image
            src={resource.featured_image.url || ''}
            alt={resource.title}
            fill
            className="object-cover"
          />
        ) : (
          <Image
            src="https://4kav3digtb.ufs.sh/f/FBDFb9YX4geO2vwcZQrzOM7sxtk6jHilDYeuQU9LayhdfS3w"
            alt={resource.title}
            fill
            className="object-cover"
          />
        )}
      </div>

      <div className="p-6">
        <div className="flex items-center justify-between p-0 mb-3">
          {targetGroup && (
            <div>
              <Badge className={badgeClass}>{targetGroup}</Badge>
            </div>
          )}
          <div className="flex items-center text-gray-500 text-sm">
            <Calendar className="w-4 h-4 mr-1" />
            {formatDate(resource.year_published)}
          </div>
        </div>
        {/* Title */}
        <h3 className="text-lg font-semibold capitalize text-gray-900 mb-3 line-clamp-2">
          {resource.title}
        </h3>

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
            <Badge className="">
              <span className="inline-flex items-center px-2 py-1 bg-yellow-400 text-yellow-900 text-xs font-medium rounded-full">
                <Star className="w-3 h-3 mr-1" />
                Good Practice
              </span>
            </Badge>
          ) : (
            <Badge className="bg-red-100 text-red-800">
              <CircleOffIcon className="w-3 h-3 mr-1" />
              <span className="text-gray-500">Good Practice</span>
            </Badge>
          )}
        </div>
      </div>
    </div>
  )
}

export default ResourceCard
