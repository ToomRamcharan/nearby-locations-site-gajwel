import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Search } from 'lucide-react'

export default function SearchBar({ onSearch, placeholder = "Search for restaurants, cafes, shops..." }) {
  const [query, setQuery] = useState('')

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(query)
    }, 300)
    return () => clearTimeout(timer)
  }, [query, onSearch])

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative w-full max-w-2xl mx-auto"
    >
      <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
        <Search className="text-muted" size={20} />
      </div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-14 pr-6 text-lg focus:outline-none focus:border-indigo/50 transition-colors backdrop-blur-md placeholder:text-muted/50"
        placeholder={placeholder}
      />
    </motion.div>
  )
}
