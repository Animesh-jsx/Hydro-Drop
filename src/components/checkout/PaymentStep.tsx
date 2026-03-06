import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowRight,
  CreditCard,
  Lock,
  QrCode,
  Banknote,
  Smartphone,
  Plus,
  Wallet,
} from 'lucide-react'

type PaymentMethod = 'upi' | 'card' | 'cod'
type UpiApp = 'gpay' | 'phonepe' | 'paytm' | 'amazonpay' | 'other'

interface PaymentStepProps {
  total: number
  onComplete: () => void
  onBack: () => void
}

const upiApps: { key: UpiApp; name: string; icon: React.ReactNode; color: string }[] = [
  { key: 'gpay', name: 'GPay', icon: <Wallet size={22} />, color: '#4285F4' },
  { key: 'phonepe', name: 'PhonePe', icon: <Smartphone size={22} />, color: '#5F259F' },
  { key: 'paytm', name: 'Paytm', icon: <Wallet size={22} />, color: '#00BAF2' },
  { key: 'amazonpay', name: 'Amazon Pay', icon: <CreditCard size={22} />, color: '#FF9900' },
  { key: 'other', name: 'Other', icon: <Plus size={22} />, color: '#6B7280' },
]

export default function PaymentStep({ total, onComplete, onBack }: PaymentStepProps) {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('upi')
  const [selectedUpi, setSelectedUpi] = useState<UpiApp>('gpay')
  const [cardForm, setCardForm] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
    saveCard: true,
  })

  const updateCardField = (field: string, value: string | boolean) => {
    setCardForm(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onComplete()
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      <form onSubmit={handleSubmit}>
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-gray-900">Select Payment Method</h2>
          <div className="flex items-center gap-1.5 bg-emerald-50 px-3 py-1.5 rounded-full">
            <Lock size={13} className="text-primary" />
            <span className="text-xs font-semibold text-primary uppercase tracking-wide">Secure Checkout</span>
          </div>
        </div>

        {/* UPI Payment */}
        <div
          onClick={() => setPaymentMethod('upi')}
          className={`rounded-2xl border-2 p-5 sm:p-6 mb-4 cursor-pointer transition-all ${
            paymentMethod === 'upi' ? 'border-primary bg-white shadow-xs' : 'border-gray-100 bg-white'
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  paymentMethod === 'upi' ? 'border-primary' : 'border-gray-300'
                }`}
              >
                {paymentMethod === 'upi' && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
              </div>
              <span className="font-semibold text-gray-900">UPI Payment</span>
            </div>
            <QrCode size={20} className="text-gray-400" />
          </div>

          <AnimatePresence>
            {paymentMethod === 'upi' && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 sm:gap-3">
                  {upiApps.map((app) => (
                    <button
                      key={app.key}
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        setSelectedUpi(app.key)
                      }}
                      className={`flex flex-col items-center gap-2 p-3 sm:p-4 rounded-xl border-2 transition-all ${
                        selectedUpi === app.key
                          ? 'border-primary bg-emerald-50'
                          : 'border-gray-100 hover:border-gray-200'
                      }`}
                    >
                      <div style={{ color: app.color }}>{app.icon}</div>
                      <span className="text-xs font-medium text-gray-700">{app.name}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Credit / Debit Card */}
        <div
          onClick={() => setPaymentMethod('card')}
          className={`rounded-2xl border-2 p-5 sm:p-6 mb-4 cursor-pointer transition-all ${
            paymentMethod === 'card' ? 'border-primary bg-white shadow-xs' : 'border-gray-100 bg-white'
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  paymentMethod === 'card' ? 'border-primary' : 'border-gray-300'
                }`}
              >
                {paymentMethod === 'card' && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
              </div>
              <span className="font-semibold text-gray-900">Credit / Debit Card</span>
            </div>
            <CreditCard size={20} className="text-gray-400" />
          </div>

          <AnimatePresence>
            {paymentMethod === 'card' && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="space-y-4" onClick={(e) => e.stopPropagation()}>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">
                      Card Number
                    </label>
                    <input
                      type="text"
                      placeholder="XXXX XXXX XXXX 4242"
                      value={cardForm.cardNumber}
                      onChange={(e) => updateCardField('cardNumber', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        placeholder="MM / YY"
                        value={cardForm.expiryDate}
                        onChange={(e) => updateCardField('expiryDate', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">
                        CVV
                      </label>
                      <input
                        type="password"
                        placeholder="***"
                        maxLength={4}
                        value={cardForm.cvv}
                        onChange={(e) => updateCardField('cvv', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">
                      Cardholder Name
                    </label>
                    <input
                      type="text"
                      placeholder="Johnathan Doe"
                      value={cardForm.cardholderName}
                      onChange={(e) => updateCardField('cardholderName', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                    />
                  </div>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <button
                      type="button"
                      onClick={() => updateCardField('saveCard', !cardForm.saveCard)}
                      className={`relative w-11 h-6 rounded-full transition-colors ${
                        cardForm.saveCard ? 'bg-primary' : 'bg-gray-300'
                      }`}
                    >
                      <motion.div
                        animate={{ x: cardForm.saveCard ? 20 : 2 }}
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                        className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-xs"
                      />
                    </button>
                    <span className="text-sm text-gray-600">Save card for future payments</span>
                  </label>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Cash on Delivery */}
        <div
          onClick={() => setPaymentMethod('cod')}
          className={`rounded-2xl border-2 p-5 sm:p-6 mb-8 cursor-pointer transition-all ${
            paymentMethod === 'cod' ? 'border-primary bg-white shadow-xs' : 'border-gray-100 bg-white'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  paymentMethod === 'cod' ? 'border-primary' : 'border-gray-300'
                }`}
              >
                {paymentMethod === 'cod' && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
              </div>
              <span className="font-semibold text-gray-900">Cash on Delivery (COD)</span>
            </div>
            <Banknote size={20} className="text-gray-400" />
          </div>
        </div>

        {/* Pay Button */}
        <button
          type="submit"
          className="w-full bg-primary hover:bg-emerald-600 text-white font-semibold py-4 rounded-xl transition-all shadow-md hover:shadow-lg text-sm flex items-center justify-center gap-2 group"
        >
          Pay ${total.toFixed(2)}
          <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
        </button>

        <button
          type="button"
          onClick={onBack}
          className="w-full text-center mt-4 text-sm text-gray-500 hover:text-gray-700 font-medium transition-colors"
        >
          ← Back to Shipping
        </button>
      </form>
    </motion.div>
  )
}
