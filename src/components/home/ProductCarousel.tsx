import { motion } from 'framer-motion'
import AnimatedSection from '../common/AnimatedSection'
import { useCart } from '../../context/CartContext'

const products = [
  {
    id: 'natural-mineral',
    name: 'Natural Mineral',
    tagline: 'Source Pristine',
    price: 35.00,
    image: 'https://images.unsplash.com/photo-1560023907-5f339617ea55?w=400&auto=format&fit=crop&q=80',
  },
  {
    id: 'sparkling-essence',
    name: 'Sparkling Essence',
    tagline: 'Fine Carbonation',
    price: 42.00,
    image: 'https://images.unsplash.com/photo-1606168094336-48f205276929?w=400&auto=format&fit=crop&q=80',
  },
  {
    id: 'alkaline-balance',
    name: 'Alkaline Balance',
    tagline: 'pH 8.5+ Hydration',
    price: 38.00,
    image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=400&auto=format&fit=crop&q=80',
  },
  {
    id: 'reserve-glass',
    name: 'Reserve Glass',
    tagline: 'Limited Harvest',
    price: 55.00,
    image: 'https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?w=400&auto=format&fit=crop&q=80',
  },
]

export default function ProductCarousel() {
  const { addItem } = useCart()

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <AnimatedSection>
          <h2 className="font-display text-4xl font-bold text-gray-900 mb-4">
            Our Range of <span className="text-secondary">Premium Water</span>
          </h2>
          <p className="text-gray-600 max-w-xl">
            Thoughtfully sourced to keep you revitalized throughout the day. From still to sparkling, experience perfection.
          </p>
        </AnimatedSection>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, i) => (
            <motion.div
              key={product.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="group cursor-pointer"
            >
              <div className="aspect-3/4 rounded-2xl bg-gray-50 overflow-hidden relative mb-6 border border-transparent hover:border-secondary/30 transition-all duration-300 shadow-xs hover:shadow-xl">
                <div className="absolute inset-0 bg-linear-to-b from-transparent to-black/10 opacity-0 group-hover:opacity-100 transition-opacity z-10" />
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => addItem({
                    id: product.id,
                    name: product.name,
                    description: product.tagline,
                    price: product.price,
                    image: product.image,
                  })}
                  className="absolute bottom-6 left-1/2 -translate-x-1/2 translate-y-full group-hover:translate-y-0 opacity-0 group-hover:opacity-100 bg-white text-emerald-900 px-6 py-2 rounded-full shadow-lg font-medium text-sm transition-all duration-300 z-20"
                >
                  Add to Cart
                </motion.button>
              </div>
              <h3 className="font-display text-2xl font-bold text-gray-900 mb-2 text-center">
                {product.name}
              </h3>
              <p className="text-secondary-dark text-sm font-semibold uppercase tracking-wider text-center">
                {product.tagline}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}


