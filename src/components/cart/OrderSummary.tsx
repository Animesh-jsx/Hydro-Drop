import { useNavigate } from 'react-router-dom'
import { Shield, Truck } from 'lucide-react'

interface OrderSummaryProps {
  subtotal: number
}

const FREE_SHIPPING_THRESHOLD = 100

export default function OrderSummary({ subtotal }: OrderSummaryProps) {
  const navigate = useNavigate()
  const isFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD
  const estimatedTaxes = subtotal * 0.08
  const total = subtotal + estimatedTaxes

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-xs p-6 sticky top-28">
      <h2 className="font-bold text-xl text-gray-900 mb-6">Order Summary</h2>

      <div className="space-y-4">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-semibold text-gray-900">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Estimated Shipping</span>
          <span className={`font-semibold ${isFreeShipping ? 'text-primary' : 'text-gray-900'}`}>
            {isFreeShipping ? 'FREE' : '$9.99'}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Estimated Taxes</span>
          <span className="font-semibold text-gray-900">${estimatedTaxes.toFixed(2)}</span>
        </div>

        <div className="border-t border-gray-100 pt-4 flex justify-between">
          <span className="font-bold text-gray-900">Total</span>
          <span className="font-bold text-primary text-lg">
            ${(isFreeShipping ? total : total + 9.99).toFixed(2)}
          </span>
        </div>
      </div>

      <button
        onClick={() => navigate('/checkout')}
        className="w-full mt-6 bg-primary hover:bg-emerald-600 text-white font-semibold py-3.5 rounded-xl transition-colors shadow-md hover:shadow-lg text-sm"
      >
        Proceed to Checkout
      </button>

      <p className="text-xs text-gray-400 text-center mt-3 leading-relaxed">
        By proceeding to checkout, you agree to our{' '}
        <span className="text-primary cursor-pointer hover:underline">Terms of Service</span> and{' '}
        <span className="text-primary cursor-pointer hover:underline">Privacy Policy</span>.
      </p>

      <div className="mt-6 space-y-3">
        <div className="flex items-center gap-2.5 text-sm text-gray-600">
          <Shield size={16} className="text-primary shrink-0" />
          <span>Secure SSL Encrypted Checkout</span>
        </div>
        <div className="flex items-center gap-2.5 text-sm text-gray-600">
          <Truck size={16} className="text-primary shrink-0" />
          <span>Fast & Reliable Worldwide Delivery</span>
        </div>
      </div>
    </div>
  )
}
