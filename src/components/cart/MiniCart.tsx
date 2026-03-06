import { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ShoppingCart, Trash2, Droplets, ArrowRight } from 'lucide-react'
import { useCart } from '../../context/CartContext'

interface MiniCartProps {
  isOpen: boolean
  onClose: () => void
}

const suggestedProducts = [
  {
    name: 'Hydra 2.0 Matte',
    price: '$45.00',
    image: 'https://images.unsplash.com/photo-1560023907-5f339617ea55?w=300&auto=format&fit=crop&q=80',
  },
  {
    name: 'Emerald Glass',
    price: '$38.00',
    image: 'https://images.unsplash.com/photo-1606168094336-48f205276929?w=300&auto=format&fit=crop&q=80',
  },
  {
    name: 'Carrying Sling',
    price: '$12.00',
    image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=300&auto=format&fit=crop&q=80',
  },
]

export default function MiniCart({ isOpen, onClose }: MiniCartProps) {
  const { items, removeItem, totalItems, subtotal } = useCart()
  const panelRef = useRef<HTMLDivElement>(null)
  const isEmpty = items.length === 0

  // Close on escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      document.addEventListener('keydown', handleEsc)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleEsc)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/30 z-[60]"
            onClick={onClose}
          />

          {/* Sidebar Panel */}
          <motion.div
            ref={panelRef}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full sm:w-[420px] bg-gray-50 z-[70] flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <ShoppingCart className="w-4 h-4 text-primary" />
                </div>
                <h2 className="font-bold text-gray-900 text-lg">
                  {isEmpty ? 'Your Cart' : 'Recently Added'}
                </h2>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors p-1"
                aria-label="Close cart"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto">
              {isEmpty ? (
                /* Empty State */
                <div className="flex flex-col items-center justify-center px-6 py-12 text-center">
                  <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-sm mb-6">
                    <ShoppingCart className="w-14 h-14 text-primary/30" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-bold text-xl text-gray-900 mb-2">Nothing here yet!</h3>
                  <p className="text-gray-500 text-sm leading-relaxed max-w-xs mb-8">
                    Your mini cart is looking a bit light. Start hydrating in style with our premium, high-performance collection.
                  </p>
                  <Link
                    to="/products"
                    onClick={onClose}
                    className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-emerald-600 text-white py-3.5 rounded-xl font-semibold transition-colors mb-3"
                  >
                    Shop Bestsellers <ArrowRight size={16} />
                  </Link>
                  <Link
                    to="/customization"
                    onClick={onClose}
                    className="w-full flex items-center justify-center gap-2 bg-primary/10 hover:bg-primary/15 text-primary py-3.5 rounded-xl font-semibold transition-colors"
                  >
                    Customize Your Bottle
                  </Link>

                  {/* Suggested Products */}
                  <div className="w-full mt-10">
                    <p className="text-xs font-semibold tracking-[0.15em] text-primary uppercase mb-4 text-left">
                      You Might Also Like
                    </p>
                    <div className="flex gap-3 overflow-x-auto pb-2 -mx-1 px-1">
                      {suggestedProducts.map((product) => (
                        <Link
                          key={product.name}
                          to="/products"
                          onClick={onClose}
                          className="shrink-0 w-32 group"
                        >
                          <div className="aspect-square rounded-xl overflow-hidden bg-gray-100 mb-2">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                          <p className="text-sm font-medium text-gray-900 truncate">{product.name}</p>
                          <p className="text-xs text-gray-500">{product.price}</p>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                /* Cart Items */
                <div className="px-6 py-4 space-y-4">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-start gap-3 bg-white rounded-xl p-3"
                    >
                      <div className="w-16 h-16 bg-emerald-50 rounded-lg overflow-hidden shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-sm text-gray-900">{item.name}</h4>
                        <p className="text-xs text-gray-500 mt-0.5">{item.description}</p>
                        <p className="text-primary font-bold text-sm mt-1">
                          ${(item.price * item.quantity).toFixed(2)}
                          {item.quantity > 1 && (
                            <span className="text-gray-400 font-normal ml-1">×{item.quantity}</span>
                          )}
                        </p>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-gray-300 hover:text-red-500 transition-colors p-1 shrink-0"
                        aria-label={`Remove ${item.name}`}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer (only when items exist) */}
            {!isEmpty && (
              <div className="border-t border-gray-200 bg-white px-6 py-5 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Total Items</span>
                  <span className="font-medium text-gray-900">{totalItems}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 text-sm">Subtotal</span>
                  <span className="font-bold text-gray-900">${subtotal.toFixed(2)}</span>
                </div>

                <Link
                  to="/cart"
                  onClick={onClose}
                  className="block w-full text-center border border-gray-200 hover:bg-gray-50 text-gray-700 py-3 rounded-xl font-semibold text-sm transition-colors"
                >
                  View Full Cart
                </Link>
                <button className="w-full bg-primary hover:bg-emerald-600 text-white py-3 rounded-xl font-semibold text-sm transition-colors">
                  Checkout Now
                </button>

                <p className="text-[11px] text-primary font-semibold tracking-wide uppercase text-center pt-1">
                  Free Shipping on Orders Over $100
                </p>
              </div>
            )}

            {/* Footer links for empty state */}
            {isEmpty && (
              <div className="border-t border-gray-200 bg-white px-6 py-3 flex items-center gap-6">
                <Link
                  to="/about"
                  onClick={onClose}
                  className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-primary transition-colors"
                >
                  <Droplets size={12} />
                  Sustainability
                </Link>
                <Link
                  to="/contact"
                  onClick={onClose}
                  className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-primary transition-colors"
                >
                  <span className="w-3 h-3 rounded-full border border-gray-400 flex items-center justify-center text-[8px]">?</span>
                  Support
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
