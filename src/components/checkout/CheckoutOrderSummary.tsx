import { Shield, Minus, Plus, Truck } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import type { CartProduct } from '../../context/CartContext'
import type { CheckoutStep } from './StepIndicator'

interface CheckoutOrderSummaryProps {
  items: CartProduct[]
  subtotal: number
  currentStep: CheckoutStep
  onUpdateQuantity?: (id: string, quantity: number) => void
  onRemove?: (id: string) => void
}

export default function CheckoutOrderSummary({
  items,
  subtotal,
  currentStep,
  onUpdateQuantity,
  onRemove,
}: CheckoutOrderSummaryProps) {
  const shipping = subtotal >= 100 ? 0 : 5.0
  const taxes = subtotal * 0.08
  const total = subtotal + shipping + taxes
  const showQuantityControls = currentStep === 'information'

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-xs p-5 sm:p-6 sticky top-28">
      <h2 className="font-bold text-lg sm:text-xl text-gray-900 mb-5">Order Summary</h2>

      {/* Items */}
      <div className="space-y-4 mb-5">
        <AnimatePresence mode="popLayout">
          {items.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex gap-3 sm:gap-4"
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden bg-gray-50 shrink-0">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between gap-2">
                  <div>
                    <h4 className="font-semibold text-sm text-gray-900 leading-tight">{item.name}</h4>
                    <p className="text-xs text-gray-500 mt-0.5">{item.description}</p>
                  </div>
                  <span className="font-semibold text-sm text-gray-900 whitespace-nowrap">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>

                {showQuantityControls ? (
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center border border-gray-200 rounded-md overflow-hidden">
                      <button
                        onClick={() => onUpdateQuantity?.(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                        className="w-7 h-7 flex items-center justify-center text-gray-500 hover:bg-gray-50 disabled:opacity-40 text-xs"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="w-7 h-7 flex items-center justify-center text-xs font-semibold border-x border-gray-200">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity?.(item.id, item.quantity + 1)}
                        className="w-7 h-7 flex items-center justify-center text-gray-500 hover:bg-gray-50 text-xs"
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                    <button
                      onClick={() => onRemove?.(item.id)}
                      className="text-primary text-xs font-medium hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <p className="text-xs text-gray-400 mt-1">Qty: {item.quantity}</p>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-100 pt-4 space-y-2.5">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Subtotal</span>
          <span className="font-medium text-gray-900">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Shipping</span>
          <span className={`font-medium ${shipping === 0 ? 'text-primary' : 'text-gray-900'}`}>
            {currentStep === 'information'
              ? 'Calculated at next step'
              : shipping === 0
              ? 'FREE'
              : `$${shipping.toFixed(2)}`}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Taxes</span>
          <span className="font-medium text-gray-900">${taxes.toFixed(2)}</span>
        </div>
      </div>

      {/* Total */}
      <div className="border-t border-dashed border-gray-200 mt-4 pt-4 flex justify-between items-center">
        <span className="font-bold text-gray-900">Total</span>
        <span className="font-bold text-xl text-primary">${total.toFixed(2)}</span>
      </div>

      {/* Trust Badges */}
      {currentStep === 'payment' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-5 bg-emerald-50 rounded-xl p-4"
        >
          <div className="flex items-center gap-2 mb-1.5">
            <Truck size={16} className="text-primary" />
            <span className="text-xs font-bold uppercase tracking-wider text-gray-700">Estimated Delivery</span>
          </div>
          <p className="text-sm text-gray-700">Friday, Oct 24th — Oct 26th</p>
        </motion.div>
      )}

      {currentStep !== 'payment' && (
        <div className="mt-5 bg-emerald-50 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-1">
            <Shield size={16} className="text-primary" />
            <span className="text-xs font-bold uppercase tracking-wider text-primary">Secure Checkout</span>
          </div>
          <p className="text-xs text-gray-600 leading-relaxed">
            Your data is protected by 256-bit SSL encryption. We never store your full payment details.
          </p>
        </div>
      )}

      {/* Terms */}
      {currentStep === 'information' && (
        <p className="text-xs text-gray-400 text-center mt-4 leading-relaxed">
          By continuing, you agree to Hydra Drop's{' '}
          <span className="text-primary hover:underline cursor-pointer">Terms of Service</span> and{' '}
          <span className="text-primary hover:underline cursor-pointer">Privacy Policy</span>.
        </p>
      )}
    </div>
  )
}
