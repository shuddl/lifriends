'use client'

interface PropertyCardProps {
  address: string
  price: string
  beds: number
  baths: number
  imageUrl?: string
  url?: string
}

export default function PropertyCard({
  address,
  price,
  beds,
  baths,
  imageUrl,
  url
}: PropertyCardProps) {
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className="block">
      <div className="border rounded-md overflow-hidden shadow-sm hover:shadow transition">
        {imageUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={imageUrl} alt={address} className="w-full h-40 object-cover" />
        )}
        <div className="p-2 space-y-1">
          <p className="font-medium truncate" title={address}>
            {address}
          </p>
          <p className="text-sm text-muted-foreground">{price}</p>
          <p className="text-sm text-muted-foreground">
            {beds} bd / {baths} ba
          </p>
        </div>
      </div>
    </a>
  )
}
