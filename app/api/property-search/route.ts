import { NextResponse } from 'next/server'
import { RealEstateSearchProvider } from '@/lib/tools/search/providers/realestate'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const q = searchParams.get('q') || ''
  const provider = new RealEstateSearchProvider()
  const results = await provider.search(q)
  return NextResponse.json(results)
}

export async function POST(req: Request) {
  const { query, maxResults = 10 } = await req.json()
  const provider = new RealEstateSearchProvider()
  const results = await provider.search(query, maxResults)
  return NextResponse.json(results)
}
