import { BadgeCheck } from 'lucide-react'
import PageTransition from '../components/common/PageTransition'
import CartItem from '../components/cart/CartItem'
import OrderSummary from '../components/cart/OrderSummary'
import EmptyCart from '../components/cart/EmptyCart'
import TrendingProducts from '../components/cart/TrendingProducts'
import { useCart } from '../context/CartContext'

const FREE_SHIPPING_THRESHOLD = 100

export default function CartPage() {
  const { items, removeItem, updateQuantity, subtotal } = useCart()
  const isEmpty = items.length === 0

  return (
    <PageTransition>
      <section className="pt-28 sm:pt-32 pb-16 sm:pb-20 min-h-screen bg-bg-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isEmpty ? (
            <>
              <EmptyCart />
              <TrendingProducts />
            </>
          ) : (
            <>
              {/* Header */}
              <div className="mb-8">
                <h1 className="font-display text-3xl sm:text-4xl font-bold text-gray-900">
                  Your Shopping Cart
                </h1>
                <p className="text-gray-500 mt-2">
                  Review your items before proceeding to checkout
                </p>
              </div>

              {/* Cart Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Cart Items */}
                <div className="lg:col-span-2 space-y-4">
                  {items.map((item) => (
                    <CartItem
                      key={item.id}
                      item={item}
                      onUpdateQuantity={updateQuantity}
                      onRemove={removeItem}
                    />
                  ))}

                  {/* Free Shipping Notice */}
                  {subtotal >= FREE_SHIPPING_THRESHOLD && (
                    <div className="flex items-center gap-2 text-sm text-primary mt-4">
                      <BadgeCheck size={18} />
                      <span>Free shipping on orders over ${FREE_SHIPPING_THRESHOLD.toFixed(2)}</span>
                    </div>
                  )}
                </div>

                {/* Order Summary */}
                <div>
                  <OrderSummary subtotal={subtotal} />
                </div>
              </div>
            </>
          )}
        </div>
      </section>
    </PageTransition>
  )
}
