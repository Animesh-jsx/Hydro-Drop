import { render, screen, fireEvent, act, waitFor } from '@testing-library/react'
import { MemoryRouter, useLocation } from 'react-router-dom'
import { describe, it, expect, vi, beforeAll } from 'vitest'
import Navbar from './Navbar'
import { CartProvider } from '../../context/CartContext'

// Mock framer-motion to avoid animation issues in tests
vi.mock('framer-motion', async () => {
  const actual: any = await vi.importActual('framer-motion')
  return {
    ...actual,
    AnimatePresence: ({ children }: any) => <>{children}</>,
    motion: {
      ...actual.motion,
      nav: require('react').forwardRef(({ children, ...props }: any, ref: any) => {
        // remove framer-motion specific props that might cause warnings
        const { initial, animate, exit, transition, ...validProps } = props
        return <nav ref={ref} {...validProps}>{children}</nav>
      }),
      div: require('react').forwardRef(({ children, ...props }: any, ref: any) => {
        const { initial, animate, exit, transition, layoutId, ...validProps } = props
        return <div ref={ref} {...validProps}>{children}</div>
      })
    }
  }
})

// Polyfill window.scrollTo to prevent jsdom errors
beforeAll(() => {
  window.scrollTo = vi.fn()
})

const LocationDisplay = () => {
  const location = useLocation()
  return <div data-testid="location-display">{location.pathname}</div>
}

const renderWithContext = (component: React.ReactNode, initialEntries = ['/']) => {
  return render(
    <CartProvider>
      <MemoryRouter initialEntries={initialEntries}>
        {component}
        <LocationDisplay />
      </MemoryRouter>
    </CartProvider>
  )
}

describe('Navbar Component', () => {
  it('renders standard navigation links', () => {
    renderWithContext(<Navbar />)

    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('About Us')).toBeInTheDocument()
    expect(screen.getByText('Products')).toBeInTheDocument()
    expect(screen.getByText('Contact Us')).toBeInTheDocument()
  })

  it('updates route when a nav link is clicked', async () => {
    renderWithContext(<Navbar />)

    expect(screen.getByTestId('location-display')).toHaveTextContent('/')

    const aboutLinks = screen.getAllByRole('link', { name: /About Us/i })

    await act(async () => {
      fireEvent.click(aboutLinks[0])
    })

    expect(screen.getByTestId('location-display')).toHaveTextContent('/about')
  })

  it('applies scrolled class when window is scrolled', () => {
    renderWithContext(<Navbar />)

    // Initial state
    const nav = screen.getByRole('navigation')
    expect(nav).toHaveClass('bg-transparent')

    // Simulate scroll
    act(() => {
      window.scrollY = 50
      window.dispatchEvent(new Event('scroll'))
    })

    expect(nav).toHaveClass('glass-panel')
    expect(nav).toHaveClass('shadow-lg')
    expect(nav).not.toHaveClass('bg-transparent')
  })

  it('opens and closes mobile menu', async () => {
    renderWithContext(<Navbar />)

    const menuButton = screen.getByLabelText('Open menu')
    expect(menuButton).toBeInTheDocument()

    await act(async () => {
      fireEvent.click(menuButton)
    })

    const closeButton = screen.getByLabelText('Close menu')
    expect(closeButton).toBeInTheDocument()

    await act(async () => {
      fireEvent.click(closeButton)
    })

    expect(screen.getByLabelText('Open menu')).toBeInTheDocument()
  })

  it('closes mobile menu on route change', async () => {
    renderWithContext(<Navbar />)

    const menuButton = screen.getByLabelText('Open menu')
    await act(async () => {
      fireEvent.click(menuButton)
    })
    expect(screen.getByLabelText('Close menu')).toBeInTheDocument()

    const mobileAboutLink = screen.getAllByRole('link', { name: /About Us/i })[1]

    await act(async () => {
      fireEvent.click(mobileAboutLink)
    })

    await waitFor(() => {
        expect(screen.getByLabelText('Open menu')).toBeInTheDocument()
    })
  })

  it('opens mini cart', async () => {
    renderWithContext(<Navbar />)

    const cartButton = screen.getByLabelText('Shopping Cart')

    await act(async () => {
        fireEvent.click(cartButton)
    })

    await waitFor(() => {
        expect(screen.getByLabelText('Close cart')).toBeInTheDocument()
    })
  })
})
