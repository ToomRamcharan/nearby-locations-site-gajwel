import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Filter, Star, ChevronDown } from 'lucide-react'

export default function FilterSidebar({ onFilterChange }) {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [minRating, setMinRating] = useState(0)

  const categories = ['All', 'Restaurant', 'Cafe', 'Shop', 'Hotel', 'Gym']

  useEffect(() => {
    onFilterChange({ category: selectedCategory, minRating })
  }, [selectedCategory, minRating, onFilterChange])

  return (
    <div className="space-y-8 sticky top-28">
      <div className="flex items-center space-x-2 text-white mb-6">
        <Filter size={18} className="text-indigo" />
        <h3 className="font-display font-bold uppercase tracking-widest text-sm">Filters</h3>
      </div>

      {/* Category Section */}
      <div className="space-y-4">
        <h4 className="text-xs font-semibold text-muted uppercase tracking-wider mb-4 flex items-center justify-between">
          Category
          <ChevronDown size={14} className="opacity-30" />
        </h4>
        <div className="flex flex-col space-y-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`text-left px-4 py-3 rounded-xl transition-all duration-200 text-sm font-medium ${
                selectedCategory === category 
                ? 'bg-indigo/10 text-indigo border-l-2 border-indigo' 
                : 'text-gray-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Rating Section */}
      <div className="space-y-4 pt-6 border-t border-white/5">
        <h4 className="text-xs font-semibold text-muted uppercase tracking-wider mb-4 flex items-center justify-between">
          Minimum Rating
          <Star size={14} className="opacity-30" />
        </h4>
        <div className="px-2">
          <input
            type="range"
            min="0"
            max="5"
            step="0.5"
            value={minRating}
            onChange={(e) => setMinRating(parseFloat(e.target.value))}
            className="w-full accent-indigo"
          />
          <div className="flex justify-between mt-2 text-[10px] font-bold text-muted">
            <span>ANY</span>
            <span className="text-indigo">{minRating} ★</span>
            <span>5.0</span>
          </div>
        </div>
      </div>
    </div>
  )
}
