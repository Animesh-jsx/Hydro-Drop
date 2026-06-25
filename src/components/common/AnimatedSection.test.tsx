import React from 'react'
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import AnimatedSection from './AnimatedSection'

describe('AnimatedSection', () => {
  it('renders children correctly', () => {
    render(
      <AnimatedSection>
        <div data-testid="child">Test Child</div>
      </AnimatedSection>
    )

    expect(screen.getByTestId('child')).toBeInTheDocument()
    expect(screen.getByText('Test Child')).toBeInTheDocument()
  })

  it('applies custom className', () => {
    const { container } = render(
      <AnimatedSection className="custom-test-class">
        <div>Content</div>
      </AnimatedSection>
    )

    expect(container.firstChild).toHaveClass('custom-test-class')
  })

  it('handles default props correctly', () => {
    const { container } = render(
      <AnimatedSection>
        <div>Content</div>
      </AnimatedSection>
    )

    // Motion adds specific inline styles for animation
    const motionDiv = container.firstChild as HTMLElement
    expect(motionDiv).toBeInTheDocument()

    // Check initial animation state from direction='up'
    // Framer motion applies styles inline, opacity should be 0 initially
    expect(motionDiv).toHaveStyle({ opacity: '0' })
  })

  it('handles different directions', () => {
    const { container } = render(
      <AnimatedSection direction="left">
        <div>Content</div>
      </AnimatedSection>
    )

    const motionDiv = container.firstChild as HTMLElement
    expect(motionDiv).toBeInTheDocument()
    expect(motionDiv).toHaveStyle({ opacity: '0' })
  })

  it('handles custom delay', () => {
    const { container } = render(
      <AnimatedSection delay={0.5}>
        <div>Content</div>
      </AnimatedSection>
    )

    const motionDiv = container.firstChild as HTMLElement
    expect(motionDiv).toBeInTheDocument()
  })
})
