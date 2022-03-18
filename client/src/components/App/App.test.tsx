import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '.';

test('renders learn react link', () => {
  render(<App />, { wrapper: MemoryRouter });
  expect(screen.getByText(/enter website/i)).toBeInTheDocument();
});
