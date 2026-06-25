import React from 'react'
import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import Layout from './Layout'
import '@testing-library/jest-dom/vitest'

// Mock the child components to simplify testing
vi.mock('./Navbar', () => ({
  default: () => <nav data-testid="navbar">Mock Navbar</nav>
}))

vi.mock('./Footer', () => ({
  default: () => <footer data-testid="footer">Mock Footer</footer>
}))

describe('Layout component', () => {
  it('renders Navbar, Footer and Outlet content correctly', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<div data-testid="outlet-content">Home Page Content</div>} />
          </Route>
        </Routes>
      </MemoryRouter>
    )

    // Check if Navbar is rendered
    expect(screen.getByTestId('navbar')).toBeInTheDocument()

    // Check if Footer is rendered
    expect(screen.getByTestId('footer')).toBeInTheDocument()

    // Check if Outlet content is rendered
    expect(screen.getByTestId('outlet-content')).toBeInTheDocument()
    expect(screen.getByText('Home Page Content')).toBeInTheDocument()
  })
})
