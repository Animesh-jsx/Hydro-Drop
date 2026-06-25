import { render, screen } from '@testing-library/react'
import HeroBanner from './HeroBanner'
import { describe, it, expect, vi } from 'vitest'

// Mock framer-motion to avoid animation issues in tests
vi.mock('framer-motion', async () => {
  const actual = await vi.importActual('framer-motion')
  return {
    ...actual,
    motion: {
      div: ({ children, className, style }: any) => <div className={className} style={style}>{children}</div>,
      h1: ({ children, className, style }: any) => <h1 className={className} style={style}>{children}</h1>,
      p: ({ children, className, style }: any) => <p className={className} style={style}>{children}</p>,
      span: ({ children, className, style }: any) => <span className={className} style={style}>{children}</span>,
    }
  }
})

describe('HeroBanner Component', () => {
  it('renders the title correctly', () => {
    const titleText = 'Welcome to Hydra Drop'
    render(<HeroBanner title={titleText} />)

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(titleText)
  })

  it('renders the subtitle when provided', () => {
    const titleText = 'Welcome'
    const subtitleText = 'The best water around'
    render(<HeroBanner title={titleText} subtitle={subtitleText} />)

    expect(screen.getByText(subtitleText)).toBeInTheDocument()
  })

  it('does not render subtitle when not provided', () => {
    const titleText = 'Welcome'
    render(<HeroBanner title={titleText} />)

    // Using queryByText because we expect it NOT to be there
    const subtitleElement = screen.queryByText('The best water around')
    expect(subtitleElement).not.toBeInTheDocument()
  })

  it('renders the label when provided', () => {
    const titleText = 'Welcome'
    const labelText = 'New Release'
    render(<HeroBanner title={titleText} label={labelText} />)

    expect(screen.getByText(labelText)).toBeInTheDocument()
  })
})
