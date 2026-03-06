import { Check } from 'lucide-react'
import { motion } from 'framer-motion'

export type CheckoutStep = 'information' | 'shipping' | 'payment'

const steps: { key: CheckoutStep; label: string; number: number }[] = [
  { key: 'information', label: 'Information', number: 1 },
  { key: 'shipping', label: 'Shipping', number: 2 },
  { key: 'payment', label: 'Payment', number: 3 },
]

interface StepIndicatorProps {
  currentStep: CheckoutStep
  completedSteps: CheckoutStep[]
  onStepClick?: (step: CheckoutStep) => void
}

export default function StepIndicator({ currentStep, completedSteps, onStepClick }: StepIndicatorProps) {
  const currentIndex = steps.findIndex(s => s.key === currentStep)

  return (
    <div className="flex items-center justify-center w-full max-w-lg mx-auto py-6 sm:py-8">
      {steps.map((step, index) => {
        const isCompleted = completedSteps.includes(step.key)
        const isActive = step.key === currentStep
        const isClickable = isCompleted || isActive

        return (
          <div key={step.key} className="flex items-center flex-1 last:flex-none">
            {/* Step Circle + Label */}
            <button
              onClick={() => isClickable && onStepClick?.(step.key)}
              disabled={!isClickable}
              className={`flex flex-col items-center gap-1.5 group ${
                isClickable ? 'cursor-pointer' : 'cursor-default'
              }`}
            >
              <motion.div
                initial={false}
                animate={{
                  scale: isActive ? 1.05 : 1,
                  backgroundColor: isCompleted ? '#10B981' : isActive ? '#10B981' : '#E5E7EB',
                }}
                transition={{ duration: 0.3 }}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-sm font-bold shadow-xs"
              >
                {isCompleted ? (
                  <Check className="w-4 h-4 sm:w-5 sm:h-5 text-white" strokeWidth={3} />
                ) : (
                  <span className={isActive ? 'text-white' : 'text-gray-500'}>
                    {step.number}
                  </span>
                )}
              </motion.div>
              <span
                className={`text-[10px] sm:text-xs font-semibold uppercase tracking-wider ${
                  isCompleted || isActive ? 'text-primary' : 'text-gray-400'
                }`}
              >
                {step.label}
              </span>
            </button>

            {/* Connector Line */}
            {index < steps.length - 1 && (
              <div className="flex-1 h-0.5 mx-2 sm:mx-4 relative bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: index < currentIndex || isCompleted ? '100%' : '0%' }}
                  transition={{ duration: 0.5, ease: 'easeInOut' }}
                  className="absolute inset-y-0 left-0 bg-primary rounded-full"
                />
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
