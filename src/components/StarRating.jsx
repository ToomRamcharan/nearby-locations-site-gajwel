import { Star, StarHalf } from 'lucide-react'

export default function StarRating({ rating, count }) {
  const fullStars = Math.floor(rating || 0)
  const hasHalfStar = (rating || 0) % 1 >= 0.5

  return (
    <div className="flex items-center space-x-1">
      {[...Array(5)].map((_, i) => {
        if (i < fullStars) return <Star key={i} size={14} className="fill-indigo text-indigo" />
        if (i === fullStars && hasHalfStar) return <StarHalf key={i} size={14} className="fill-indigo text-indigo" />
        return <Star key={i} size={14} className="text-muted opacity-30" />
      })}
      <span className="text-xs text-muted ml-1">({count || 0})</span>
    </div>
  )
}
