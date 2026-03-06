import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, MapPin } from 'lucide-react'

interface ShippingStepProps {
  onContinue: () => void
  onBack: () => void
}

export default function ShippingStep({ onContinue, onBack }: ShippingStepProps) {
  const [form, setForm] = useState({
    fullName: '',
    streetAddress: '',
    city: '',
    pincode: '',
    phone: '',
  })

  const updateField = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onContinue()
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      <form onSubmit={handleSubmit}>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-xs p-5 sm:p-8">
          {/* Header */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <MapPin size={16} className="text-white" />
            </div>
            <h2 className="font-bold text-lg sm:text-xl text-gray-900">Shipping Details</h2>
          </div>

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name</label>
              <input
                type="text"
                placeholder="e.g. Alexander Pierce"
                value={form.fullName}
                onChange={(e) => updateField('fullName', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Street Address</label>
              <input
                type="text"
                placeholder="123 Hydration Way"
                value={form.streetAddress}
                onChange={(e) => updateField('streetAddress', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">City</label>
                <input
                  type="text"
                  placeholder="New York"
                  value={form.city}
                  onChange={(e) => updateField('city', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Pincode / ZIP</label>
                <input
                  type="text"
                  placeholder="10001"
                  value={form.pincode}
                  onChange={(e) => updateField('pincode', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone Number</label>
              <div className="flex">
                <div className="flex items-center px-3 bg-gray-50 border border-r-0 border-gray-300 rounded-l-lg text-sm text-gray-500 font-medium">
                  +1
                </div>
                <input
                  type="tel"
                  placeholder="(555) 000-0000"
                  value={form.phone}
                  onChange={(e) => updateField('phone', e.target.value)}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-r-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3 mt-8">
            <button
              type="submit"
              className="w-full sm:w-auto bg-primary hover:bg-emerald-600 text-white font-semibold py-3.5 px-8 rounded-xl transition-all shadow-md hover:shadow-lg text-sm flex items-center justify-center gap-2 group"
            >
              Continue to Delivery
              <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
            </button>
            <button
              type="button"
              onClick={onBack}
              className="text-sm text-gray-500 hover:text-gray-700 font-medium transition-colors"
            >
              ← Back to Information
            </button>
          </div>
        </div>
      </form>
    </motion.div>
  )
}
