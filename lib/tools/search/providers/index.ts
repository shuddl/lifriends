import { SearchProvider } from './base'
import { ExaSearchProvider } from './exa'
import { SearXNGSearchProvider } from './searxng'
import { TavilySearchProvider } from './tavily'
import { RealEstateSearchProvider } from './realestate'

export type SearchProviderType = 'tavily' | 'exa' | 'searxng' | 'realestate'
export const DEFAULT_PROVIDER: SearchProviderType = 'tavily'

export function createSearchProvider(type?: SearchProviderType): SearchProvider {
  const providerType = type || (process.env.SEARCH_API as SearchProviderType) || DEFAULT_PROVIDER
  
  switch (providerType) {
    case 'tavily':
      return new TavilySearchProvider()
    case 'exa':
      return new ExaSearchProvider()
    case 'searxng':
      return new SearXNGSearchProvider()
    case 'realestate':
      return new RealEstateSearchProvider()
    default:
      // Default to TavilySearchProvider if an unknown provider is specified
      return new TavilySearchProvider()
  }
}

export type { ExaSearchProvider } from './exa'
export { SearXNGSearchProvider } from './searxng'
export { TavilySearchProvider } from './tavily'
export { RealEstateSearchProvider } from './realestate'
export type { SearchProvider }

