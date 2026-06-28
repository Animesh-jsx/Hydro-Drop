import { useState, useMemo } from 'react'
import { motion } from 'motion/react'
import { Droplets, Zap, Waves, Gem, Settings, AlignJustify, Sparkles } from 'lucide-react'
import PageTransition from '../components/common/PageTransition'
import AnimatedSection from '../components/common/AnimatedSection'

const waterTypes = [
  { id: 'still', label: 'Still', icon: Droplets },
  { id: 'sparkling', label: 'Sparkling', icon: Waves },
  { id: 'alkaline', label: 'Alkaline', icon: Zap },
  { id: 'mineral', label: 'Mineral', icon: Gem },
]

const volumes = [
  { id: '250ml', label: '250ml', desc: 'Pocket Sized' },
  { id: '500ml', label: '500ml', desc: 'Standard Fit' },
  { id: '750ml', label: '750ml', desc: 'Daily Hydrate' },
  { id: '1l', label: '1L', desc: 'Ultra Capacity' },
]

const capFinishes = [
  { id: 'bamboo', label: 'Bamboo', color: 'bg-amber-200' },
  { id: 'stainless', label: 'Stainless', color: 'bg-gray-300' },
  { id: 'sports', label: 'Sports', color: 'bg-gray-800' },
]

const previewImages = [
  'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1560023907-5f339617ea55?w=200&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1606168094336-48f205276929?w=200&auto=format&fit=crop&q=80',
]

