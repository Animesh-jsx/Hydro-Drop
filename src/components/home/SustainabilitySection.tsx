import { motion } from 'framer-motion'
import AnimatedSection from '../common/AnimatedSection'
import { Leaf, Droplets, Sparkles } from 'lucide-react'

const features = [
  {
    icon: Leaf,
    title: 'Eco-Conscious Packaging',
    desc: 'Using biodegradable materials and rPET bottles.',
    color: 'bg-emerald-100 text-emerald-600',
  },
  {
    icon: Droplets,
    title: 'Advanced Purification',
    desc: 'Natural filtration plus UV sterilization for absolute safety.',
    color: 'bg-amber-50 text-secondary',
  },
  {
    icon: Sparkles,
    title: 'Mineral Balance',
    desc: 'Naturally enriched with electrolytes like Calcium and Magnesium.',
    color: 'bg-emerald-100 text-emerald-600',
  },
]

export default function SustainabilitySection() {
  return (
    <section className="py-24 bg-emerald-50 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg className="h-full w-full" preserveAspectRatio="none" viewBox="0 0 100 100">
          <path d="M0 100 C 20 0 50 0 100 100 Z" fill="currentColor" className="text-emerald-200" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <AnimatedSection direction="left">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
              <img
                src="https://images.unsplash.com/photo-1559839914-17aae19cec71?w=600&auto=format&fit=crop&q=80"
                alt="Woman drinking pure water in nature"
                className="w-full h-125 object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-emerald-900/80 to-transparent" />
              <div className="absolute bottom-8 left-8 text-white">
                <h3 className="font-display text-3xl font-bold mb-2">Pure & Sustainable</h3>
                <p className="text-emerald-100">Preserving nature's purity for future generations.</p>
              </div>
            </div>
            <div className="absolute -top-6 -right-6 bg-secondary text-white w-28 h-28 rounded-full flex items-center justify-center text-center p-4 shadow-xl border-4 border-white rotate-12">
              <span className="font-display font-bold leading-tight text-sm">100%<br />Natural Spring</span>
            </div>
          </AnimatedSection>

          {/* Content */}
          <div className="space-y-10">
            <AnimatedSection direction="right">
              <h2 className="font-display text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Commitment to <br />
                <span className="text-secondary">Purity & Sustainability</span>
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                Every bottle of Hydra Drop originates from protected underground aquifers, naturally filtered through layers of volcanic rock. We are dedicated to maintaining the delicate balance of our ecosystem while delivering water of exceptional quality.
              </p>
            </AnimatedSection>

            <div className="space-y-4">
              {features.map((feat, i) => (
                <motion.div
                  key={feat.title}
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, duration: 0.5 }}
                  whileHover={{ x: 8 }}
                  className="bg-white/95 backdrop-blur-sm p-6 rounded-xl flex items-center gap-6 shadow-xs hover:shadow-md transition-shadow border border-gray-100"
                >
                  <div className={`w-14 h-14 rounded-full ${feat.color} flex items-center justify-center shrink-0`}>
                    <feat.icon size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-gray-900 mb-1">{feat.title}</h4>
                    <p className="text-sm text-gray-500">{feat.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
