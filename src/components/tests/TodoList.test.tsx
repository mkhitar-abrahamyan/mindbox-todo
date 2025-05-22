import React from 'react';
import { render, screen } from '@testing-library/react';

import TodoList from '../TodoList';

test('renders list of todos', () => {
  const todos = [
    { id: 1, text: 'Task 1', completed: false },
    { id: 2, text: 'Task 2', completed: true },
  ];

  render(<TodoList todos={todos} onToggle={() => {}} />);

  expect(screen.getByText('Task 1')).toBeInTheDocument();
  expect(screen.getByText('Task 2')).toBeInTheDocument();
});
