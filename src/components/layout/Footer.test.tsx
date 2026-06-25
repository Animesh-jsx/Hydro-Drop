import React from 'react';
import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom/vitest';
import Footer from './Footer';

describe('Footer Component', () => {
  afterEach(() => {
    cleanup();
  });

  const renderFooter = () => {
    return render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );
  };

  it('renders the brand name', () => {
    renderFooter();
    expect(screen.getByText('Hydra Drop')).toBeInTheDocument();
  });

  it('renders company links', () => {
    renderFooter();
    expect(screen.getByText('Company')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'About Us' })).toHaveAttribute('href', '/about');
    expect(screen.getByRole('link', { name: 'Our Team' })).toHaveAttribute('href', '/about');
    expect(screen.getByRole('link', { name: 'Careers' })).toHaveAttribute('href', '/about');
    expect(screen.getByRole('link', { name: 'News & Press' })).toHaveAttribute('href', '/blog');
  });

  it('renders support links', () => {
    renderFooter();
    expect(screen.getByText('Support')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Contact Us' })).toHaveAttribute('href', '/contact');
    expect(screen.getByRole('link', { name: 'FAQ' })).toHaveAttribute('href', '/contact');
    expect(screen.getByRole('link', { name: 'Shipping & Returns' })).toHaveAttribute('href', '/contact');
  });

  it('renders subscription form', () => {
    renderFooter();
    expect(screen.getByText('Stay Hydrated')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Your email')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Go' })).toBeInTheDocument();
  });
});
