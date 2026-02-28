import { motion } from 'framer-motion'
import { Filter, Gem, Recycle, HeartPulse, Droplets, Quote } from 'lucide-react'
import PageTransition from '../components/common/PageTransition'
import HeroBanner from '../components/common/HeroBanner'
import AnimatedSection from '../components/common/AnimatedSection'

const features = [
  { icon: Filter, title: 'Advanced Filtration', desc: 'Our proprietary 7-stage purification process removes 99.9% of impurities while retaining taste.' },
  { icon: Gem, title: 'Mineral Enrichment', desc: 'Infused with essential electrolytes including Calcium, Magnesium, and Potassium for balance.' },
  { icon: Recycle, title: 'Eco-friendly Packaging', desc: 'Committed to the planet with 100% recycled bottles made from sustainable, plant-based materials.' },
  { icon: HeartPulse, title: 'Quality Testing', desc: 'Rigorous testing every hour in our certified labs to ensure safety, consistency, and premium taste.' },
]

const timeline = [
  { year: '2015', title: 'The Beginning', desc: 'Hydra Drop is founded in a small facility with a single mission: purity.' },
  { year: '2018', title: 'Patent Filtration', desc: 'We launched our proprietary 7-stage filtration technology.' },
  { year: '2021', title: 'Going Green', desc: 'Transitioned to 100% rPET bottles and carbon-neutral shipping.' },
  { year: '2024', title: 'Global Recognition', desc: 'Awarded "Best Premium Water" and expanded to international markets.' },
]

export default function AboutPage() {
  return (
    <PageTransition>
      <HeroBanner
        label="Since 2015"
        title="Our Story: Purely Hydra Drop"
        subtitle="From a single spring to a global standard. Experience the purity of nature refined by science in every drop."
      />

      {/* Mission & Vision */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <AnimatedSection>
              <div className="bg-white border border-gray-100 rounded-2xl p-10 shadow-xs hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center mb-6">
                  <Droplets size={24} className="text-primary" />
                </div>
                <h3 className="font-display text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
                <p className="text-gray-600 leading-relaxed">
                  To provide the purest hydration experience to every household, ensuring that every sip contributes to a healthier, more revitalized life through sustainable practices.
                </p>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.15}>
              <div className="bg-white border border-gray-100 rounded-2xl p-10 shadow-xs hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center mb-6">
                  <Droplets size={24} className="text-primary" />
                </div>
                <h3 className="font-display text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
                <p className="text-gray-600 leading-relaxed">
                  To become the global gold standard in mineral-rich water, redefining how the world views hydration by blending nature's perfection with cutting-edge purification technology.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Why Choose Hydra Drop */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <span className="text-primary text-sm font-semibold tracking-widest uppercase mb-4 block">The Hydra Drop Difference</span>
            <h2 className="font-display text-4xl font-bold text-gray-900">Why Choose Hydra Drop?</h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feat, i) => (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 mx-auto bg-emerald-100 rounded-xl flex items-center justify-center mb-6 text-primary">
                  <feat.icon size={28} />
                </div>
                <h3 className="font-bold text-lg text-gray-900 mb-3">{feat.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{feat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder Quote */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection direction="left">
              <img
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500&auto=format&fit=crop&q=80"
                alt="Dr. Elias Thorne, Founder & CEO"
                className="w-full h-[450px] object-cover rounded-2xl shadow-xl"
              />
            </AnimatedSection>
            <AnimatedSection direction="right">
              <div className="bg-gray-50 rounded-2xl p-10 border border-gray-100">
                <Quote size={40} className="text-primary mb-6" />
                <h3 className="font-display text-2xl font-bold text-gray-900 mb-4">A Note from Our Founder</h3>
                <p className="text-gray-600 leading-relaxed italic mb-6">
                  "Water is the essence of life, but pure water is the essence of a healthy life. When I started Hydra Drop, my goal wasn't just to sell bottles, but to deliver vitality. We promise transparency, sustainability, and absolute purity in every drop you drink."
                </p>
                <div>
                  <p className="font-bold text-gray-900">Dr. Elias Thorne</p>
                  <p className="text-primary text-sm">Founder & CEO</p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <h2 className="font-display text-4xl font-bold text-gray-900 mb-4">Our Journey</h2>
            <p className="text-gray-600">A decade of dedication to hydration.</p>
          </AnimatedSection>

          <div className="relative">
            {/* Center line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 -translate-x-1/2 hidden md:block" />

            <div className="space-y-12">
              {timeline.map((item, i) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1, duration: 0.5 }}
                  className={`flex flex-col md:flex-row items-center gap-6 ${
                    i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  <div className={`flex-1 ${i % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                    <h4 className="font-bold text-lg text-gray-900">{item.title}</h4>
                    <p className="text-sm text-gray-500 mt-1">{item.desc}</p>
                  </div>
                  <div className="relative z-10 flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm shadow-lg">
                      {item.year}
                    </div>
                  </div>
                  <div className="flex-1" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  )
}
