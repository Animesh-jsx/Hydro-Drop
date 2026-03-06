import { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import PageTransition from '../components/common/PageTransition'
import StepIndicator, { type CheckoutStep } from '../components/checkout/StepIndicator'
import CheckoutOrderSummary from '../components/checkout/CheckoutOrderSummary'
import InformationStep from '../components/checkout/InformationStep'
import ShippingStep from '../components/checkout/ShippingStep'
import PaymentStep from '../components/checkout/PaymentStep'
import { useCart } from '../context/CartContext'

export default function CheckoutPage() {
  const { items, subtotal, updateQuantity, removeItem, clearCart } = useCart()
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState<CheckoutStep>('information')
  const [completedSteps, setCompletedSteps] = useState<CheckoutStep[]>([])

  const shipping = subtotal >= 100 ? 0 : 5.0
  const taxes = subtotal * 0.08
  const total = subtotal + shipping + taxes

  const markCompleted = useCallback((step: CheckoutStep) => {
    setCompletedSteps(prev => (prev.includes(step) ? prev : [...prev, step]))
  }, [])

  const goToStep = useCallback(
    (step: CheckoutStep) => {
      setCurrentStep(step)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    },
    []
  )

  const handleInformationContinue = () => {
    markCompleted('information')
    goToStep('shipping')
  }

  const handleShippingContinue = () => {
    markCompleted('shipping')
    goToStep('payment')
  }

  const handlePaymentComplete = () => {
    markCompleted('payment')
    clearCart()
    navigate('/order-confirmation')
  }

  return (
    <PageTransition>
      <section className="pt-24 sm:pt-28 pb-16 sm:pb-20 min-h-screen bg-bg-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back to Store */}
          <Link
            to="/cart"
            className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 font-medium mb-4 transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Cart
          </Link>

          {/* Step Indicator */}
          <StepIndicator
            currentStep={currentStep}
            completedSteps={completedSteps}
            onStepClick={(step) => {
              if (completedSteps.includes(step) || step === currentStep) {
                goToStep(step)
              }
            }}
          />

          {/* Content */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mt-4">
            {/* Left: Form Steps */}
            <div className="lg:col-span-3">
              <AnimatePresence mode="wait">
                {currentStep === 'information' && (
                  <InformationStep key="information" onContinue={handleInformationContinue} />
                )}
                {currentStep === 'shipping' && (
                  <ShippingStep
                    key="shipping"
                    onContinue={handleShippingContinue}
                    onBack={() => goToStep('information')}
                  />
                )}
                {currentStep === 'payment' && (
                  <PaymentStep
                    key="payment"
                    total={total}
                    onComplete={handlePaymentComplete}
                    onBack={() => goToStep('shipping')}
                  />
                )}
              </AnimatePresence>
            </div>

            {/* Right: Order Summary */}
            <div className="lg:col-span-2">
              <CheckoutOrderSummary
                items={items}
                subtotal={subtotal}
                currentStep={currentStep}
                onUpdateQuantity={updateQuantity}
                onRemove={removeItem}
              />
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  )
}
