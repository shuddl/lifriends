"use client"
import { useEffect, useState } from 'react'
import PropertyCard from '@/components/property-card'
import PropertyMap from '@/components/property-map'

interface Property {
  address: string
  price: string
  beds: number
  baths: number
  imageUrl?: string
  url?: string
  lat: number
  lng: number
}

export default function PropertyPage() {
  const [properties, setProperties] = useState<Property[]>([])

  useEffect(() => {
    fetch('/api/property-search?q=90210')
      .then(res => res.json())
      .then(data => {
        setProperties(
          (data.results || []).map((r: any, idx: number) => ({
            address: r.title,
            price: r.content.split('|')[0].trim(),
            beds: Number(r.content.match(/(\d+)bd/)?.[1] || 0),
            baths: Number(r.content.match(/\/(\d+)ba/)?.[1] || 0),
            imageUrl: data.images[idx],
            url: r.url,
            lat: r.lat || 0,
            lng: r.lng || 0
          }))
        )
      })
  }, [])

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">Property Search</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {properties.map((p, idx) => (
          <PropertyCard key={idx} {...p} />
        ))}
      </div>
      <PropertyMap properties={properties} />
    </div>
  )
}
