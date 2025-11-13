/**
 * Example: Localized Resource List Component
 *
 * This demonstrates how to fetch and display localized content
 * from Payload CMS in a Next.js server component.
 */

import { getPayload } from 'payload'
import config from '@/payload.config'
import type { Resource } from '@/payload-types'
import { getSafeLocale, formatDate, t } from '@/lib/i18n'

interface LocalizedResourceListProps {
  locale?: string
}

export default async function LocalizedResourceList({ locale }: LocalizedResourceListProps) {
  // Get safe locale (with fallback)
  const safeLocale = getSafeLocale(locale)

  // Initialize Payload
  const payload = await getPayload({ config })

  // Fetch resources in the specified locale
  const { docs: resources } = await payload.find({
    collection: 'resources',
    locale: safeLocale as any, // Cast to avoid type issues with Payload's locale type
    depth: 2,
    limit: 10,
  })

  return (
    <div>
      <h1>{t('resources', safeLocale)}</h1>
      <p>
        {resources.length} {t('results', safeLocale)}
      </p>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {resources.map((resource) => (
          <ResourceCard key={resource.id} resource={resource} locale={safeLocale} />
        ))}
      </div>

      {resources.length === 0 && <p>{t('noResults', safeLocale)}</p>}
    </div>
  )
}

function ResourceCard({ resource, locale }: { resource: Resource; locale: string }) {
  return (
    <article className="border rounded-lg p-4">
      {/* Title is automatically in the correct locale */}
      <h2 className="text-xl font-bold mb-2">{resource.title}</h2>

      {/* Description is automatically in the correct locale */}
      <p className="text-gray-600 mb-4">{resource.description}</p>

      {/* Non-localized fields work the same */}
      <div className="flex gap-2 flex-wrap mb-4">
        {resource.themes?.map((theme) => (
          <span key={theme} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
            {theme}
          </span>
        ))}
      </div>

      {/* Format date according to locale */}
      {resource.year_published && (
        <p className="text-sm text-gray-500">
          {formatDate(new Date(resource.year_published, 0), locale as any)}
        </p>
      )}

      {/* Download count with localized text */}
      <p className="text-sm text-gray-500 mt-2">
        {resource.download_count || 0} {t('downloadCount', locale as any)}
      </p>

      {/* Link with localized text */}
      <a
        href={resource.link}
        className="text-blue-600 hover:underline mt-2 inline-block"
        target="_blank"
        rel="noopener noreferrer"
      >
        {t('learnMore', locale as any)} →
      </a>
    </article>
  )
}

// Example usage in a page:
// app/[locale]/resources/page.tsx
/*
export default async function ResourcesPage({ 
  params 
}: { 
  params: { locale: string } 
}) {
  return <LocalizedResourceList locale={params.locale} />
}

// Generate static params for all locales
export async function generateStaticParams() {
  return [
    { locale: 'en' },
    { locale: 'fr' },
    { locale: 'es' },
  ]
}
*/
