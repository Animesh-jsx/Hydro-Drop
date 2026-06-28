import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import App from './App'
import { CartProvider } from './context/CartContext'

// Mock the page components to isolate routing tests
vi.mock('./pages/HomePage', () => ({ default: () => <div data-testid="home-page" /> }))
vi.mock('./pages/AboutPage', () => ({ default: () => <div data-testid="about-page" /> }))
vi.mock('./pages/ProductsPage', () => ({ default: () => <div data-testid="products-page" /> }))
vi.mock('./pages/GalleryPage', () => ({ default: () => <div data-testid="gallery-page" /> }))
vi.mock('./pages/CustomizationPage', () => ({ default: () => <div data-testid="customization-page" /> }))
vi.mock('./pages/CertificationsPage', () => ({ default: () => <div data-testid="certifications-page" /> }))
vi.mock('./pages/BlogPage', () => ({ default: () => <div data-testid="blog-page" /> }))
vi.mock('./pages/ContactPage', () => ({ default: () => <div data-testid="contact-page" /> }))
vi.mock('./pages/CartPage', () => ({ default: () => <div data-testid="cart-page" /> }))
vi.mock('./pages/CheckoutPage', () => ({ default: () => <div data-testid="checkout-page" /> }))
vi.mock('./pages/OrderConfirmationPage', () => ({ default: () => <div data-testid="order-confirmation-page" /> }))

// Mock Layout to avoid testing Navbar/Footer which might have issues in testing environment without proper setup
vi.mock('./components/layout/Layout', () => {
  const { Outlet } = require('react-router-dom')
  return { default: () => <div data-testid="layout"><Outlet /></div> }
})

// Mock framer-motion to avoid animation issues in tests
vi.mock('framer-motion', () => ({
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  }
}))

const renderWithRouter = (initialRoute = '/') => {
  return render(
    <CartProvider>
      <MemoryRouter initialEntries={[initialRoute]}>
        <App />
      </MemoryRouter>
    </CartProvider>
  )
}

describe('App Routing', () => {
  it('renders HomePage on default route "/"', () => {
    renderWithRouter('/')
    expect(screen.getByTestId('home-page')).toBeInTheDocument()
  })

  it('renders AboutPage on "/about" route', () => {
    renderWithRouter('/about')
    expect(screen.getByTestId('about-page')).toBeInTheDocument()
  })

  it('renders ProductsPage on "/products" route', () => {
    renderWithRouter('/products')
    expect(screen.getByTestId('products-page')).toBeInTheDocument()
  })

  it('renders GalleryPage on "/gallery" route', () => {
    renderWithRouter('/gallery')
    expect(screen.getByTestId('gallery-page')).toBeInTheDocument()
  })

  it('renders CustomizationPage on "/customization" route', () => {
    renderWithRouter('/customization')
    expect(screen.getByTestId('customization-page')).toBeInTheDocument()
  })

  it('renders CertificationsPage on "/certifications" route', () => {
    renderWithRouter('/certifications')
    expect(screen.getByTestId('certifications-page')).toBeInTheDocument()
  })

  it('renders BlogPage on "/blog" route', () => {
    renderWithRouter('/blog')
    expect(screen.getByTestId('blog-page')).toBeInTheDocument()
  })

  it('renders ContactPage on "/contact" route', () => {
    renderWithRouter('/contact')
    expect(screen.getByTestId('contact-page')).toBeInTheDocument()
  })

  it('renders CartPage on "/cart" route', () => {
    renderWithRouter('/cart')
    expect(screen.getByTestId('cart-page')).toBeInTheDocument()
  })

  it('renders CheckoutPage on "/checkout" route', () => {
    renderWithRouter('/checkout')
    expect(screen.getByTestId('checkout-page')).toBeInTheDocument()
  })

  it('renders OrderConfirmationPage on "/order-confirmation" route', () => {
    renderWithRouter('/order-confirmation')
    expect(screen.getByTestId('order-confirmation-page')).toBeInTheDocument()
  })
})
