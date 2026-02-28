import { motion } from 'framer-motion'
import { ShieldCheck, FlaskConical, Package, Truck } from 'lucide-react'

const reasons = [
  { icon: ShieldCheck, title: 'Certified Purity', desc: 'Rigorously tested and certified to meet the highest global standards.' },
  { icon: FlaskConical, title: 'Optimal Mineral Content', desc: 'Naturally rich in magnesium and calcium for better health.' },
  { icon: Package, title: 'Sustainable Packaging', desc: 'Reducing plastic waste with our innovative eco-friendly bottles.' },
  { icon: Truck, title: 'Direct Delivery', desc: 'Fresh from the source to your doorstep, ensuring peak quality.' },
]

export default function WhyHydraDrop() {
  return (
    <section className="py-20 bg-emerald-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diamond-upholstery.png')] opacity-5" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-4xl font-bold mb-4"
          >
            Why Hydra Drop?
          </motion.h2>
          <div className="h-1 w-24 bg-secondary mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center group"
            >
              <div className="w-20 h-20 mx-auto bg-emerald-800 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 border border-emerald-700 shadow-lg group-hover:border-secondary">
                <item.icon size={32} className="text-gold-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">{item.title}</h3>
              <p className="text-sm text-emerald-200 leading-relaxed px-4">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
