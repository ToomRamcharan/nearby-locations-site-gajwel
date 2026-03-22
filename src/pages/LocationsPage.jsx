import { useState, useEffect, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, LayoutGrid, Map as MapIcon, SlidersHorizontal } from 'lucide-react'
import SearchBar from '../components/SearchBar'
import FilterSidebar from '../components/FilterSidebar'
import LocationCard from '../components/LocationCard'
import { loadLocations, filterLocations } from '../utils/dataLoader'

export default function LocationsPage() {
  const [searchParams] = useSearchParams()
  const [allLocations, setAllLocations] = useState([])
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '')
  const [filters, setFilters] = useState({ 
    category: searchParams.get('category') || 'All', 
    minRating: 0 
  })
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  useEffect(() => {
    loadLocations().then(setAllLocations)
  }, [])

  const filteredLocations = useMemo(() => {
    return filterLocations(allLocations, searchQuery, filters)
  }, [allLocations, searchQuery, filters])

  return (
    <div className="pt-32 pb-24 container mx-auto px-6">
      <div className="flex flex-col md:flex-row gap-12">
        {/* Sidebar */}
        <aside className="hidden md:block w-64 flex-shrink-0">
          <FilterSidebar 
            onFilterChange={setFilters} 
            initialCategory={filters.category}
          />
        </aside>

        {/* Main Content */}
        <main className="flex-grow">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
            <div className="flex-grow max-w-2xl">
              <SearchBar 
                onSearch={setSearchQuery} 
                placeholder="Filter by name, address or type..." 
              />
            </div>
            
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="md:hidden glass-card p-4 text-indigo"
              >
                <SlidersHorizontal size={20} />
              </button>
              <div className="glass-card p-1.5 flex items-center">
                <button className="p-2.5 rounded-xl bg-indigo text-white shadow-lg shadow-indigo/20">
                  <LayoutGrid size={18} />
                </button>
                <button className="p-2.5 rounded-xl text-muted hover:text-white transition-colors">
                  <MapIcon size={18} />
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between mb-8">
            <h2 className="text-sm font-bold uppercase tracking-widest text-muted">
              Showing <span className="text-white">{filteredLocations.length}</span> Results
            </h2>
          </div>

          <motion.div 
            layout
            className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6"
          >
            <AnimatePresence mode='popLayout'>
              {filteredLocations.map((loc) => (
                <motion.div
                  key={loc.placeId}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                >
                  <LocationCard 
                    id={loc.placeId}
                    name={loc.name}
                    category={loc.category}
                    address={loc.address}
                    rating={loc.rating}
                    reviewCount={loc.reviewCount}
                    photoUrl={loc.photoUrl}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filteredLocations.length === 0 && (
            <div className="py-24 text-center glass-card">
              <Search size={48} className="mx-auto text-muted mb-6 opacity-20" />
              <h3 className="text-xl font-bold mb-2">No locations found</h3>
              <p className="text-muted">Try adjusting your filters or search query.</p>
            </div>
          )}
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] md:hidden"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              className="fixed top-0 left-0 bottom-0 w-80 bg-background z-[70] p-8 md:hidden"
            >
              <FilterSidebar onFilterChange={setFilters} />
              <button 
                onClick={() => setIsSidebarOpen(false)}
                className="absolute top-4 right-4 text-muted"
              >
                Close
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
