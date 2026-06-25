import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProductCarousel from './ProductCarousel';
import * as matchers from '@testing-library/jest-dom/matchers';

expect.extend(matchers);

// Mock the context
vi.mock('../../context/CartContext', () => ({
  useCart: vi.fn(),
}));

import { useCart } from '../../context/CartContext';

// IntersectionObserver mock for framer-motion
class IntersectionObserverMock {
  constructor() {}
  disconnect() {}
  observe() {}
  takeRecords() { return [] }
  unobserve() {}
}
vi.stubGlobal('IntersectionObserver', IntersectionObserverMock);

describe('ProductCarousel Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  it('renders the heading correctly', () => {
    vi.mocked(useCart).mockReturnValue({ addItem: vi.fn() } as any);
    render(<ProductCarousel />);

    expect(screen.getByRole('heading', { name: /Our Range of Premium Water/i })).toBeInTheDocument();
  });

  it('renders all product cards with their details', () => {
    vi.mocked(useCart).mockReturnValue({ addItem: vi.fn() } as any);
    render(<ProductCarousel />);

    const products = [
      { name: 'Natural Mineral', tagline: 'Source Pristine' },
      { name: 'Sparkling Essence', tagline: 'Fine Carbonation' },
      { name: 'Alkaline Balance', tagline: 'pH 8.5+ Hydration' },
      { name: 'Reserve Glass', tagline: 'Limited Harvest' },
    ];

    products.forEach((product) => {
      // Use queryAllByRole and get first element, because there could be hidden ones or duplicates from Framer Motion
      const headings = screen.getAllByRole('heading', { name: product.name });
      expect(headings.length).toBeGreaterThan(0);
      expect(screen.getAllByText(product.tagline).length).toBeGreaterThan(0);
      // Test alt text on image
      expect(screen.getAllByAltText(product.name).length).toBeGreaterThan(0);
    });
  });

  it('calls addItem when "Add to Cart" button is clicked', async () => {
    const mockAddItem = vi.fn();
    vi.mocked(useCart).mockReturnValue({ addItem: mockAddItem } as any);
    const user = userEvent.setup();

    render(<ProductCarousel />);

    // Grab the buttons, use getAllByRole
    const addToCartButtons = screen.getAllByRole('button', { name: /Add to Cart/i });
    expect(addToCartButtons.length).toBeGreaterThan(0);

    await user.click(addToCartButtons[0]);

    expect(mockAddItem).toHaveBeenCalledTimes(1);
    expect(mockAddItem).toHaveBeenCalledWith(expect.objectContaining({
      id: 'natural-mineral',
      name: 'Natural Mineral',
      description: 'Source Pristine',
      price: 35.00,
    }));
  });
});
