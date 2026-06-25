import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import InquiryForm from './InquiryForm';

// Mock the AnimatedSection since we don't need to test framer-motion here
vi.mock('../common/AnimatedSection', () => {
  return {
    default: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  };
});

describe('InquiryForm Component', () => {
  it('renders all form fields correctly', () => {
    render(<InquiryForm />);

    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/mobile number/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/city/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/state/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/your requirements/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /request quote/i })).toBeInTheDocument();
  });

  it('prevents default form submission', () => {
    render(<InquiryForm />);

    const form = screen.getByRole('button', { name: /request quote/i }).closest('form');
    expect(form).toBeInTheDocument();

    if (form) {
      const submitEvent = new Event('submit', { cancelable: true, bubbles: true });
      // We spy on preventDefault to check if it gets called
      const preventDefaultSpy = vi.spyOn(submitEvent, 'preventDefault');
      fireEvent(form, submitEvent);
      expect(preventDefaultSpy).toHaveBeenCalled();
    }
  });

  it('has required attributes on form fields', () => {
    render(<InquiryForm />);

    expect(screen.getByLabelText(/full name/i)).toBeRequired();
    expect(screen.getByLabelText(/mobile number/i)).toBeRequired();
    expect(screen.getByLabelText(/email address/i)).toBeRequired();
    expect(screen.getByLabelText(/city/i)).toBeRequired();
    expect(screen.getByLabelText(/state/i)).toBeRequired();
    expect(screen.getByLabelText(/your requirements/i)).toBeRequired();
  });
});
