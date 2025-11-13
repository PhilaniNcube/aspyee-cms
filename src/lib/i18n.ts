/**
 * Internationalization utilities for Payload CMS
 *
 * These utilities help manage localized content throughout the application.
 */

import type { Locale } from 'payload'

// Define supported locales
export const locales = ['en', 'fr', 'es'] as const
export type SupportedLocale = (typeof locales)[number]

export const defaultLocale: SupportedLocale = 'en'

// Locale configuration
export const localeConfig: Record<SupportedLocale, { label: string; flag: string }> = {
  en: { label: 'English', flag: '🇬🇧' },
  fr: { label: 'Français', flag: '🇫🇷' },
  es: { label: 'Español', flag: '🇪🇸' },
}

/**
 * Validates if a locale is supported
 */
export function isSupportedLocale(locale: string): locale is SupportedLocale {
  return locales.includes(locale as SupportedLocale)
}

/**
 * Gets a safe locale, falling back to default if invalid
 */
export function getSafeLocale(locale: string | undefined): SupportedLocale {
  if (!locale) return defaultLocale
  return isSupportedLocale(locale) ? locale : defaultLocale
}

/**
 * Gets the locale from URL pathname
 * e.g., /fr/resources -> 'fr'
 */
export function getLocaleFromPathname(pathname: string): SupportedLocale {
  const segments = pathname.split('/').filter(Boolean)
  const firstSegment = segments[0]

  if (firstSegment && isSupportedLocale(firstSegment)) {
    return firstSegment
  }

  return defaultLocale
}

/**
 * Adds locale prefix to a path
 * e.g., addLocaleToPath('/resources', 'fr') -> '/fr/resources'
 */
export function addLocaleToPath(path: string, locale: SupportedLocale): string {
  // Don't add locale prefix for default locale (optional - depends on your routing strategy)
  // if (locale === defaultLocale) return path

  const cleanPath = path.startsWith('/') ? path : `/${path}`
  return `/${locale}${cleanPath}`
}

/**
 * Removes locale prefix from a path
 * e.g., removeLocaleFromPath('/fr/resources') -> '/resources'
 */
export function removeLocaleFromPath(path: string): string {
  const segments = path.split('/').filter(Boolean)
  if (segments[0] && isSupportedLocale(segments[0])) {
    return '/' + segments.slice(1).join('/')
  }
  return path
}

/**
 * Gets alternate locale URLs for SEO hreflang tags
 */
export function getAlternateUrls(pathname: string): Record<SupportedLocale, string> {
  const pathWithoutLocale = removeLocaleFromPath(pathname)

  return locales.reduce(
    (acc, locale) => {
      acc[locale] = addLocaleToPath(pathWithoutLocale, locale)
      return acc
    },
    {} as Record<SupportedLocale, string>,
  )
}

/**
 * Type guard for localized field
 */
export type LocalizedField<T> = {
  [K in SupportedLocale]?: T
}

/**
 * Gets value from a localized field with fallback
 */
export function getLocalizedValue<T>(
  field: T | LocalizedField<T> | undefined,
  locale: SupportedLocale,
): T | undefined {
  if (!field) return undefined

  // If field is not an object or doesn't have locale keys, return as-is
  if (typeof field !== 'object' || field === null) {
    return field as T
  }

  const localizedField = field as LocalizedField<T>

  // Try requested locale
  if (locale in localizedField && localizedField[locale] !== undefined) {
    return localizedField[locale]
  }

  // Fallback to default locale
  if (defaultLocale in localizedField && localizedField[defaultLocale] !== undefined) {
    return localizedField[defaultLocale]
  }

  // Return first available value
  const firstValue = Object.values(localizedField).find((v) => v !== undefined)
  return firstValue as T | undefined
}

/**
 * Formats date according to locale
 */
export function formatDate(date: string | Date, locale: SupportedLocale): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date

  return dateObj.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

/**
 * Formats number according to locale
 */
export function formatNumber(num: number, locale: SupportedLocale): string {
  return num.toLocaleString(locale)
}

/**
 * Common translations for UI elements
 * You might want to move this to a separate translations file
 */
export const translations: Record<SupportedLocale, Record<string, string>> = {
  en: {
    readMore: 'Read More',
    learnMore: 'Learn More',
    downloadCount: 'downloads',
    publishedOn: 'Published on',
    categories: 'Categories',
    tags: 'Tags',
    author: 'Author',
    relatedContent: 'Related Content',
    backToList: 'Back to List',
    search: 'Search',
    filter: 'Filter',
    results: 'results',
    noResults: 'No results found',
    loading: 'Loading...',
  },
  fr: {
    readMore: 'Lire Plus',
    learnMore: 'En Savoir Plus',
    downloadCount: 'téléchargements',
    publishedOn: 'Publié le',
    categories: 'Catégories',
    tags: 'Étiquettes',
    author: 'Auteur',
    relatedContent: 'Contenu Connexe',
    backToList: 'Retour à la Liste',
    search: 'Rechercher',
    filter: 'Filtrer',
    results: 'résultats',
    noResults: 'Aucun résultat trouvé',
    loading: 'Chargement...',
  },
  es: {
    readMore: 'Leer Más',
    learnMore: 'Aprende Más',
    downloadCount: 'descargas',
    publishedOn: 'Publicado el',
    categories: 'Categorías',
    tags: 'Etiquetas',
    author: 'Autor',
    relatedContent: 'Contenido Relacionado',
    backToList: 'Volver a la Lista',
    search: 'Buscar',
    filter: 'Filtrar',
    results: 'resultados',
    noResults: 'No se encontraron resultados',
    loading: 'Cargando...',
  },
}

/**
 * Gets a translation for a key
 */
export function t(key: string, locale: SupportedLocale): string {
  return translations[locale]?.[key] || translations[defaultLocale]?.[key] || key
}
