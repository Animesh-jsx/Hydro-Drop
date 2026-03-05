import { Minus, Plus, Trash2 } from 'lucide-react'
import type { CartProduct } from '../../context/CartContext'

interface CartItemProps {
  item: CartProduct
  onUpdateQuantity: (id: string, quantity: number) => void
  onRemove: (id: string) => void
}

export default function CartItem({ item, onUpdateQuantity, onRemove }: CartItemProps) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 p-4 sm:p-6 bg-white rounded-2xl border border-gray-100 shadow-xs">
      {/* Product Image */}
      <div className="w-full sm:w-28 h-40 sm:h-28 bg-emerald-50 rounded-xl overflow-hidden shrink-0">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Product Info */}
      <div className="flex-1 min-w-0 w-full">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="font-semibold text-gray-900 text-base">{item.name}</h3>
            <p className="text-sm text-gray-500 mt-0.5">{item.description}</p>
          </div>
          <span className="text-primary font-bold text-lg whitespace-nowrap">
            ${item.price.toFixed(2)}
          </span>
        </div>

        {/* Quantity & Remove */}
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
            <button
              onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
              disabled={item.quantity <= 1}
              className="w-9 h-9 flex items-center justify-center text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              aria-label="Decrease quantity"
            >
              <Minus size={14} />
            </button>
            <span className="w-10 h-9 flex items-center justify-center text-sm font-semibold text-gray-900 border-x border-gray-200">
              {item.quantity}
            </span>
            <button
              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
              className="w-9 h-9 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors"
              aria-label="Increase quantity"
            >
              <Plus size={14} />
            </button>
          </div>

          <button
            onClick={() => onRemove(item.id)}
            className="flex items-center gap-1.5 text-red-500 hover:text-red-600 text-sm font-medium transition-colors"
          >
            <Trash2 size={14} />
            <span>Remove</span>
          </button>
        </div>
      </div>
    </div>
  )
}
