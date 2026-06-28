/// <reference types="@testing-library/jest-dom" />
import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ContactPage from './ContactPage';

describe('ContactPage Form', () => {
  const renderContactPage = () => {
    return render(
      <BrowserRouter>
        <ContactPage />
      </BrowserRouter>
    );
  };

  it('renders all form labels correctly', () => {
    renderContactPage();

    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('Phone Number')).toBeInTheDocument();
    expect(screen.getByText('Subject')).toBeInTheDocument();
    expect(screen.getByText('Message')).toBeInTheDocument();
  });

  it('renders all corresponding input fields', () => {
    renderContactPage();

    // Use getAllByPlaceholderText for potential multiple matches
    const nameInputs = screen.getAllByPlaceholderText('John Doe');
    expect(nameInputs.length).toBeGreaterThan(0);

    const emailInputs = screen.getAllByPlaceholderText('john@example.com');
    expect(emailInputs.length).toBeGreaterThan(0);

    const phoneInputs = screen.getAllByPlaceholderText('+1 (555) 000-0000');
    expect(phoneInputs.length).toBeGreaterThan(0);

    const subjectInputs = screen.getAllByPlaceholderText('Inquiry about...');
    expect(subjectInputs.length).toBeGreaterThan(0);

    const messageInputs = screen.getAllByPlaceholderText('How can we help you?');
    expect(messageInputs.length).toBeGreaterThan(0);
  });

  it('renders the Send Message submit button', () => {
    renderContactPage();

    const submitButtons = screen.getAllByRole('button', { name: /Send Message/i });
    expect(submitButtons.length).toBeGreaterThan(0);
    expect(submitButtons[0]).toHaveAttribute('type', 'submit');
  });
});
