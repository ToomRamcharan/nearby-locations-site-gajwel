import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, MapPin, Star, Building2 } from 'lucide-react'
import ParticleBackground from '../components/ParticleBackground'
import SearchBar from '../components/SearchBar'
import LocationCard from '../components/LocationCard'
import { loadLocations } from '../utils/dataLoader'

export default function LandingPage() {
  const navigate = useNavigate()
  const [featured, setFeatured] = useState([])
  const [stats, setStats] = useState({ count: 0, avgRating: 0 })

  useEffect(() => {
    loadLocations().then(data => {
      setStats({
        count: data.length,
        avgRating: (data.reduce((acc, curr) => acc + (curr.rating || 0), 0) / data.length).toFixed(1)
      })
      // Get top 6 highest rated
      const sorted = [...data].sort((a, b) => (b.rating || 0) - (a.rating || 0))
      setFeatured(sorted.slice(0, 6))
    })
  }, [])

  const categories = [
    { name: 'Restaurants', icon: '🍽️', value: 'Restaurant' },
    { name: 'Cafes', icon: '☕', value: 'Cafe' },
    { name: 'Shops', icon: '🛍️', value: 'Shop' },
    { name: 'Hotels', icon: '🏨', value: 'Hotel' },
    { name: 'Gyms', icon: '💪', value: 'Gym' }
  ]

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  }

  const item = {
    hidden: { y: 30, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } }
  }

  return (
    <div className="relative overflow-hidden">
      <ParticleBackground />

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center px-6 pt-20">
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="text-center max-w-4xl mx-auto"
        >
          <motion.div variants={item} className="inline-block px-4 py-1.5 rounded-full bg-indigo/10 border border-indigo/20 text-indigo text-xs font-bold uppercase tracking-widest mb-8">
            Discover Your City
          </motion.div>
          
          <motion.h1 variants={item} className="font-display text-5xl md:text-8xl font-black mb-8 leading-[0.9] tracking-tight">
            Find the Best <br />
            <span className="text-indigo">Places</span> Near You<span className="text-indigo">.</span>
          </motion.h1>
          
          <motion.p variants={item} className="text-lg md:text-xl text-muted max-w-2xl mx-auto mb-12 font-medium">
            Explore top-rated restaurants, cafes, shops and more in Gajwel. Your local guide to the finest experiences.
          </motion.p>
          
          <motion.div variants={item} className="mb-12">
            <SearchBar onSearch={(q) => q && navigate(`/locations?search=${q}`)} />
          </motion.div>
          
          <motion.div variants={item} className="flex flex-wrap justify-center gap-4">
            {categories.map((cat) => (
              <button
                key={cat.name}
                onClick={() => navigate(`/locations?category=${cat.value}`)}
                className="px-6 py-3 rounded-2xl glass-card hover:bg-white/10 transition-colors flex items-center space-x-2 text-sm font-semibold"
              >
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
              </button>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-24 container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { label: 'Locations Found', value: stats.count, icon: <Building2 className="text-indigo" size={32} /> },
            { label: 'Avg Rating', value: `${stats.avgRating} ★`, icon: <Star className="text-violet" size={32} /> },
            { label: 'City Center', value: 'Gajwel', icon: <MapPin className="text-sky" size={32} /> }
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-10 text-center"
            >
              <div className="flex justify-center mb-6">{stat.icon}</div>
              <div className="text-4xl font-display font-black mb-2">{stat.value}</div>
              <div className="text-muted font-semibold uppercase tracking-widest text-xs">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Section */}
      <section className="py-24 container mx-auto px-6">
        <div className="flex items-end justify-between mb-16">
          <div>
            <h2 className="font-display text-4xl font-black mb-4 tracking-tight">Top Rated <span className="text-indigo">Near You.</span></h2>
            <p className="text-muted font-medium">Curated selection of the highest rated spots in town.</p>
          </div>
          <button 
            onClick={() => navigate('/locations')}
            className="hidden md:flex items-center space-x-2 text-indigo font-bold hover:translate-x-1 transition-transform"
          >
            <span>Browse All</span>
            <ArrowRight size={20} />
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featured.map((loc) => (
            <LocationCard 
              key={loc.placeId}
              id={loc.placeId}
              name={loc.name}
              category={loc.category}
              address={loc.address}
              rating={loc.rating}
              reviewCount={loc.reviewCount}
              photoUrl={loc.photoUrl}
            />
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 container mx-auto px-6">
        <div className="bg-gradient-to-br from-indigo to-violet-600 rounded-[40px] p-12 md:p-24 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-[100px] rounded-full -mr-32 -mt-32"></div>
          <div className="relative z-10">
            <h2 className="font-display text-4xl md:text-6xl font-black mb-8 leading-tight">Ready to Explore <br />Your City?</h2>
            <button 
              onClick={() => navigate('/locations')}
              className="bg-white text-indigo px-10 py-5 rounded-2xl font-black text-lg hover:scale-105 transition-transform shadow-2xl shadow-indigo/20"
            >
              Get Started Now
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5 text-center text-muted text-sm font-medium">
        <p>© 2026 NearbySpot. Built autonomously by Gemini CLI.</p>
      </footer>
    </div>
  )
}
