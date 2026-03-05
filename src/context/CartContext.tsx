import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'

export interface CartProduct {
  id: string
  name: string
  description: string
  price: number
  image: string
  quantity: number
}

interface CartContextType {
  items: CartProduct[]
  addItem: (product: Omit<CartProduct, 'quantity'>) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  totalItems: number
  subtotal: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

const INITIAL_CART_ITEMS: CartProduct[] = [
  {
    id: 'hydra-pure-glass',
    name: 'Hydra Pure Glass',
    description: 'Crystal Clear Edition / 750ml',
    price: 45.00,
    image: 'https://images.pexels.com/photos/3651044/pexels-photo-3651044.jpeg?auto=compress&cs=tinysrgb&w=400',
    quantity: 1,
  },
  {
    id: 'alkaline-boost-pack',
    name: 'Alkaline Boost Pack',
    description: '3-Month Supply / Bio-Filter',
    price: 29.00,
    image: 'https://images.pexels.com/photos/13779109/pexels-photo-13779109.jpeg?auto=compress&cs=tinysrgb&w=400',
    quantity: 2,
  },
]

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartProduct[]>(INITIAL_CART_ITEMS)

  const addItem = useCallback((product: Omit<CartProduct, 'quantity'>) => {
    setItems(prev => {
      const existing = prev.find(item => item.id === product.id)
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prev, { ...product, quantity: 1 }]
    })
  }, [])

  const removeItem = useCallback((id: string) => {
    setItems(prev => prev.filter(item => item.id !== id))
  }, [])

  const updateQuantity = useCallback((id: string, quantity: number) => {
    if (quantity < 1) return
    setItems(prev =>
      prev.map(item => (item.id === id ? { ...item, quantity } : item))
    )
  }, [])

  const clearCart = useCallback(() => setItems([]), [])

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, updateQuantity, clearCart, totalItems, subtotal }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart must be used within CartProvider')
  return context
}
