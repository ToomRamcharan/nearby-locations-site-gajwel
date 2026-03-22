import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  ArrowLeft, 
  MapPin, 
  Phone, 
  Globe, 
  Clock, 
  Navigation,
  Share2,
  Heart
} from 'lucide-react'
import { loadLocations } from '../utils/dataLoader'
import StarRating from '../components/StarRating'
import CategoryBadge from '../components/CategoryBadge'
import LocationCard from '../components/LocationCard'

export default function LocationDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [location, setLocation] = useState(null)
  const [related, setRelated] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    window.scrollTo(0, 0)
    loadLocations().then(data => {
      const found = data.find(l => l.placeId === id)
      if (found) {
        setLocation(found)
        // Get related
        const sameCat = data.filter(l => l.category === found.category && l.placeId !== id)
        setRelated(sameCat.slice(0, 3))
      }
      setLoading(false)
    })
  }, [id])

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  if (!location) return <div className="min-h-screen flex items-center justify-center">Location not found</div>

  const defaultPhoto = `https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&auto=format&fit=crop&q=80`

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="pt-24 pb-24"
    >
      <div className="container mx-auto px-6">
        <button 
          onClick={() => navigate(-1)}
          className="mb-8 flex items-center space-x-2 text-muted hover:text-white transition-colors group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-bold uppercase tracking-widest">Back to Results</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            <div className="relative h-[400px] md:h-[500px] rounded-[32px] overflow-hidden shadow-2xl">
              <img 
                src={location.photoUrl || defaultPhoto} 
                className="w-full h-full object-cover"
                alt={location.name}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-8 left-8 right-8 flex items-end justify-between">
                <div>
                  <CategoryBadge category={location.category} />
                  <h1 className="font-display text-4xl md:text-5xl font-black mt-4 tracking-tight">{location.name}</h1>
                </div>
                <div className="flex space-x-3">
                  <button className="glass-card p-4 hover:bg-white/10 transition-colors">
                    <Heart size={20} className="text-white" />
                  </button>
                  <button className="glass-card p-4 hover:bg-white/10 transition-colors">
                    <Share2 size={20} className="text-white" />
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-8">
                <section>
                  <h3 className="text-xs font-bold text-muted uppercase tracking-widest mb-4">About</h3>
                  <div className="glass-card p-6 space-y-4 font-medium text-gray-300">
                    <StarRating rating={location.rating} count={location.reviewCount} />
                    <div className="flex items-start space-x-3">
                      <MapPin size={20} className="text-indigo flex-shrink-0 mt-0.5" />
                      <p>{location.address}</p>
                    </div>
                  </div>
                </section>

                <div className="flex flex-wrap gap-4">
                  {location.phone && (
                    <a href={`tel:${location.phone}`} className="flex-grow glass-card p-4 flex items-center justify-center space-x-2 hover:bg-indigo/10 border-indigo/20 transition-all font-bold">
                      <Phone size={18} />
                      <span>Call Now</span>
                    </a>
                  )}
                  {location.website && (
                    <a href={location.website} target="_blank" rel="noopener noreferrer" className="flex-grow glass-card p-4 flex items-center justify-center space-x-2 hover:bg-indigo/10 border-indigo/20 transition-all font-bold">
                      <Globe size={18} />
                      <span>Website</span>
                    </a>
                  )}
                </div>
              </div>

              <div className="space-y-8">
                <section>
                  <h3 className="text-xs font-bold text-muted uppercase tracking-widest mb-4">Opening Hours</h3>
                  <div className="glass-card p-6 divide-y divide-white/5 font-medium text-sm">
                    {Object.entries(location.hours || { "Default": "Open 24 Hours" }).map(([day, time]) => (
                      <div key={day} className="flex justify-between py-3">
                        <span className="text-gray-400">{day}</span>
                        <span className="text-white">{time}</span>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            </div>
          </div>

          {/* Map and Related */}
          <div className="space-y-12">
            <section>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xs font-bold text-muted uppercase tracking-widest">Location</h3>
                <a href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(location.address)}`} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-1 text-indigo text-[10px] font-black uppercase tracking-widest">
                  <Navigation size={12} />
                  <span>Get Directions</span>
                </a>
              </div>
              <div className="glass-card h-[300px] overflow-hidden rounded-2xl relative">
                {/* Fallback for Map iframe if no key */}
                <div className="absolute inset-0 bg-indigo/5 flex flex-col items-center justify-center text-center p-8">
                  <MapPin size={48} className="text-indigo mb-4 opacity-20" />
                  <p className="text-xs text-muted font-bold uppercase tracking-widest mb-4">Interactive Map</p>
                  <p className="text-[10px] text-muted leading-relaxed">Map interface disabled in preview. Click "Get Directions" to view on Google Maps.</p>
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-xs font-bold text-muted uppercase tracking-widest mb-6">Similar Spots</h3>
              <div className="space-y-6">
                {related.map(loc => (
                  <Link key={loc.placeId} to={`/location/${loc.placeId}`} className="flex items-center space-x-4 group">
                    <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                      <img src={loc.photoUrl || defaultPhoto} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-sm mb-1 group-hover:text-indigo transition-colors">{loc.name}</h4>
                      <StarRating rating={loc.rating} count={loc.reviewCount} />
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
