import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Layout from './components/layout/Layout'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ProductsPage from './pages/ProductsPage'
import GalleryPage from './pages/GalleryPage'
import CustomizationPage from './pages/CustomizationPage'
import CertificationsPage from './pages/CertificationsPage'
import BlogPage from './pages/BlogPage'
import ContactPage from './pages/ContactPage'

function App() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/customization" element={<CustomizationPage />} />
          <Route path="/certifications" element={<CertificationsPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Route>
      </Routes>
    </AnimatePresence>
  )
}

export default App
