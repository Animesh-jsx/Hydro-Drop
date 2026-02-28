import { motion } from 'framer-motion'
import { Sun, Waves, Droplets, ShoppingCart } from 'lucide-react'
import PageTransition from '../components/common/PageTransition'
import HeroBanner from '../components/common/HeroBanner'
import AnimatedSection from '../components/common/AnimatedSection'
import { Link } from 'react-router-dom'

const products = [
  {
    name: 'Hydra Still Mini',
    tags: ['Events', 'Quick Sip'],
    desc: 'Perfect for corporate events and quick refreshment. Compact...',
    price: '$12.00',
    oldPrice: '$15.00',
    volume: '300ml',
    image: 'https://images.unsplash.com/photo-1560023907-5f339617ea55?w=400&auto=format&fit=crop&q=80',
  },
  {
    name: 'Hydra Standard',
    tags: ['Best Seller', 'Balanced pH'],
    desc: 'The ideal daily companion. Balanced pH levels for optimal...',
    price: '$18.00',
    oldPrice: '$22.00',
    volume: '500ml',
    image: 'https://images.unsplash.com/photo-1606168094336-48f205276929?w=400&auto=format&fit=crop&q=80',
  },
  {
    name: 'Hydra Max',
    tags: ['All-Day', 'Sports'],
    desc: 'Stay hydrated all day long. Perfect for sports, hiking, and...',
    price: '$24.00',
    oldPrice: '$28.00',
    volume: '1L',
    image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=400&auto=format&fit=crop&q=80',
  },
  {
    name: 'Hydra Home Jar',
    tags: ['Family', 'Eco-Friendly'],
    desc: 'The sustainable choice for your home or office. Returnable and...',
    price: '$5.00',
    oldPrice: '',
    volume: '20L',
    image: 'https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?w=400&auto=format&fit=crop&q=80',
  },
]

const processSteps = [
  { icon: Sun, title: 'UV Treated', desc: 'State-of-the-art UV purification technology that eliminates 99.9% of harmful microorganisms without chemicals.' },
  { icon: Waves, title: 'Ozone Processed', desc: 'Advanced ozone treatment ensures crystal clear purity, extended shelf life, and that crisp, refreshing taste.' },
  { icon: Droplets, title: 'Added Minerals', desc: 'Enriched with essential electrolytes like Magnesium, Calcium, and Potassium for superior balance.' },
]

export default function ProductsPage() {
  return (
    <PageTransition>
      <HeroBanner
        label="Premium Hydration"
        title="Our Premium Water Collection"
        subtitle="Experience the purity of nature in every drop. Sourced from pristine aquifers and enriched with essential minerals for your vitality."
      />

      {/* Product Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <h2 className="font-display text-4xl font-bold text-gray-900">Choose Your Hydration</h2>
            <div className="h-0.5 w-20 bg-secondary mx-auto mt-4" />
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((p, i) => (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -8 }}
                className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-xs hover:shadow-xl transition-all group"
              >
                <div className="relative aspect-square bg-gray-50 overflow-hidden">
                  <span className="absolute top-3 left-3 bg-primary text-white text-xs font-bold px-2 py-1 rounded-md z-10">
                    {p.volume}
                  </span>
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-5">
                  <h3 className="font-display text-lg font-bold text-gray-900 mb-2">{p.name}</h3>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {p.tags.map((tag) => (
                      <span key={tag} className="text-xs bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <p className="text-sm text-gray-500 mb-4 line-clamp-2">{p.desc}</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-primary font-bold text-lg">{p.price}</span>
                      {p.oldPrice && <span className="text-gray-400 text-sm line-through ml-2">{p.oldPrice}</span>}
                    </div>
                    <button className="w-10 h-10 rounded-lg bg-gray-100 hover:bg-primary hover:text-white flex items-center justify-center transition-colors">
                      <ShoppingCart size={16} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 bg-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {processSteps.map((step, i) => (
              <AnimatedSection key={step.title} delay={i * 0.1}>
                <div className="bg-white rounded-2xl p-8 text-center border border-gray-100 shadow-xs">
                  <div className="w-16 h-16 mx-auto bg-emerald-100 rounded-full flex items-center justify-center mb-6 text-primary">
                    <step.icon size={28} />
                  </div>
                  <h3 className="font-bold text-lg text-gray-900 mb-3">{step.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Bulk CTA */}
      <section className="py-20 bg-linear-to-r from-emerald-900 to-primary-darkest text-white">
        <AnimatedSection className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-4xl font-bold mb-4">Interested in bulk orders?</h2>
          <p className="text-emerald-200 mb-8 max-w-xl mx-auto">
            We offer special pricing for corporate events, offices, and regular home delivery subscriptions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="bg-primary hover:bg-emerald-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
              Get a Quote
            </Link>
            <Link to="/contact" className="text-white border border-white/30 hover:bg-white/10 px-8 py-3 rounded-lg font-semibold transition-colors">
              Contact Sales →
            </Link>
          </div>
        </AnimatedSection>
      </section>
    </PageTransition>
  )
}
