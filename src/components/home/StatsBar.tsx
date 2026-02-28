import { motion, useMotionValue, useTransform, animate } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

interface CounterProps {
  value: string
  label: string
}

function Counter({ value, label }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const [inView, setInView] = useState(false)
  const count = useMotionValue(0)
  const numericPart = parseFloat(value.replace(/[^0-9.]/g, ''))
  const suffix = value.replace(/[0-9.]/g, '')
  const rounded = useTransform(count, (v) => {
    if (value.includes('.')) return v.toFixed(1) + suffix
    return Math.floor(v) + suffix
  })

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true) },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (inView) {
      animate(count, numericPart, { duration: 2, ease: 'easeOut' })
    }
  }, [inView, count, numericPart])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 text-center hover:bg-white/10 transition-colors"
    >
      <motion.span ref={ref} className="block text-5xl font-display font-bold text-gold-400 mb-2">
        {rounded}
      </motion.span>
      <span className="text-sm uppercase tracking-widest text-emerald-100">{label}</span>
    </motion.div>
  )
}

const stats = [
  { value: '10+', label: 'Awards Won' },
  { value: '7.4', label: 'Perfect pH Balance' },
  { value: '1M+', label: 'Happy Customers' },
  { value: '0%', label: 'Additives' },
]

export default function StatsBar() {
  return (
    <section className="py-20 bg-gradient-to-r from-emerald-900 to-primary-darkest text-white relative">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-secondary to-transparent opacity-50" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
        <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">Hydration for Everyone, Everywhere</h2>
        <p className="text-emerald-200 max-w-2xl mx-auto">
          Hydra Drop is expanding rapidly, bringing the purity of mountain springs to homes and offices across the nation.
        </p>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <Counter key={stat.label} value={stat.value} label={stat.label} />
          ))}
        </div>
      </div>
    </section>
  )
}
