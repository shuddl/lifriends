import { SearchResults } from '@/lib/types'
import { BaseSearchProvider } from './base'

/**
 * RealEstateSearchProvider integrates with a real estate listings API.
 * The API URL and key are configured via REALESTATE_API_URL and REALESTATE_API_KEY.
 */
export class RealEstateSearchProvider extends BaseSearchProvider {
  async search(
    query: string,
    maxResults: number = 10,
    _searchDepth: 'basic' | 'advanced' = 'basic',
    _includeDomains: string[] = [],
    _excludeDomains: string[] = []
  ): Promise<SearchResults> {
    const apiKey = process.env.REALESTATE_API_KEY
    const apiUrl = process.env.REALESTATE_API_URL
    this.validateApiKey(apiKey, 'REALESTATE')
    this.validateApiUrl(apiUrl, 'REALESTATE')

    const response = await fetch(`${apiUrl}/search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({ query, limit: maxResults })
    })

    if (!response.ok) {
      throw new Error(`RealEstate API error: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    const results = (data.properties || []).map((prop: any) => ({
      title: prop.address,
      url: prop.url,
      content: `${prop.price} | ${prop.beds}bd/${prop.baths}ba`
    }))

    return {
      results,
      images: (data.properties || []).map((prop: any) => prop.imageUrl).filter(Boolean),
      query,
      number_of_results: results.length
    }
  }
}
