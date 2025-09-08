# Filter System Implementation

## Overview

The filter system now properly maps between user-friendly labels and database values, ensuring consistency between the collection schema and the frontend filters.

## How it works

### 1. Collection Schema (Resources.ts)

The Resources collection defines select fields with `label` and `value` pairs:

```typescript
{
  name: 'type',
  type: 'select',
  options: [
    { label: 'Research Paper', value: 'academic' },
    { label: 'Case Study', value: 'case_study' },
    // ...
  ]
}
```

### 2. Filter Options Extraction (filter-options.ts)

The `getFilterOptions()` function extracts these mappings from the collection schema:

- Automatically syncs with any changes to the collection
- Provides consistent label-to-value mappings
- Creates bidirectional mapping objects

### 3. Frontend Filters (resource-filters.tsx)

The filter component now:

- Shows labels to users (e.g., "Research Paper")
- Stores values in URL params (e.g., "academic")
- Uses `isValueSelected()` to check if a filter is active
- Converts labels to values when updating filters

### 4. Client-side Filtering (resource-list.tsx)

The resource list component:

- Compares URL filter values with resource data values
- Uses proper mappings for display purposes
- Maintains consistency with database filtering

### 5. Backend Queries (queries/resources.ts)

Backend queries receive the actual database values and can filter directly without conversion.

## Benefits

1. **Consistency**: Labels and values are always in sync with the collection schema
2. **Maintainability**: Changes to labels only need to be made in the collection schema
3. **Flexibility**: Values remain constant while labels can be updated for UX improvements
4. **Type Safety**: TypeScript ensures proper usage of mappings

## Example Flow

1. User sees "Research Paper" in filter UI
2. User selects it, URL stores `resourceType=academic`
3. Client-side filtering compares against `resource.type === 'academic'`
4. Backend queries use `where: { type: { equals: 'academic' } }`
5. Display functions show "Research Paper" using value-to-label mapping

## Files Modified

- `src/lib/filter-options.ts` - New utility for extracting and mapping options
- `src/app/(frontend)/policymakers/_components/resource-filters.tsx` - Updated to use proper mappings
- `src/app/(frontend)/policymakers/_components/resource-list.tsx` - Updated display functions

## Usage Example

```typescript
import { FILTER_MAPPINGS } from '@/lib/filter-options'

// Convert value to label for display
const label = FILTER_MAPPINGS.resourceType.valueToLabel['academic'] // "Research Paper"

// Convert label to value for filtering
const value = FILTER_MAPPINGS.resourceType.labelToValue['Research Paper'] // "academic"
```
