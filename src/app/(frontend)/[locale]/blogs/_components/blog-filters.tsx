'use client'

import React from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Category } from '@/payload-types'
import { useQueryStates, parseAsArrayOf, parseAsString } from 'nuqs'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Search } from 'lucide-react'
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
        checked ? 'bg-blue-500 text-white ' : 'text-gray-700 hover:bg-blue-50 hover:text-blue-900 ',
      )}
    >
      {label}
    </div>
  )
}

interface BlogFiltersProps {
  categories: Category[]
  tags: string[]
  initialFilters: {
    search?: string
    categories?: string[]
    tags?: string[]
    author?: string
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
      <AccordionTrigger className="px-4 py-3 text-left font-semibold text-gray-900 hover:bg-blue-500 hover:text-white rounded-none transition-colors duration-200 hover:no-underline">
        {title}
      </AccordionTrigger>
      <AccordionContent className="px-4 pb-4 bg-blue-50">{children}</AccordionContent>
    </AccordionItem>
  )
}

export default function BlogFilters({ categories, tags, initialFilters }: BlogFiltersProps) {
  const [filters, setFilters] = useQueryStates({
    search: parseAsString,
    categories: parseAsArrayOf(parseAsString),
    tags: parseAsArrayOf(parseAsString),
    author: parseAsString,
  })

  const handleSearchChange = (value: string) => {
    setFilters({
      ...filters,
      search: value || null,
    })
  }

  const handleFilterChange = (
    filterType: 'categories' | 'tags' | 'author',
    value: string,
    checked: boolean,
  ) => {
    if (filterType === 'author') {
      setFilters({
        ...filters,
        author: checked ? value : null,
      })
      return
    }

    const currentValues = (filters[filterType] as string[]) || []
    let newValues: string[]

    if (checked) {
      newValues = [...currentValues, value]
    } else {
      newValues = currentValues.filter((v) => v !== value)
    }

    setFilters({
      ...filters,
      [filterType]: newValues.length > 0 ? newValues : null,
    })
  }

  const isValueSelected = (
    filterType: 'categories' | 'tags' | 'author',
    value: string,
  ): boolean => {
    if (filterType === 'author') {
      return filters.author === value
    }
    const currentValues = (filters[filterType] as string[]) || []
    return currentValues.includes(value)
  }

  const clearAllFilters = () => {
    setFilters({
      search: null,
      categories: null,
      tags: null,
      author: null,
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
          <h2 className="text-lg font-semibold text-gray-900">Filter Blogs</h2>
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
              placeholder="Search blogs..."
              value={filters.search || ''}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="pl-10 transition-all duration-200 focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
        </div>

        {/* Author Filter */}
        <div className="p-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Author</label>
          <Input
            placeholder="Filter by author..."
            value={filters.author || ''}
            onChange={(e) => handleFilterChange('author', e.target.value, !!e.target.value)}
            className="transition-all duration-200 focus:ring-2 focus:ring-blue-500/20"
          />
        </div>

        <Accordion type="multiple" className="w-full grid grid-cols-1 gap-4">
          {/* Categories Filter */}
          {categories.length > 0 && (
            <FilterSection title="Categories" value="categories">
              <div className="space-y-1 max-h-48 overflow-y-auto scrollbar-hide">
                {categories.map((category) => (
                  <FilterItem
                    key={category.id}
                    id={`category-${category.id}`}
                    label={category.name}
                    checked={isValueSelected('categories', category.id.toString())}
                    onToggle={() =>
                      handleFilterChange(
                        'categories',
                        category.id.toString(),
                        !isValueSelected('categories', category.id.toString()),
                      )
                    }
                  />
                ))}
              </div>
            </FilterSection>
          )}

          {/* Tags Filter */}
          {tags.length > 0 && (
            <FilterSection title="Tags" value="tags">
              <div className="space-y-1 max-h-48 overflow-y-auto scrollbar-hide">
                {tags.map((tag) => (
                  <FilterItem
                    key={tag}
                    id={`tag-${tag}`}
                    label={`#${tag}`}
                    checked={isValueSelected('tags', tag)}
                    onToggle={() => handleFilterChange('tags', tag, !isValueSelected('tags', tag))}
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
