import { motion } from 'framer-motion'

const partners = ['LUXE', 'Haji Saheb', 'Regale', 'Guddu', 'RUSLAAN']

export default function PartnersStrip() {
  return (
    <section className="py-16 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h3 className="font-display text-2xl text-emerald-900 mb-12 relative inline-block">
          Partners in Purity
          <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-secondary" />
        </h3>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-wrap justify-center items-center gap-12 opacity-70 hover:opacity-100 transition-opacity duration-500"
        >
          {partners.map((name, i) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="h-16 flex items-center justify-center"
            >
              <span className={`text-2xl font-bold text-gray-400 ${
                i % 2 === 0 ? 'font-serif' : 'font-sans'
              } ${i === 2 ? 'italic' : ''} ${i === 4 ? 'uppercase tracking-wider' : ''}`}>
                {name}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
