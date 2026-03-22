import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ExternalLink, MapPin } from 'lucide-react'
import useTilt from '../hooks/useTilt'
import StarRating from './StarRating'
import CategoryBadge from './CategoryBadge'

export default function LocationCard({ id, name, category, address, rating, reviewCount, photoUrl }) {
  const navigate = useNavigate()
  const { ref, style, onMouseMove, onMouseLeave } = useTilt()

  const defaultPhoto = `https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=60`

  return (
    <motion.div
      ref={ref}
      style={style}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="glass-card overflow-hidden group cursor-pointer h-full flex flex-col"
      onClick={() => navigate(`/location/${id}`)}
    >
      <div className="relative h-48 w-full overflow-hidden">
        <img 
          src={photoUrl || defaultPhoto} 
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute top-4 left-4">
          <CategoryBadge category={category} />
        </div>
      </div>
      
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="font-display font-bold text-lg leading-tight mb-2 group-hover:text-indigo transition-colors">
          {name}
        </h3>
        
        <div className="mb-3">
          <StarRating rating={rating} count={reviewCount} />
        </div>
        
        <div className="flex items-start space-x-2 text-muted text-sm mb-6 flex-grow">
          <MapPin size={16} className="mt-0.5 flex-shrink-0" />
          <p className="line-clamp-2">{address}</p>
        </div>
        
        <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
          <span className="text-xs font-semibold text-indigo uppercase tracking-widest">Details</span>
          <ExternalLink size={14} className="text-indigo" />
        </div>
      </div>
    </motion.div>
  )
}
