import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import App from './App';

/** Not a fan of writing tests, but I know they're useful */

describe('Todo App', () => {
  test('can add a new todo', () => {
    render(<App />);
    const input = screen.getByPlaceholderText(/what needs to be done/i);

    fireEvent.change(input, { target: { value: 'Finish task 1' } });
    fireEvent.submit(input);

    expect(screen.getByText('Finish task 1')).toBeInTheDocument();
  });

  test('can toggle todo completion', () => {
    render(<App />);
    const input = screen.getByPlaceholderText(/what needs to be done/i);

    fireEvent.change(input, { target: { value: 'Finish task 2' } });
    fireEvent.submit(input);

    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);

    expect(screen.getByText('Finish task 2')).toHaveClass('completed');
  });

  test('can filter active and completed todos', () => {
    render(<App />);
    const input = screen.getByPlaceholderText(/what needs to be done/i);

    /** Add two tasks */
    fireEvent.change(input, { target: { value: 'Task 1' } });
    fireEvent.submit(input);
    fireEvent.change(input, { target: { value: 'Task 2' } });
    fireEvent.submit(input);

    /** Complete the second */
    const checkboxes = screen.getAllByRole('checkbox');
    fireEvent.click(checkboxes[1]);

    /** Filter = Active */
    fireEvent.click(screen.getByText(/Active/i));
    expect(screen.getByText('Task 1')).toBeInTheDocument();
    expect(screen.queryByText('Task 2')).not.toBeInTheDocument();

    /** Filter = Completed */
    fireEvent.click(screen.getAllByText(/Completed/i)[0]);
    expect(screen.getByText('Task 2')).toBeInTheDocument();
    expect(screen.queryByText('Task 1')).not.toBeInTheDocument();
  });
});
