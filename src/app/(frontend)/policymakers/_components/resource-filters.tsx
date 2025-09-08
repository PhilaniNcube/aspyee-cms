'use client'

import React from 'react'
import { useQueryStates, parseAsArrayOf, parseAsString, parseAsBoolean } from 'nuqs'
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
import { Switch } from '@/components/ui/switch'
import { FILTER_OPTIONS, FILTER_MAPPINGS } from '@/lib/filter-options'

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
    <AccordionItem value={value} className="border-none cursor-pointer  shadow">
      <AccordionTrigger className="px-4 py-3 text-left  font-semibold text-gray-900 hover:bg-brand-orange rounded-none transition-colors duration-200 hover:no-underline">
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
    goodPractice: parseAsBoolean,
  })

  // Helper function to convert label to value for filtering
  const getLabelToValueConverter = (filterType: string) => {
    switch (filterType) {
      case 'resourceType':
        return FILTER_MAPPINGS.resourceType.labelToValue
      case 'theme':
        return FILTER_MAPPINGS.theme.labelToValue
      case 'targetGroup':
        return FILTER_MAPPINGS.targetGroup.labelToValue
      case 'language':
        return FILTER_MAPPINGS.language.labelToValue
      case 'country':
        return FILTER_MAPPINGS.country.labelToValue
      case 'yearPublished':
        return FILTER_MAPPINGS.yearPublished.labelToValue
      default:
        return {}
    }
  }

  // Helper function to convert value to label for display
  const getValueToLabelConverter = (filterType: string) => {
    switch (filterType) {
      case 'resourceType':
        return FILTER_MAPPINGS.resourceType.valueToLabel
      case 'theme':
        return FILTER_MAPPINGS.theme.valueToLabel
      case 'targetGroup':
        return FILTER_MAPPINGS.targetGroup.valueToLabel
      case 'language':
        return FILTER_MAPPINGS.language.valueToLabel
      case 'country':
        return FILTER_MAPPINGS.country.valueToLabel
      case 'yearPublished':
        return FILTER_MAPPINGS.yearPublished.valueToLabel
      default:
        return {}
    }
  }

  // Check if a value is selected based on the actual stored values
  const isValueSelected = (filterType: keyof typeof filters, label: string): boolean => {
    const currentValues = (filters[filterType] as string[]) || []
    const labelToValue = getLabelToValueConverter(filterType as string)
    const actualValue = labelToValue[label] || label
    return currentValues.includes(actualValue)
  }

  const handleFilterChange = (
    filterType: keyof typeof filters,
    label: string,
    checked: boolean,
  ) => {
    if (filterType === 'search') {
      setFilters({
        ...filters,
        search: checked ? label : null,
      })
      return
    }

    const currentValues = (filters[filterType] as string[]) || []
    const labelToValue = getLabelToValueConverter(filterType as string)
    const actualValue = labelToValue[label] || label // Fallback to label if no mapping exists

    let newValues: string[]

    if (checked) {
      newValues = [...currentValues, actualValue]
    } else {
      newValues = currentValues.filter((v) => v !== actualValue)
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
      goodPractice: null,
    })
  }

  const hasActiveFilters = Object.entries(filters).some(([key, filter]) => {
    if (key === 'goodPractice') {
      return filter === true
    }
    return (
      filter &&
      (Array.isArray(filter) ? filter.length > 0 : typeof filter === 'string' && filter.length > 0)
    )
  })

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

        {/* Good Practice Toggle */}
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <label htmlFor="good-practice-toggle" className="text-sm font-medium text-gray-900">
              Good Practice Only
            </label>
            <Switch
              id="good-practice-toggle"
              checked={filters.goodPractice === true}
              onCheckedChange={(checked) =>
                setFilters({
                  ...filters,
                  goodPractice: checked ? true : null,
                })
              }
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">Show only resources marked as good practices</p>
        </div>

        <Accordion type="multiple" className="w-full grid grid-cols-1 gap-4">
          {/* Year Published Filter */}
          <FilterSection title="Year Published" value="year-published">
            <div className="space-y-1 max-h-48 bg-amber-300 overflow-y-auto scrollbar-hide px-0">
              {FILTER_OPTIONS.yearRange.map((year) => (
                <FilterItem
                  key={year.value}
                  id={`year-${year.value}`}
                  label={year.label}
                  checked={isValueSelected('yearPublished', year.label)}
                  onToggle={() =>
                    handleFilterChange(
                      'yearPublished',
                      year.label,
                      !isValueSelected('yearPublished', year.label),
                    )
                  }
                />
              ))}
            </div>
          </FilterSection>

          {/* Country Filter */}
          <FilterSection title="Country" value="country">
            <div className="space-y-1 max-h-48 overflow-y-auto scrollbar-hide">
              {FILTER_OPTIONS.countries.map((country) => (
                <FilterItem
                  key={country.value}
                  id={`country-${country.value}`}
                  label={country.label}
                  checked={isValueSelected('country', country.label)}
                  onToggle={() =>
                    handleFilterChange(
                      'country',
                      country.label,
                      !isValueSelected('country', country.label),
                    )
                  }
                />
              ))}
            </div>
          </FilterSection>

          {/* Resource Type Filter */}
          <FilterSection title="Resource Type" value="resource-type">
            <div className="space-y-1">
              {FILTER_OPTIONS.resourceTypes.map((type) => (
                <FilterItem
                  key={type.value}
                  id={`type-${type.value}`}
                  label={type.label}
                  checked={isValueSelected('resourceType', type.label)}
                  onToggle={() =>
                    handleFilterChange(
                      'resourceType',
                      type.label,
                      !isValueSelected('resourceType', type.label),
                    )
                  }
                />
              ))}
            </div>
          </FilterSection>

          {/* Target Group Filter */}
          <FilterSection title="Target Group" value="target-group">
            <div className="space-y-1">
              {FILTER_OPTIONS.targetGroups.map((group) => (
                <FilterItem
                  key={group.value}
                  id={`target-${group.value}`}
                  label={group.label}
                  checked={isValueSelected('targetGroup', group.label)}
                  onToggle={() =>
                    handleFilterChange(
                      'targetGroup',
                      group.label,
                      !isValueSelected('targetGroup', group.label),
                    )
                  }
                />
              ))}
            </div>
          </FilterSection>

          {/* Theme Filter */}
          <FilterSection title="Theme" value="theme">
            <div className="space-y-1 max-h-48 overflow-y-auto scrollbar-hide">
              {FILTER_OPTIONS.themes.map((theme) => (
                <FilterItem
                  key={theme.value}
                  id={`theme-${theme.value}`}
                  label={theme.label}
                  checked={isValueSelected('theme', theme.label)}
                  onToggle={() =>
                    handleFilterChange('theme', theme.label, !isValueSelected('theme', theme.label))
                  }
                />
              ))}
            </div>
          </FilterSection>

          {/* Language Filter */}
          <FilterSection title="Language" value="language">
            <div className="space-y-1">
              {FILTER_OPTIONS.languages.map((language) => (
                <FilterItem
                  key={language.value}
                  id={`language-${language.value}`}
                  label={language.label}
                  checked={isValueSelected('language', language.label)}
                  onToggle={() =>
                    handleFilterChange(
                      'language',
                      language.label,
                      !isValueSelected('language', language.label),
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
