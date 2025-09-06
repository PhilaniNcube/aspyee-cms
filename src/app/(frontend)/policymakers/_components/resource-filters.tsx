'use client'

import React from 'react'
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

// Define the filter options based on your Resources collection
const RESOURCE_TYPES = [
  { label: 'Academic / Research Paper', value: 'academic' },
  { label: 'Case Study / Good Practice', value: 'case_study' },
  { label: 'Evaluation Review', value: 'evaluation' },
  { label: 'Framework/Standard', value: 'framework' },
  { label: 'Multimedia', value: 'multimedia' },
  { label: 'Policy/Strategy', value: 'policy' },
  { label: 'Report/Data', value: 'report' },
  { label: 'Toolkit/Guide', value: 'toolkit' },
]

const THEMES = [
  'Industrial, technical and vocational training',
  'Gender and Transformation',
  'Entrepreneurship and informal sector formalisation',
  'Human Capital Development',
  'Labour migration & mobility',
  'Digital skills & future of work',
  'Education systems & policy',
  'Financing & investment in skills',
  'Informal sector & livelihoods',
  'Green skills / sustainability',
  'Innovation & partnerships',
]

const TARGET_GROUPS = [
  'Policymakers',
  'Educators & Implementers',
  'Youth',
  'Private Sector / Employers',
  'Researchers',
  'TVET Managers / Principals',
  'HR / Labour Market Actors',
  'Donors & Development Partners',
]

const LANGUAGES = [
  { label: 'English', value: 'English' },
  { label: 'French', value: 'French' },
  { label: 'Portuguese', value: 'Portuguese' },
  { label: 'Arabic', value: 'Arabic' },
  { label: 'Other (if multilingual or unspecified)', value: 'Other' },
]

const COUNTRIES = [
  // North Africa
  'Algeria',
  'Egypt',
  'Libya',
  'Morocco',
  'Sudan',
  'Tunisia',
  // West Africa
  'Benin',
  'Burkina Faso',
  'Cape Verde',
  "Côte d'Ivoire",
  'Gambia',
  'Ghana',
  'Guinea',
  'Guinea-Bissau',
  'Liberia',
  'Mali',
  'Mauritania',
  'Niger',
  'Nigeria',
  'Senegal',
  'Sierra Leone',
  'Togo',
  // Central Africa
  'Cameroon',
  'Central African Republic',
  'Chad',
  'Democratic Republic of Congo',
  'Equatorial Guinea',
  'Gabon',
  'Republic of Congo',
  'São Tomé and Príncipe',
  // East Africa
  'Burundi',
  'Comoros',
  'Djibouti',
  'Eritrea',
  'Ethiopia',
  'Kenya',
  'Madagascar',
  'Mauritius',
  'Rwanda',
  'Seychelles',
  'Somalia',
  'South Sudan',
  'Tanzania',
  'Uganda',
  // Southern Africa
  'Angola',
  'Botswana',
  'Eswatini',
  'Lesotho',
  'Malawi',
  'Mozambique',
  'Namibia',
  'South Africa',
  'Zambia',
  'Zimbabwe',
]

// Year range for Year Published filter
const YEAR_RANGE = Array.from({ length: 25 }, (_, i) => new Date().getFullYear() - i)

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
        'flex items-center w-full px-3 py-2 text-left text-sm font-medium rounded-md transition-all duration-200 ease-in-out',
        checked
          ? 'bg-orange-500 text-white '
          : 'text-gray-700 hover:bg-orange-50 hover:text-orange-900 ',
      )}
    >
      {label}
    </div>
  )
}

interface ResourceFiltersProps {
  // Removed onFiltersChange since both components use the same URL state
}

interface FilterSectionProps {
  title: string
  children: React.ReactNode
  value: string
}

const FilterSection: React.FC<FilterSectionProps> = ({ title, children, value }) => {
  return (
    <AccordionItem value={value} className="border-none cursor-pointer bg-brand-orange-60 shadow">
      <AccordionTrigger className="px-4 py-3 text-left  font-semibold text-gray-900 hover:bg-brand-orange-60 rounded-none transition-colors duration-200 hover:no-underline">
        {title}
      </AccordionTrigger>
      <AccordionContent className="px-4 pb-4 bg-amber-300">{children}</AccordionContent>
    </AccordionItem>
  )
}

