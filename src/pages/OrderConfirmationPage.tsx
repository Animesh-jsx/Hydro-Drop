import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  CheckCircle,
  Package,
  MapPin,
  Calendar,
  CreditCard,
  Truck,
  Download,
  ArrowLeft,
  TreePine,
} from 'lucide-react'
import PageTransition from '../components/common/PageTransition'

const orderData = {
  orderId: '#HD-98241',
  items: [
    {
      id: '1',
      name: 'Hydra Pure Glass (12-Pack)',
      description: '750ml Premium Glass Bottles',
      price: 42.0,
      quantity: 1,
      image:
        'https://images.pexels.com/photos/3651044/pexels-photo-3651044.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    {
      id: '2',
      name: 'Alkaline Boost Pack',
      description: 'pH 9.5+ Ionized Water',
      price: 38.5,
      quantity: 2,
      image:
        'https://images.pexels.com/photos/13779109/pexels-photo-13779109.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
  ],
  subtotal: 119.0,
  shipping: 'Free' as const,
  total: 119.0,
  shippingAddress: {
    name: 'Alex Harrison',
    street: '1248 Alpine Terrace',
    city: 'Aspen',
    state: 'CO',
    zip: '81611',
    country: 'United States',
    phone: '+1 (555) 012-3456',
  },
  delivery: {
    startDate: 'Tuesday, Oct 24',
    endDate: 'Thursday, Oct 26',
    method: 'Standard Eco-Shipping',
  },
  payment: {
    type: 'VISA',
    lastFour: '4421',
  },
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export default function OrderConfirmationPage() {
  return (
    <PageTransition>
      <section className="pt-24 sm:pt-28 pb-16 sm:pb-20 min-h-screen bg-bg-light">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={containerVariants} initial="hidden" animate="visible">
            {/* Success Header */}
            <motion.div variants={itemVariants} className="text-center mb-10">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 }}
                className="w-16 h-16 sm:w-20 sm:h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-5"
              >
                <CheckCircle className="w-8 h-8 sm:w-10 sm:h-10 text-white" strokeWidth={2.5} />
              </motion.div>
              <h1 className="font-display text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
                Thank You for Your Order!
              </h1>
              <p className="text-gray-500 text-sm sm:text-base">
                Order confirmed and ready for the spring.{' '}
                <span className="text-primary font-semibold">{orderData.orderId}</span>
              </p>
            </motion.div>

            {/* Two Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
              {/* Left: Order Summary */}
              <motion.div variants={itemVariants} className="lg:col-span-3">
                <div className="bg-white rounded-2xl border border-gray-100 shadow-xs p-5 sm:p-6">
                  <div className="flex items-center gap-2.5 mb-5">
                    <Package size={20} className="text-primary" />
                    <h2 className="font-bold text-lg text-gray-900">Order Summary</h2>
                  </div>

                  {/* Items */}
                  <div className="space-y-4 mb-5">
                    {orderData.items.map((item) => (
                      <div key={item.id} className="flex gap-4">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden bg-gray-50 shrink-0">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between gap-2">
                            <div>
                              <h4 className="font-semibold text-sm text-gray-900">{item.name}</h4>
                              <p className="text-xs text-primary mt-0.5">{item.description}</p>
                            </div>
                            <span className="font-semibold text-sm text-gray-900">${item.price.toFixed(2)}</span>
                          </div>
                          <p className="text-xs text-gray-400 mt-1">Qty: {item.quantity}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Pricing */}
                  <div className="border-t border-gray-100 pt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-primary">Subtotal</span>
                      <span className="text-gray-900">${orderData.subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-primary">Shipping</span>
                      <span className="text-primary font-medium">{orderData.shipping}</span>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 mt-3 pt-3 flex justify-between">
                    <span className="font-bold text-gray-900">Total</span>
                    <span className="font-bold text-gray-900">${orderData.total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-3 mt-6">
                  <Link
                    to="/"
                    className="flex-1 bg-primary hover:bg-emerald-600 text-white font-semibold py-3.5 rounded-xl transition-all shadow-md hover:shadow-lg text-sm flex items-center justify-center gap-2"
                  >
                    <Truck size={16} />
                    Track Order Status
                  </Link>
                  <button className="flex-1 bg-emerald-50 hover:bg-emerald-100 text-gray-700 font-semibold py-3.5 rounded-xl transition-all text-sm flex items-center justify-center gap-2">
                    <Download size={16} />
                    Download Invoice
                  </button>
                </motion.div>
              </motion.div>

              {/* Right: Details Cards */}
              <div className="lg:col-span-2 space-y-4">
                {/* Shipping Address */}
                <motion.div
                  variants={itemVariants}
                  className="bg-white rounded-2xl border border-gray-100 shadow-xs p-5"
                >
                  <div className="flex items-center gap-2.5 mb-4">
                    <MapPin size={18} className="text-primary" />
                    <h3 className="font-bold text-gray-900">Shipping Address</h3>
                  </div>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p className="font-semibold text-gray-900">{orderData.shippingAddress.name}</p>
                    <p>{orderData.shippingAddress.street}</p>
                    <p>
                      {orderData.shippingAddress.city}, {orderData.shippingAddress.state}{' '}
                      {orderData.shippingAddress.zip}
                    </p>
                    <p>{orderData.shippingAddress.country}</p>
                    <p className="pt-1">{orderData.shippingAddress.phone}</p>
                  </div>
                </motion.div>

                {/* Delivery Estimate */}
                <motion.div
                  variants={itemVariants}
                  className="bg-white rounded-2xl border border-gray-100 shadow-xs p-5"
                >
                  <div className="flex items-center gap-2.5 mb-4">
                    <Calendar size={18} className="text-primary" />
                    <h3 className="font-bold text-gray-900">Delivery Estimate</h3>
                  </div>
                  <div className="bg-emerald-50 rounded-xl p-3 mb-2">
                    <p className="text-sm font-semibold text-primary">
                      {orderData.delivery.startDate} - {orderData.delivery.endDate}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">{orderData.delivery.method}</p>
                  </div>
                </motion.div>

                {/* Payment Method */}
                <motion.div
                  variants={itemVariants}
                  className="bg-white rounded-2xl border border-gray-100 shadow-xs p-5"
                >
                  <div className="flex items-center gap-2.5 mb-4">
                    <CreditCard size={18} className="text-primary" />
                    <h3 className="font-bold text-gray-900">Payment Method</h3>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="px-2 py-1 bg-blue-50 rounded text-xs font-bold text-blue-700">
                      {orderData.payment.type}
                    </div>
                    <span className="text-sm text-gray-600">Ending in {orderData.payment.lastFour}</span>
                  </div>
                </motion.div>

                {/* Sustainability */}
                <motion.div variants={itemVariants} className="bg-emerald-50 rounded-2xl p-5">
                  <div className="flex items-start gap-3">
                    <TreePine size={20} className="text-primary shrink-0 mt-0.5" />
                    <p className="text-sm text-primary font-medium leading-relaxed">
                      Your order helps plant 2 trees through our sustainability initiative.
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Support Link */}
            <motion.div variants={itemVariants} className="text-center mt-10">
              <p className="text-sm text-gray-500">
                Questions about your order?{' '}
                <Link to="/contact" className="text-primary font-semibold hover:underline">
                  Contact Hydra Support
                </Link>
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </PageTransition>
  )
}
