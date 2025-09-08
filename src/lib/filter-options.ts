import { Resources } from '@/collections/Resources'
import type { SelectField } from 'payload'

/**
 * This file extracts filter options from the Resources collection schema
 * and provides utilities for converting between labels and values.
 *
 * Usage:
 * 1. Frontend filters show labels to users but store values in URL params
 * 2. Backend queries use the actual database values
 * 3. Mappings help convert between labels and values for display purposes
 *
 * Example:
 * - User selects "Research Paper" (label)
 * - Filter stores "academic" (value) in URL
 * - Backend queries use "academic" for database filtering
 * - Display functions use mapping to show "Research Paper" back to user
 */

// Extract filter options from the Resources collection schema
export function getFilterOptions() {
  const fields = Resources.fields

  // Helper function to extract options from a select field
  const extractOptions = (fieldName: string) => {
    const field = fields.find((f) => 'name' in f && f.name === fieldName) as SelectField
    if (!field || !field.options) return []

    return field.options.map((option) => {
      // Handle both string and object option formats
      if (typeof option === 'string') {
        return { label: option, value: option }
      }

      // Ensure label is a string (in case it's a React element, convert to string)
      const label = typeof option.label === 'string' ? option.label : String(option.label)

      return {
        label,
        value: option.value,
      }
    })
  }

  // Extract options for each filter type
  const resourceTypes = extractOptions('type')
  const themes = extractOptions('themes')
  const targetGroups = extractOptions('target_groups')
  const languages = extractOptions('language')
  const countries = extractOptions('countries')
  const publishers = extractOptions('publisher')
  const regions = extractOptions('region')

  // Year range for Year Published filter
  const yearRange = Array.from({ length: 25 }, (_, i) => {
    const year = new Date().getFullYear() - i
    return {
      label: year.toString(),
      value: year.toString(),
    }
  })

  // Good practice options (extracted from radio field)
  const goodPracticeField = fields.find((f) => 'name' in f && f.name === 'good_practice') as any
  const goodPracticeOptions = goodPracticeField?.options || [
    { label: 'Yes', value: 'yes' },
    { label: 'No', value: 'no' },
  ]

  return {
    resourceTypes,
    themes,
    targetGroups,
    languages,
    countries,
    publishers,
    regions,
    yearRange,
    goodPracticeOptions,
  }
}

// Create mapping objects for easy value-to-label and label-to-value conversion
export function createFilterMappings() {
  const options = getFilterOptions()

  const createMapping = (items: Array<{ label: string; value: string }>) => ({
    valueToLabel: Object.fromEntries(items.map((item) => [item.value, item.label])),
    labelToValue: Object.fromEntries(items.map((item) => [item.label, item.value])),
  })

  return {
    resourceType: createMapping(options.resourceTypes),
    theme: createMapping(options.themes),
    targetGroup: createMapping(options.targetGroups),
    language: createMapping(options.languages),
    country: createMapping(options.countries),
    publisher: createMapping(options.publishers),
    region: createMapping(options.regions),
    yearPublished: createMapping(options.yearRange),
    goodPractice: createMapping(options.goodPracticeOptions),
  }
}

// Convert filter values from URL params to database field names and values
export function convertFiltersToQuery(filters: Record<string, any>) {
  const mappings = createFilterMappings()
  const converted: Record<string, any> = {}

  // Handle search - no conversion needed
  if (filters.search) {
    converted.search = filters.search
  }

  // Handle good practice - convert true to 'yes' for database query
  if (filters.goodPractice === true) {
    converted.good_practice = 'yes'
  }

  // Handle array filters - values are already in database format
  const arrayFilters = [
    'yearPublished',
    'country',
    'resourceType',
    'targetGroup',
    'theme',
    'language',
  ]

  arrayFilters.forEach((filterKey) => {
    if (filters[filterKey] && Array.isArray(filters[filterKey])) {
      // Map frontend filter names to backend field names
      const fieldNameMap: Record<string, string> = {
        yearPublished: 'year_published',
        country: 'countries',
        resourceType: 'type',
        targetGroup: 'target_groups',
        theme: 'themes',
        language: 'language',
      }

      const backendFieldName = fieldNameMap[filterKey] || filterKey
      converted[backendFieldName] = filters[filterKey]
    }
  })

  return converted
}

// Export the options for direct use
export const FILTER_OPTIONS = getFilterOptions()
export const FILTER_MAPPINGS = createFilterMappings()
