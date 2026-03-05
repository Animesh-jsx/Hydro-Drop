import { Link } from 'react-router-dom'
import { ShoppingCart, Droplets } from 'lucide-react'

export default function EmptyCart() {
  return (
    <div className="text-center py-16 sm:py-24">
      {/* Illustration */}
      <div className="relative w-48 h-48 mx-auto mb-8">
        <div className="absolute inset-0 bg-gray-100 rounded-full" />
        <div className="absolute inset-4 bg-white rounded-full flex items-center justify-center shadow-sm">
          <ShoppingCart className="w-16 h-16 text-primary/40" strokeWidth={1.5} />
        </div>
        <div className="absolute bottom-2 right-4 w-10 h-10 bg-primary rounded-full flex items-center justify-center shadow-md">
          <Droplets className="w-5 h-5 text-white" />
        </div>
      </div>

      <h2 className="font-display text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
        Your cart is currently empty.
      </h2>
      <p className="text-gray-500 max-w-lg mx-auto mb-8 leading-relaxed">
        It looks like you haven't added any of our premium hydration products to your cart yet. 
        Pure refreshment is just a few clicks away.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          to="/products"
          className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-emerald-600 text-white px-8 py-3.5 rounded-xl font-semibold transition-colors shadow-md hover:shadow-lg"
        >
          <Droplets size={18} />
          Shop Our Collection
        </Link>
        <Link
          to="/products"
          className="inline-flex items-center justify-center gap-2 border border-gray-200 hover:bg-gray-50 text-gray-700 px-8 py-3.5 rounded-xl font-semibold transition-colors"
        >
          View Best Sellers
        </Link>
      </div>
    </div>
  )
}
