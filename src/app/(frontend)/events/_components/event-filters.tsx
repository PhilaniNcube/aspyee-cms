'use client'

import React from 'react'
import { useQueryStates, parseAsArrayOf, parseAsString } from 'nuqs'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Search, MapPin, Calendar, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

interface FilterItemProps {
  id: string
  label: string
  checked: boolean
  onToggle: () => void
}

const FilterItem: React.FC<FilterItemProps> = ({ id, label, checked, onToggle }) => {
  return (
    <div
      id={id}
      onClick={onToggle}
      className={cn(
        'flex items-center w-full px-3 py-2 text-left text-sm font-medium rounded-md transition-all duration-200 ease-in-out cursor-pointer',
        checked
          ? 'bg-green-500 text-white '
          : 'text-gray-700 hover:bg-green-50 hover:text-green-900 ',
      )}
    >
      {label}
    </div>
  )
}

interface EventFiltersProps {
  tags: string[]
  initialFilters: {
    search?: string
    location?: string
    dateFrom?: string
    dateTo?: string
    tags?: string[]
    organizer?: string
  }
}

interface FilterSectionProps {
  title: string
  children: React.ReactNode
  value: string
}

const FilterSection: React.FC<FilterSectionProps> = ({ title, children, value }) => {
  return (
    <AccordionItem value={value} className="border-none cursor-pointer shadow">
      <AccordionTrigger className="px-4 py-3 text-left font-semibold text-gray-900 hover:bg-green-500 hover:text-white rounded-none transition-colors duration-200 hover:no-underline">
        {title}
      </AccordionTrigger>
      <AccordionContent className="px-4 pb-4 bg-green-50">{children}</AccordionContent>
    </AccordionItem>
  )
}

export default function EventFilters({ tags, initialFilters }: EventFiltersProps) {
  const [filters, setFilters] = useQueryStates({
    search: parseAsString,
    location: parseAsString,
    dateFrom: parseAsString,
    dateTo: parseAsString,
    tags: parseAsArrayOf(parseAsString),
    organizer: parseAsString,
  })

  const handleInputChange = (field: string, value: string) => {
    setFilters({
      ...filters,
      [field]: value || null,
    })
  }

  const handleTagChange = (tag: string, checked: boolean) => {
    const currentTags = (filters.tags as string[]) || []
    let newTags: string[]

    if (checked) {
      newTags = [...currentTags, tag]
    } else {
      newTags = currentTags.filter((t) => t !== tag)
    }

    setFilters({
      ...filters,
      tags: newTags.length > 0 ? newTags : null,
    })
  }

  const isTagSelected = (tag: string): boolean => {
    const currentTags = (filters.tags as string[]) || []
    return currentTags.includes(tag)
  }

  const clearAllFilters = () => {
    setFilters({
      search: null,
      location: null,
      dateFrom: null,
      dateTo: null,
      tags: null,
      organizer: null,
    })
  }

  const hasActiveFilters = Object.entries(filters).some(([key, filter]) => {
    return (
      filter &&
      (Array.isArray(filter) ? filter.length > 0 : typeof filter === 'string' && filter.length > 0)
    )
  })

  return (
    <div className="w-full max-w-md bg-white">
      <div className="p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Filter Events</h2>
          {hasActiveFilters && (
            <Button
              variant="outline"
              size="sm"
              onClick={clearAllFilters}
              className="text-sm transition-all bg-transparent duration-200 hover:scale-105 animate-in fade-in-0 slide-in-from-right-2"
            >
              Clear All
            </Button>
          )}
        </div>
      </div>

      <div>
        {/* Search Filter */}
        <div className="p-4">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 transition-colors duration-200 group-focus-within:text-primary" />
            <Input
              placeholder="Search events..."
              value={filters.search || ''}
              onChange={(e) => handleInputChange('search', e.target.value)}
              className="pl-10 transition-all duration-200 focus:ring-2 focus:ring-green-500/20"
            />
          </div>
        </div>

        {/* Location Filter */}
        <div className="p-4">
          <div className="relative group">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 transition-colors duration-200 group-focus-within:text-primary" />
            <Input
              placeholder="Event location..."
              value={filters.location || ''}
              onChange={(e) => handleInputChange('location', e.target.value)}
              className="pl-10 transition-all duration-200 focus:ring-2 focus:ring-green-500/20"
            />
          </div>
        </div>

        {/* Date Range */}
        <div className="p-4">
          <label className="block text-sm font-medium text-gray-700 mb-3">Date Range</label>
          <div className="space-y-3">
            <div className="relative group">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 transition-colors duration-200 group-focus-within:text-primary" />
              <Input
                type="date"
                placeholder="From date"
                value={filters.dateFrom || ''}
                onChange={(e) => handleInputChange('dateFrom', e.target.value)}
                className="pl-10 transition-all duration-200 focus:ring-2 focus:ring-green-500/20"
              />
            </div>
            <div className="relative group">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 transition-colors duration-200 group-focus-within:text-primary" />
              <Input
                type="date"
                placeholder="To date"
                value={filters.dateTo || ''}
                onChange={(e) => handleInputChange('dateTo', e.target.value)}
                className="pl-10 transition-all duration-200 focus:ring-2 focus:ring-green-500/20"
              />
            </div>
          </div>
        </div>

        {/* Organizer Filter */}
        <div className="p-4">
          <div className="relative group">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 transition-colors duration-200 group-focus-within:text-primary" />
            <Input
              placeholder="Event organizer..."
              value={filters.organizer || ''}
              onChange={(e) => handleInputChange('organizer', e.target.value)}
              className="pl-10 transition-all duration-200 focus:ring-2 focus:ring-green-500/20"
            />
          </div>
        </div>

        <Accordion type="multiple" className="w-full grid grid-cols-1 gap-4">
          {/* Tags Filter */}
          {tags.length > 0 && (
            <FilterSection title="Tags" value="tags">
              <div className="space-y-1 max-h-48 overflow-y-auto scrollbar-hide">
                {tags.map((tag) => (
                  <FilterItem
                    key={tag}
                    id={`tag-${tag}`}
                    label={`#${tag}`}
                    checked={isTagSelected(tag)}
                    onToggle={() => handleTagChange(tag, !isTagSelected(tag))}
                  />
                ))}
              </div>
            </FilterSection>
          )}
        </Accordion>
      </div>
    </div>
  )
}
