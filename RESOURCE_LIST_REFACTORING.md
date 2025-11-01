# Resource List Component Refactoring for Cache Components

## Overview

The `ResourceList` component has been refactored to support Next.js 16 Cache Components. The refactoring separates data fetching (server) from interactivity (client), enabling efficient caching.

## Architecture

### Before (Coupled Architecture)
```
Page Component (Server)
  ├─ Fetches data
  └─ Passes data to ResourceList (Client Component)
     └─ Handles filtering and pagination
```

### After (Separated Architecture)
```
Page Component (Server)
  └─ ResourceList (Server Component with Suspense)
     ├─ ResourceListServer (Server Component - Fetches data)
     │  └─ Can be cached with "use cache" directive
     └─ ResourceListClient (Client Component)
        └─ Handles filtering and pagination
```

## Files Modified

### 1. New Server Component: `resource-list.tsx`
- **Location**: `src/app/(frontend)/policymakers/_components/resource-list.tsx`
- **Type**: Server Component (default export with Suspense boundary)
- **Purpose**: 
  - Wraps data fetching in a Server Component
  - Provides Suspense boundary with loading fallback
  - Ready for Cache Components ("use cache" directive)

### 2. Renamed Client Component: `resource-list-client.tsx`
- **Location**: `src/app/(frontend)/policymakers/_components/resource-list-client.tsx`
- **Type**: Client Component (`'use client'`)
- **Purpose**:
  - Handles all client-side interactivity
  - URL state management with `nuqs`
  - Client-side filtering and pagination
  - Interactive UI elements

### 3. Updated Pages (All target groups)
- `src/app/(frontend)/policymakers/page.tsx`
- `src/app/(frontend)/youth/page.tsx`
- `src/app/(frontend)/educators/page.tsx`
- `src/app/(frontend)/researchers/page.tsx`
- `src/app/(frontend)/private-sector/page.tsx`

**Changes**:
- Removed data fetching logic from pages
- Removed `searchParams` prop (filtering now handled client-side via URL)
- Simplified to just render the `ResourceList` component with props

## Benefits

### 1. **Cache Components Ready**
The server component can now be cached using Next.js 16 Cache Components:
```tsx
"use cache"
async function ResourceListServer({ title, targetGroup }) {
  const resources = await queryFunction({ page: 1, limit: 1000 })
  return <ResourceListClient initialResources={resources.docs} />
}
```

### 2. **Better Performance**
- Data fetching happens once and can be cached
- Client-side filtering is instant (no server roundtrips)
- Suspense boundaries enable streaming and parallel rendering

### 3. **Improved Developer Experience**
- Clear separation of concerns
- Pages are simpler and cleaner
- Component is reusable across all target groups

### 4. **Better User Experience**
- Instant filtering without page reloads
- Smooth loading states with Suspense
- URL-based state (shareable filter states)

## Enabling Cache Components

### Step 1: Update next.config.js
```javascript
const nextConfig = {
  experimental: {
    cacheComponents: true, // Enable Cache Components
  },
  // ... other config
}
```

### Step 2: Add "use cache" directive
In `src/app/(frontend)/policymakers/_components/resource-list.tsx`:

```tsx
/**
 * Server Component that fetches resources based on target group
 */
"use cache" // Add this line
async function ResourceListServer({ title = 'Resources', targetGroup }) {
  // ... existing code
}
```

### Step 3: Optional - Configure cache profiles
```javascript
// next.config.js
const nextConfig = {
  experimental: {
    cacheComponents: true,
  },
  cacheLife: {
    resources: {
      stale: 3600,      // 1 hour
      revalidate: 86400, // 24 hours
      expire: 604800,    // 7 days
    },
  },
}
```

Then use it:
```tsx
"use cache: resources"
async function ResourceListServer({ title, targetGroup }) {
  // ... code
}
```

## Cache Invalidation

If you need to invalidate the cache when resources are updated:

```tsx
import { revalidateTag } from 'next/cache'

// In your admin/API route after resource update:
revalidateTag('resources')
```

And tag your cache:
```tsx
"use cache"
async function ResourceListServer({ title, targetGroup }) {
  const resources = await queryFunction({ page: 1, limit: 1000 })
  cacheTag('resources') // Tag this cache entry
  return <ResourceListClient initialResources={resources.docs} />
}
```

## Migration Path

### Current State (✅ Complete)
- ✅ Component refactored with Suspense boundary
- ✅ Data fetching moved to server component
- ✅ Client-side filtering working
- ✅ All pages updated
- ✅ No breaking changes - app works as before

### Next Steps (When Ready)
1. Enable `experimental.cacheComponents` in `next.config.js`
2. Add `"use cache"` directive to `ResourceListServer`
3. Test caching behavior
4. Add cache tags for invalidation
5. Configure cache profiles if needed

## Testing

To verify the refactoring works:

1. **Start dev server**:
   ```bash
   pnpm run dev
   ```

2. **Test each page**:
   - http://localhost:3000/policymakers
   - http://localhost:3000/youth
   - http://localhost:3000/educators
   - http://localhost:3000/researchers
   - http://localhost:3000/private-sector

3. **Test filtering**:
   - Use the filters sidebar
   - Verify URL updates with filter params
   - Verify instant filtering (no page reload)
   - Share a URL with filters - verify filters are applied

4. **Test pagination**:
   - Navigate through pages
   - Verify URL updates with page number
   - Verify smooth transitions

## Rollback Plan

If you need to rollback:

1. Restore the old files from git:
   ```bash
   git checkout HEAD -- src/app/(frontend)/policymakers/_components/resource-list.tsx
   git checkout HEAD -- src/app/(frontend)/policymakers/page.tsx
   # ... repeat for other pages
   ```

2. Or keep the refactored structure (it's backward compatible) and just don't enable Cache Components.

## Notes

- The refactoring is **backward compatible** - the app works exactly as before
- Client-side filtering means all resources are loaded upfront (1000 limit)
- For very large datasets (>1000 resources), consider server-side pagination
- Cache Components is experimental in Next.js 16.0.x but stable in later versions
- The Suspense boundary provides automatic loading states

## Questions?

This refactoring follows Next.js 16 best practices for:
- Server Components for data fetching
- Client Components for interactivity
- Suspense boundaries for loading states
- Cache Components for performance optimization
