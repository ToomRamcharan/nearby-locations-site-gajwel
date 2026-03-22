export async function loadLocations() {
  try {
    const response = await fetch('/data/locations.json')
    if (!response.ok) throw new Error('Failed to fetch data')
    return await response.json()
  } catch (err) {
    console.error('Error loading locations:', err)
    return []
  }
}

export function filterLocations(locations, query, filters) {
  return locations.filter(loc => {
    const matchQuery = loc.name.toLowerCase().includes(query.toLowerCase()) ||
                       loc.category.toLowerCase().includes(query.toLowerCase()) ||
                       loc.address.toLowerCase().includes(query.toLowerCase())
    
    const matchCategory = filters.category === 'All' || loc.category === filters.category
    const matchRating = (loc.rating || 0) >= filters.minRating

    return matchQuery && matchCategory && matchRating
  })
}
