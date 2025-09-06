import { NextRequest, NextResponse } from 'next/server'
import {
  getResourcesPaginated,
  type ResourceFilters,
  type PaginationParams,
} from '@/lib/queries/resources'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)

    // Extract pagination parameters
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '12')

    // Extract filter parameters
    const filters: ResourceFilters = {}

    if (searchParams.get('search')) {
      filters.search = searchParams.get('search')!
    }

    if (searchParams.get('type')) {
      const types = searchParams.getAll('type')
      filters.type = types.length > 1 ? types : types[0]
    }

    if (searchParams.get('theme')) {
      const themes = searchParams.getAll('theme')
      filters.theme = themes.length > 1 ? themes : themes[0]
    }

    if (searchParams.get('language')) {
      const languages = searchParams.getAll('language')
      filters.language = languages.length > 1 ? languages : languages[0]
    }

    if (searchParams.get('country')) {
      const countries = searchParams.getAll('country')
      filters.country = countries.length > 1 ? countries : countries[0]
    }

    if (searchParams.get('targetGroup')) {
      const targetGroups = searchParams.getAll('targetGroup')
      filters.targetGroup = targetGroups.length > 1 ? targetGroups : targetGroups[0]
    }

    if (searchParams.get('yearPublished')) {
      const years = searchParams.getAll('yearPublished').map((y) => parseInt(y))
      filters.yearPublished = years.length > 1 ? years : years[0]
    }

    if (searchParams.get('goodPractice')) {
      filters.goodPractice = searchParams.get('goodPractice') as 'yes' | 'no'
    }

    const pagination: PaginationParams = { page, limit }

    const result = await getResourcesPaginated(filters, pagination)

    return NextResponse.json(result)
  } catch (error) {
    console.error('Error fetching resources:', error)
    return NextResponse.json({ error: 'Failed to fetch resources' }, { status: 500 })
  }
}
