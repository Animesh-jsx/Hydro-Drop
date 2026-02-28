import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-linear-to-br from-emerald-50 via-white to-amber-50" />
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-gold-400/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-linear-to-t from-emerald-900/5 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-12">
        {/* Text Content */}
        <div className="space-y-8 z-10">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-block py-1.5 px-4 rounded-full bg-emerald-100 text-emerald-800 text-sm font-semibold tracking-wide uppercase border border-emerald-200"
          >
            Nature's Essence
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="font-display text-5xl md:text-7xl font-bold text-gray-900 leading-tight"
          >
            Experience the{' '}
            <span className="text-secondary italic">Purest Drop</span>{' '}
            of Life
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-lg md:text-xl text-gray-600 max-w-lg leading-relaxed"
          >
            Sourced from pristine mountain springs, Hydra Drop delivers naturally balanced, mineral-rich hydration for your body and soul.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link
              to="/products"
              className="bg-emerald-800 hover:bg-emerald-900 text-white px-8 py-4 rounded-lg transition-all shadow-xl hover:shadow-emerald-900/20 font-semibold text-lg flex items-center justify-center gap-2 group"
            >
              Shop Now
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/about"
              className="bg-white/80 backdrop-blur-md border border-emerald-200 px-8 py-4 rounded-lg transition-all hover:bg-white font-semibold text-lg text-emerald-900 text-center"
            >
              Our Water Sources
            </Link>
          </motion.div>
        </div>

        {/* Hero Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="relative h-125 lg:h-150 flex items-center justify-center"
        >
          <motion.img
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            src="https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600&auto=format&fit=crop&q=80"
            alt="Premium Hydra Drop water bottle"
            className="h-112.5 w-auto object-contain rounded-2xl shadow-2xl z-20 relative"
          />
          <div className="absolute top-10 right-10 w-48 h-48 bg-gold-500/10 backdrop-blur-md rounded-full border border-white/20 animate-pulse" />
          <div className="absolute bottom-10 left-10 w-32 h-32 bg-emerald-500/10 backdrop-blur-md rounded-full border border-white/20" />
        </motion.div>
      </div>
    </section>
  )
}
