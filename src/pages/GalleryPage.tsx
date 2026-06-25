import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Instagram, ChevronDown } from 'lucide-react'
import PageTransition from '../components/common/PageTransition'
import AnimatedSection from '../components/common/AnimatedSection'

const categories = ['All', 'Production', 'Lifestyle', 'Events']

const galleryImages = [
  { src: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=500&auto=format&fit=crop&q=80', cat: 'Production', alt: 'Water pouring into glass' },
  { src: 'https://images.unsplash.com/photo-1606168094336-48f205276929?w=500&auto=format&fit=crop&q=80', cat: 'Production', alt: 'Water bottles in factory' },
  { src: 'https://images.unsplash.com/photo-1519455953755-af066f52f1a6?w=500&auto=format&fit=crop&q=80', cat: 'Production', alt: 'Water droplet close-up' },
  { src: 'https://images.unsplash.com/photo-1559839914-17aae19cec71?w=500&auto=format&fit=crop&q=80', cat: 'Lifestyle', alt: 'Woman drinking water outdoors' },
  { src: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&auto=format&fit=crop&q=80', cat: 'Lifestyle', alt: 'Fitness hydration' },
  { src: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=500&auto=format&fit=crop&q=80', cat: 'Lifestyle', alt: 'Nature and water source' },
  { src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&auto=format&fit=crop&q=80', cat: 'Events', alt: 'Mountain landscape with water' },
  { src: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=500&auto=format&fit=crop&q=80', cat: 'Events', alt: 'People at event with drinks' },
]

const instagramPhotos = [
  'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=200&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1559839914-17aae19cec71?w=200&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1606168094336-48f205276929?w=200&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&auto=format&fit=crop&q=80',
]

export default function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState('All')
  const [showCount, setShowCount] = useState(8)

  const filtered = useMemo(() => {
    return activeFilter === 'All' ? galleryImages : galleryImages.filter((img) => img.cat === activeFilter)
  }, [activeFilter])

  return (
    <PageTransition>
      {/* Header */}
      <section className="pt-28 pb-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <span className="text-primary text-sm font-semibold tracking-widest uppercase mb-4 block">Pure Inspiration</span>
            <h1 className="font-display text-5xl md:text-6xl font-bold text-gray-900 mb-6">OUR JOURNEY IN PICTURES</h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Experience the purity of Hydra Drop through our lens. From the untouched sources to your daily moments of hydration.
            </p>
          </AnimatedSection>

          {/* Filter Tabs */}
          <div className="flex justify-center gap-3 mt-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${
                  activeFilter === cat
                    ? 'bg-primary text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="pb-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filtered.slice(0, showCount).map((img, i) => (
                <motion.div
                  key={img.src}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: i * 0.05 }}
                  className="group relative overflow-hidden rounded-2xl aspect-square cursor-pointer"
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                    <span className="text-white font-medium opacity-0 group-hover:opacity-100 transition-opacity text-sm bg-black/50 px-4 py-2 rounded-full backdrop-blur-sm">
                      {img.cat}
                    </span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filtered.length > showCount && (
            <div className="text-center mt-12">
              <button
                onClick={() => setShowCount((c) => c + 6)}
                className="inline-flex items-center gap-2 border border-gray-300 rounded-lg px-6 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                LOAD MORE <ChevronDown size={16} />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Instagram CTA */}
      <section className="py-16 bg-primary-darkest text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Instagram size={20} className="text-primary" />
                <span className="text-primary text-sm font-semibold uppercase tracking-wider">@hydradropwater</span>
              </div>
              <h3 className="font-display text-3xl font-bold mb-3">Join the hydration movement on Instagram</h3>
              <p className="text-gray-400 mb-4">Tag us in your photos for a chance to be featured in our monthly spotlight.</p>
              <button className="bg-white text-gray-900 px-6 py-2.5 rounded-lg font-semibold text-sm hover:bg-gray-100 transition-colors">
                Follow Us
              </button>
            </div>
            <div className="flex gap-3">
              {instagramPhotos.map((photo, i) => (
                <motion.img
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  src={photo}
                  alt="Instagram post"
                  className="w-24 h-24 rounded-xl object-cover hover:scale-105 transition-transform cursor-pointer"
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  )
}
