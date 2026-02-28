import AnimatedSection from './AnimatedSection'

interface SectionHeadingProps {
  label?: string
  title: string
  subtitle?: string
  light?: boolean
  center?: boolean
}

export default function SectionHeading({ label, title, subtitle, light = false, center = true }: SectionHeadingProps) {
  return (
    <AnimatedSection className={`mb-16 ${center ? 'text-center' : ''}`}>
      {label && (
        <span className={`inline-block text-sm font-semibold tracking-widest uppercase mb-4 ${light ? 'text-primary' : 'text-primary'}`}>
          {label}
        </span>
      )}
      <h2 className={`font-display text-4xl md:text-5xl font-bold mb-4 ${light ? 'text-white' : 'text-gray-900'}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`text-lg max-w-2xl ${center ? 'mx-auto' : ''} ${light ? 'text-gray-300' : 'text-gray-600'}`}>
          {subtitle}
        </p>
      )}
    </AnimatedSection>
  )
}
