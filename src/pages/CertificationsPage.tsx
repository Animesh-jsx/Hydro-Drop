import { motion } from 'framer-motion'
import { CheckCircle, Shield } from 'lucide-react'
import PageTransition from '../components/common/PageTransition'
import HeroBanner from '../components/common/HeroBanner'
import AnimatedSection from '../components/common/AnimatedSection'

const certifications = [
  { name: 'FSSAI Certified', desc: 'Food Safety and Standards Authority of India', abbr: 'FSSAI' },
  { name: 'HACCP', desc: 'Hazard Analysis Critical Control Point', abbr: 'HACCP' },
  { name: 'IAF Member', desc: 'International Accreditation Forum', abbr: 'IAF' },
  { name: 'ISI Mark', desc: 'Indian Standards Institute', abbr: 'ISI' },
  { name: 'ISO 9001:2015', desc: 'Quality Management Systems', abbr: 'ISO' },
  { name: 'ISO 22000:2018', desc: 'Food Safety Management', abbr: '22000' },
  { name: 'MSME Registered', desc: 'Micro, Small & Medium Enterprises', abbr: 'MSME' },
  { name: 'QRO Certified', desc: 'Quality Research Organization', abbr: 'QRO' },
  { name: 'Udyam Registration', desc: 'Official Indian Enterprise Registration', abbr: 'UDYAM' },
  { name: 'UKAF Accredited', desc: 'UK Accreditation Forum', abbr: 'UKAF' },
]

const qualityPoints = [
  'Monthly Quality Audits — Independent labs test our water every month.',
  'Sustainable Processing — Environmentally friendly purification methods.',
  'Traceable Batch Codes — Complete transparency from bottle to source.',
]

export default function CertificationsPage() {
  return (
    <PageTransition>
      <HeroBanner
        label="Trust & Quality"
        title="CERTIFICATIONS"
        subtitle="Our commitment to purity is backed by rigorous testing and global standards. Every drop is certified for your safety."
      />

      {/* Quality Trust */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <h2 className="font-display text-4xl font-bold text-gray-900 italic">Quality You Can Trust</h2>
            <div className="h-0.5 w-20 bg-secondary mx-auto mt-4 mb-6" />
            <p className="text-gray-600 max-w-2xl mx-auto">
              Hydra Drop adheres to the highest international standards of water purification and bottling. We are proud to display our certifications that guarantee purity in every sip.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
            {certifications.map((cert, i) => (
              <motion.div
                key={cert.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -4, scale: 1.02 }}
                className="bg-white border border-gray-100 rounded-2xl p-6 text-center shadow-xs hover:shadow-md transition-all"
              >
                <div className="w-16 h-16 mx-auto rounded-full bg-emerald-50 border-2 border-primary/20 flex items-center justify-center mb-4">
                  <span className="font-bold text-primary text-sm">{cert.abbr}</span>
                </div>
                <h4 className="font-bold text-sm text-gray-900 mb-1">{cert.name}</h4>
                <p className="text-xs text-gray-500">{cert.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Beyond The Label */}
      <section className="py-20 bg-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection direction="left">
              <span className="text-primary text-sm font-semibold tracking-widest uppercase mb-2 block">Our Standards</span>
              <h2 className="font-display text-4xl lg:text-5xl font-bold text-gray-900 mb-6 italic">Beyond The Label</h2>
              <p className="text-gray-600 leading-relaxed mb-8">
                Certifications are more than just badges to us; they are a testament to our relentless pursuit of quality. From the source to the final seal, every step is monitored to ensure the water you drink is pristine, balanced, and safe.
              </p>
              <div className="space-y-4">
                {qualityPoints.map((point, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle size={20} className="text-primary shrink-0 mt-0.5" />
                    <p className="text-gray-700 text-sm">{point}</p>
                  </motion.div>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right" className="relative">
              <img
                src="https://images.unsplash.com/photo-1559839914-17aae19cec71?w=500&auto=format&fit=crop&q=80"
                alt="Woman drinking certified pure water"
                className="w-full h-112.5 object-cover rounded-2xl shadow-xl"
              />
              {/* Purity Score Badge */}
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, type: 'spring' }}
                className="absolute bottom-6 right-6 bg-primary text-white rounded-2xl p-4 shadow-xl"
              >
                <div className="flex items-center gap-3">
                  <Shield size={24} />
                  <div>
                    <span className="text-xs uppercase tracking-wider opacity-80">Purity Score</span>
                    <p className="text-2xl font-bold">99.9%</p>
                  </div>
                </div>
              </motion.div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </PageTransition>
  )
}