export default function CustomizationPage() {
  const [waterType, setWaterType] = useState('still')
  const [volume, setVolume] = useState('250ml')
  const [inscription, setInscription] = useState('')
  const [capFinish, setCapFinish] = useState('bamboo')

  // Optimize price calculation to prevent recalculation on unrelated state changes (like waterType)
  const totalPrice = useMemo(() => {
    const basePrice = volume === '250ml' ? 18 : volume === '500ml' ? 22 : volume === '750ml' ? 26 : 30
    return basePrice + (inscription ? 4 : 0) + (capFinish === 'bamboo' ? 0 : capFinish === 'stainless' ? 2 : 1)
  }, [volume, inscription, capFinish])

  return (
    <PageTransition>
      <section className="pt-24 pb-16 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left - Bottle Preview */}
            <AnimatedSection direction="left" className="lg:sticky lg:top-28">
              <div className="relative">
                <span className="absolute top-4 left-4 z-10 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">
                  PREVIEW MODE
                </span>
                <div className="bg-linear-to-br from-teal-100 to-emerald-50 rounded-3xl overflow-hidden aspect-4/5 flex items-center justify-center relative">
                  <motion.img
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                    src={previewImages[0]}
                    alt="Custom water bottle preview"
                    className="h-[80%] w-auto object-contain drop-shadow-2xl"
                  />
                  {inscription && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-white/70 font-display text-xl font-bold bg-black/20 backdrop-blur-sm px-4 py-2 rounded-lg">
                        {inscription}
                      </span>
                    </div>
                  )}
                </div>
                <div className="flex gap-3 mt-4">
                  {previewImages.map((img, i) => (
                    <div key={i} className={`w-16 h-16 rounded-xl overflow-hidden border-2 cursor-pointer ${i === 0 ? 'border-primary' : 'border-transparent'}`}>
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            {/* Right - Configurator */}
            <AnimatedSection direction="right">
              <h1 className="font-display text-4xl font-bold text-gray-900 mb-2">Personalize Your Sip</h1>
              <p className="text-gray-600 mb-8">Design a bottle that reflects your style and matches your premium lifestyle.</p>

              {/* Step 1: Water Essence */}
              <div className="mb-8">
                <h3 className="flex items-center gap-2 font-bold text-gray-900 mb-4">
                  <span className="w-6 h-6 rounded-full bg-primary text-white text-xs flex items-center justify-center font-bold">1</span>
                  WATER ESSENCE
                </h3>
                <div className="grid grid-cols-4 gap-3">
                  {waterTypes.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => setWaterType(type.id)}
                      className={`p-4 rounded-xl border-2 text-center transition-all ${
                        waterType === type.id
                          ? 'border-primary bg-emerald-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <type.icon size={20} className={`mx-auto mb-2 ${waterType === type.id ? 'text-primary' : 'text-gray-400'}`} />
                      <span className="text-xs font-bold uppercase">{type.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Volume */}
              <div className="mb-8">
                <h3 className="flex items-center gap-2 font-bold text-gray-900 mb-4">
                  <span className="w-6 h-6 rounded-full bg-primary text-white text-xs flex items-center justify-center font-bold">2</span>
                  VOLUME SELECTION
                </h3>
                <div className="grid grid-cols-4 gap-3">
                  {volumes.map((vol) => (
                    <button
                      key={vol.id}
                      onClick={() => setVolume(vol.id)}
                      className={`p-4 rounded-xl border-2 text-center transition-all ${
                        volume === vol.id
                          ? 'border-primary bg-emerald-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <span className="block font-bold text-sm">{vol.label}</span>
                      <span className="text-xs text-gray-500">{vol.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 3: Inscription */}
              <div className="mb-8">
                <h3 className="flex items-center gap-2 font-bold text-gray-900 mb-4">
                  <span className="w-6 h-6 rounded-full bg-primary text-white text-xs flex items-center justify-center font-bold">3</span>
                  INSCRIPTION
                </h3>
                <input
                  type="text"
                  value={inscription}
                  onChange={(e) => setInscription(e.target.value)}
                  placeholder="Add Your Text/Name"
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                />
              </div>

              {/* Step 4: Brand Motif */}
              <div className="mb-8">
                <h3 className="flex items-center gap-2 font-bold text-gray-900 mb-4">
                  <span className="w-6 h-6 rounded-full bg-primary text-white text-xs flex items-center justify-center font-bold">4</span>
                  BRAND MOTIF
                </h3>
                <div className="flex gap-3">
                  <div className="flex-1 border-2 border-dashed border-gray-200 rounded-xl p-6 text-center cursor-pointer hover:border-primary transition-colors">
                    <span className="text-gray-400 text-sm font-medium">UPLOAD LOGO</span>
                  </div>
                  <div className="flex gap-2">
                    {[Settings, AlignJustify, Sparkles].map((Icon, i) => (
                      <button key={i} className={`w-12 h-12 rounded-xl border flex items-center justify-center transition-all ${
                        i === 0 ? 'border-primary bg-emerald-50 text-primary' : 'border-gray-200 text-gray-400 hover:border-gray-300'
                      }`}>
                        <Icon size={18} />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Step 5: Cap Finish */}
              <div className="mb-8">
                <h3 className="flex items-center gap-2 font-bold text-gray-900 mb-4">
                  <span className="w-6 h-6 rounded-full bg-primary text-white text-xs flex items-center justify-center font-bold">5</span>
                  CAP FINISH
                </h3>
                <div className="grid grid-cols-3 gap-3">
                  {capFinishes.map((cap) => (
                    <button
                      key={cap.id}
                      onClick={() => setCapFinish(cap.id)}
                      className={`p-4 rounded-xl border-2 text-center transition-all ${
                        capFinish === cap.id
                          ? 'border-primary bg-emerald-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className={`w-12 h-12 ${cap.color} rounded-lg mx-auto mb-2`} />
                      <span className="text-xs font-bold uppercase">{cap.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Price & CTA */}
              <motion.div
                layout
                className="bg-emerald-50 border border-emerald-100 rounded-2xl p-6 flex items-center justify-between"
              >
                <div>
                  <span className="text-xs text-primary font-bold uppercase tracking-wider">Total Price</span>
                  <p className="text-3xl font-bold text-gray-900">${totalPrice.toFixed(2)} <span className="text-sm font-normal text-gray-500">/unit</span></p>
                </div>
                <button className="bg-primary hover:bg-emerald-600 text-white px-8 py-3 rounded-xl font-bold transition-colors shadow-lg">
                  REVIEW & ORDER
                </button>
              </motion.div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </PageTransition>
  )
}
