import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import LandingPage from './pages/LandingPage'
import LocationsPage from './pages/LocationsPage'
import LocationDetailPage from './pages/LocationDetailPage'
import MapPage from './pages/MapPage'

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-background text-white selection:bg-indigo/30">
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/locations" element={<LocationsPage />} />
          <Route path="/location/:id" element={<LocationDetailPage />} />
          <Route path="/map" element={<MapPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}
