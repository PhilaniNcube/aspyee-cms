# Resource Filters with nuqs

This implementation provides a comprehensive client-side filtering system for resources using the `nuqs` library for URL state management.

## Features

### URL State Management

- All filter states are synchronized with URL parameters
- Users can bookmark and share filtered views
- Browser back/forward navigation works correctly
- SSR-compatible with Next.js App Router

### Filter Categories

Based on your Resources collection schema:

1. **Year Published** - Filterable by publication year
2. **Country** - Multi-select from all African countries
3. **Resource Type** - Academic papers, case studies, frameworks, etc.
4. **Target Group** - Policymakers, educators, youth, etc.
5. **Theme** - Various skill development themes
6. **Language** - English, French, Portuguese, Arabic, Other

### UI Components

- **Collapsible Sections**: Each filter category can be expanded/collapsed
- **Checkboxes**: Multiple selections within each category
- **Clear All**: Reset all filters at once
- **Active Count**: Shows filtered vs total resources
- **Responsive**: Works on mobile and desktop

## Files Created

### `resource-filters.tsx`

The main filter component that:

- Uses `useQueryStates` from nuqs for URL synchronization
- Renders collapsible filter sections
- Handles checkbox state management
- Provides filter change callbacks

### `resource-list.tsx`

The resource display component that:

- Receives initial resources from server
- Applies client-side filtering based on URL state
- Renders filtered results in a grid
- Shows resource details and metadata

## Usage

The filter state is automatically managed in the URL with parameters like:

```
/policymakers?resourceType=academic,policy&theme=Gender%20and%20Transformation&country=Ghana,Nigeria
```

## Dependencies Added

- `nuqs` - For URL state management
- Existing shadcn/ui components (Collapsible, Checkbox, Button)

## Integration

The components are integrated into the policymakers page with:

1. NuqsAdapter in the layout for SSR support
2. Server-side data fetching for initial resources
3. Client-side filtering for real-time updates
