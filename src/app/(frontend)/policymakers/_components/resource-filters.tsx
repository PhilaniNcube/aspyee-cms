'use client'

import React from 'react'
import { useQueryStates, parseAsArrayOf, parseAsString } from 'nuqs'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { ChevronDown, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
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

interface ResourceFiltersProps {
  onFiltersChange?: (filters: any) => void
}

interface FilterSectionProps {
  title: string
  children: React.ReactNode
  className?: string
}

const FilterSection: React.FC<FilterSectionProps> = ({ title, children, className }) => {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className={cn('border-b border-gray-200', className)}
    >
      <CollapsibleTrigger asChild>
        <Button
          variant="ghost"
          className="flex w-full items-center justify-between p-4 text-left font-medium hover:bg-gray-50"
        >
          {title}
          {isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="px-4 pb-4">{children}</CollapsibleContent>
    </Collapsible>
  )
}

const ResourceFilters: React.FC<ResourceFiltersProps> = ({ onFiltersChange }) => {
  const [filters, setFilters] = useQueryStates({
    yearPublished: parseAsArrayOf(parseAsString),
    country: parseAsArrayOf(parseAsString),
    resourceType: parseAsArrayOf(parseAsString),
    targetGroup: parseAsArrayOf(parseAsString),
    theme: parseAsArrayOf(parseAsString),
    language: parseAsArrayOf(parseAsString),
  })

  // Notify parent component when filters change
  React.useEffect(() => {
    if (onFiltersChange) {
      onFiltersChange(filters)
    }
  }, [filters, onFiltersChange])

  const handleFilterChange = (
    filterType: keyof typeof filters,
    value: string,
    checked: boolean,
  ) => {
    const currentValues = filters[filterType] || []
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

  const clearAllFilters = () => {
    setFilters({
      yearPublished: null,
      country: null,
      resourceType: null,
      targetGroup: null,
      theme: null,
      language: null,
    })
  }

  const hasActiveFilters = Object.values(filters).some((filter) => filter && filter.length > 0)

  return (
    <div className="w-full max-w-md bg-white border border-gray-200 rounded-lg shadow-sm">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Filter Resources</h2>
          {hasActiveFilters && (
            <Button variant="outline" size="sm" onClick={clearAllFilters} className="text-sm">
              Clear All
            </Button>
          )}
        </div>
      </div>

      <div className="divide-y divide-gray-200">
        {/* Year Published Filter */}
        <FilterSection title="Year Published">
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {YEAR_RANGE.map((year) => (
              <div key={year} className="flex items-center space-x-2">
                <Checkbox
                  id={`year-${year}`}
                  checked={filters.yearPublished?.includes(year.toString()) || false}
                  onCheckedChange={(checked) =>
                    handleFilterChange('yearPublished', year.toString(), !!checked)
                  }
                />
                <label
                  htmlFor={`year-${year}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {year}
                </label>
              </div>
            ))}
          </div>
        </FilterSection>

        {/* Country Filter */}
        <FilterSection title="Country">
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {COUNTRIES.map((country) => (
              <div key={country} className="flex items-center space-x-2">
                <Checkbox
                  id={`country-${country}`}
                  checked={filters.country?.includes(country) || false}
                  onCheckedChange={(checked) => handleFilterChange('country', country, !!checked)}
                />
                <label
                  htmlFor={`country-${country}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {country}
                </label>
              </div>
            ))}
          </div>
        </FilterSection>

        {/* Resource Type Filter */}
        <FilterSection title="Resource Type">
          <div className="space-y-2">
            {RESOURCE_TYPES.map((type) => (
              <div key={type.value} className="flex items-center space-x-2">
                <Checkbox
                  id={`type-${type.value}`}
                  checked={filters.resourceType?.includes(type.value) || false}
                  onCheckedChange={(checked) =>
                    handleFilterChange('resourceType', type.value, !!checked)
                  }
                />
                <label
                  htmlFor={`type-${type.value}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {type.label}
                </label>
              </div>
            ))}
          </div>
        </FilterSection>

        {/* Target Group Filter */}
        <FilterSection title="Target Group">
          <div className="space-y-2">
            {TARGET_GROUPS.map((group) => (
              <div key={group} className="flex items-center space-x-2">
                <Checkbox
                  id={`target-${group}`}
                  checked={filters.targetGroup?.includes(group) || false}
                  onCheckedChange={(checked) => handleFilterChange('targetGroup', group, !!checked)}
                />
                <label
                  htmlFor={`target-${group}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {group}
                </label>
              </div>
            ))}
          </div>
        </FilterSection>

        {/* Theme Filter */}
        <FilterSection title="Theme">
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {THEMES.map((theme) => (
              <div key={theme} className="flex items-center space-x-2">
                <Checkbox
                  id={`theme-${theme}`}
                  checked={filters.theme?.includes(theme) || false}
                  onCheckedChange={(checked) => handleFilterChange('theme', theme, !!checked)}
                />
                <label
                  htmlFor={`theme-${theme}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {theme}
                </label>
              </div>
            ))}
          </div>
        </FilterSection>

        {/* Language Filter */}
        <FilterSection title="Language">
          <div className="space-y-2">
            {LANGUAGES.map((language) => (
              <div key={language.value} className="flex items-center space-x-2">
                <Checkbox
                  id={`language-${language.value}`}
                  checked={filters.language?.includes(language.value) || false}
                  onCheckedChange={(checked) =>
                    handleFilterChange('language', language.value, !!checked)
                  }
                />
                <label
                  htmlFor={`language-${language.value}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {language.label}
                </label>
              </div>
            ))}
          </div>
        </FilterSection>
      </div>
    </div>
  )
}

export default ResourceFilters