const ResourceFilters: React.FC<ResourceFiltersProps> = () => {
  const [filters, setFilters] = useQueryStates({
    search: parseAsString,
    yearPublished: parseAsArrayOf(parseAsString),
    country: parseAsArrayOf(parseAsString),
    resourceType: parseAsArrayOf(parseAsString),
    targetGroup: parseAsArrayOf(parseAsString),
    theme: parseAsArrayOf(parseAsString),
    language: parseAsArrayOf(parseAsString),
  })

  const handleFilterChange = (
    filterType: keyof typeof filters,
    value: string,
    checked: boolean,
  ) => {
    if (filterType === 'search') {
      setFilters({
        ...filters,
        search: checked ? value : null,
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

  const handleSearchChange = (value: string) => {
    setFilters({
      ...filters,
      search: value || null,
    })
  }

  const clearAllFilters = () => {
    setFilters({
      search: null,
      yearPublished: null,
      country: null,
      resourceType: null,
      targetGroup: null,
      theme: null,
      language: null,
    })
  }

  const hasActiveFilters = Object.values(filters).some(
    (filter) => filter && (Array.isArray(filter) ? filter.length > 0 : filter.length > 0),
  )

  return (
    <div className="w-full max-w-md bg-white">
      <div className="p-4 ">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Filter Resources</h2>
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
        <div className="p-4 ">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 transition-colors duration-200 group-focus-within:text-primary" />
            <Input
              placeholder="Search resources..."
              value={filters.search || ''}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="pl-10 transition-all duration-200 focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>

        <Accordion type="multiple" className="w-full grid grid-cols-1 gap-4">
          {/* Year Published Filter */}
          <FilterSection title="Year Published" value="year-published">
            <div className="space-y-1 max-h-48 bg-amber-300 overflow-y-auto scrollbar-hide px-0">
              {YEAR_RANGE.map((year) => (
                <FilterItem
                  key={year}
                  id={`year-${year}`}
                  label={year.toString()}
                  checked={((filters.yearPublished as string[]) || []).includes(year.toString())}
                  onToggle={() =>
                    handleFilterChange(
                      'yearPublished',
                      year.toString(),
                      !((filters.yearPublished as string[]) || []).includes(year.toString()),
                    )
                  }
                />
              ))}
            </div>
          </FilterSection>

          {/* Country Filter */}
          <FilterSection title="Country" value="country">
            <div className="space-y-1 max-h-48 overflow-y-auto scrollbar-hide">
              {COUNTRIES.map((country) => (
                <FilterItem
                  key={country}
                  id={`country-${country}`}
                  label={country}
                  checked={((filters.country as string[]) || []).includes(country)}
                  onToggle={() =>
                    handleFilterChange(
                      'country',
                      country,
                      !((filters.country as string[]) || []).includes(country),
                    )
                  }
                />
              ))}
            </div>
          </FilterSection>

          {/* Resource Type Filter */}
          <FilterSection title="Resource Type" value="resource-type">
            <div className="space-y-1">
              {RESOURCE_TYPES.map((type) => (
                <FilterItem
                  key={type.value}
                  id={`type-${type.value}`}
                  label={type.label}
                  checked={((filters.resourceType as string[]) || []).includes(type.value)}
                  onToggle={() =>
                    handleFilterChange(
                      'resourceType',
                      type.value,
                      !((filters.resourceType as string[]) || []).includes(type.value),
                    )
                  }
                />
              ))}
            </div>
          </FilterSection>

          {/* Target Group Filter */}
          <FilterSection title="Target Group" value="target-group">
            <div className="space-y-1">
              {TARGET_GROUPS.map((group) => (
                <FilterItem
                  key={group}
                  id={`target-${group}`}
                  label={group}
                  checked={((filters.targetGroup as string[]) || []).includes(group)}
                  onToggle={() =>
                    handleFilterChange(
                      'targetGroup',
                      group,
                      !((filters.targetGroup as string[]) || []).includes(group),
                    )
                  }
                />
              ))}
            </div>
          </FilterSection>

          {/* Theme Filter */}
          <FilterSection title="Theme" value="theme">
            <div className="space-y-1 max-h-48 overflow-y-auto scrollbar-hide">
              {THEMES.map((theme) => (
                <FilterItem
                  key={theme}
                  id={`theme-${theme}`}
                  label={theme}
                  checked={((filters.theme as string[]) || []).includes(theme)}
                  onToggle={() =>
                    handleFilterChange(
                      'theme',
                      theme,
                      !((filters.theme as string[]) || []).includes(theme),
                    )
                  }
                />
              ))}
            </div>
          </FilterSection>

          {/* Language Filter */}
          <FilterSection title="Language" value="language">
            <div className="space-y-1">
              {LANGUAGES.map((language) => (
                <FilterItem
                  key={language.value}
                  id={`language-${language.value}`}
                  label={language.label}
                  checked={((filters.language as string[]) || []).includes(language.value)}
                  onToggle={() =>
                    handleFilterChange(
                      'language',
                      language.value,
                      !((filters.language as string[]) || []).includes(language.value),
                    )
                  }
                />
              ))}
            </div>
          </FilterSection>
        </Accordion>
      </div>
    </div>
  )
}

export default ResourceFilters
