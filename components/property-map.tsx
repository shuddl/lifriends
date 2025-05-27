'use client'

interface Property {
  address: string
  lat: number
  lng: number
}

interface PropertyMapProps {
  properties: Property[]
}

export default function PropertyMap({ properties }: PropertyMapProps) {
  if (properties.length === 0) return null
  const center = properties[0]
  const markers = properties
    .map(p => `markers=color:red%7C${p.lat},${p.lng}`)
    .join('&')
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY
  const keyParam = apiKey ? `&key=${apiKey}` : ''
  const src = `https://maps.googleapis.com/maps/api/staticmap?zoom=12&size=600x300&${markers}&center=${center.lat},${center.lng}${keyParam}`

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt="Map" className="w-full rounded-md" />
  )
}
