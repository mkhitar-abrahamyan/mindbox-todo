import React from 'react';
import { render, screen } from '@testing-library/react';

import TodoInput from '../TodoInput';

test('renders input placeholder', () => {
  render(<TodoInput onAdd={() => {}} />);
  const inputElement = screen.getByPlaceholderText(/what needs to be done/i);
  expect(inputElement).toBeInTheDocument();
});
