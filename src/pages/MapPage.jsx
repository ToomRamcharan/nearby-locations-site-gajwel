import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Star, Building2 } from 'lucide-react'
import { loadLocations } from '../utils/dataLoader'
import CategoryBadge from '../components/CategoryBadge'

export default function MapPage() {
  const [locations, setLocations] = useState([])
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    loadLocations().then(setLocations)
  }, [])

  return (
    <div className="pt-24 h-screen flex flex-col md:flex-row overflow-hidden">
      {/* Side Panel */}
      <div className="w-full md:w-80 h-1/3 md:h-full overflow-y-auto glass-nav border-r border-white/5 p-6">
        <h2 className="font-display font-bold text-xl mb-6">Explore Gajwel</h2>
        <div className="space-y-4">
          {locations.map(loc => (
            <div 
              key={loc.placeId}
              onClick={() => setSelected(loc)}
              className={`p-4 rounded-2xl cursor-pointer transition-all ${
                selected?.placeId === loc.placeId 
                ? 'bg-indigo/20 border-indigo/40' 
                : 'glass-card border-transparent hover:border-white/10'
              }`}
            >
              <h3 className="font-bold text-sm mb-1">{loc.name}</h3>
              <div className="flex items-center space-x-2">
                <CategoryBadge category={loc.category} />
                <div className="flex items-center text-[10px] text-muted font-bold">
                  <Star size={10} className="mr-0.5 fill-indigo text-indigo" />
                  {loc.rating}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Map Content */}
      <div className="flex-grow bg-[#0A0A0F] relative">
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-12">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="glass-card p-12 max-w-lg"
          >
            <MapPin size={64} className="text-indigo mx-auto mb-6 opacity-20" />
            <h2 className="font-display text-2xl font-black mb-4 uppercase tracking-tight">Interactive Map Preview</h2>
            <p className="text-muted font-medium leading-relaxed mb-8">
              We've mapped <span className="text-white font-bold">{locations.length}</span> locations in Gajwel. 
              The interactive map interface is currently in preview mode.
            </p>
            <div className="p-4 bg-indigo/10 rounded-xl border border-indigo/20 text-indigo text-[10px] font-black uppercase tracking-widest">
              Gajwel, Telangana, India
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
