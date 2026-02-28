import { motion } from 'framer-motion'

interface HeroBannerProps {
  title: string
  subtitle?: string
  label?: string
}

export default function HeroBanner({ title, subtitle, label }: HeroBannerProps) {
  return (
    <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-primary-darkest via-emerald-900 to-primary-darkest" />
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1548232979-6c557ee14752?q=80&w=2671&auto=format&fit=crop)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div className="absolute inset-0 bg-primary-darkest/60" />

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {label && (
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-block text-primary text-sm font-semibold tracking-widest uppercase mb-4"
          >
            {label}
          </motion.span>
        )}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="font-display text-4xl md:text-6xl font-bold text-white mb-4"
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto"
          >
            {subtitle}
          </motion.p>
        )}
      </div>

      {/* Water drop decoration */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.2 }}
        transition={{ delay: 0.8, duration: 1 }}
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full border border-white/20"
      />
    </section>
  )
}
