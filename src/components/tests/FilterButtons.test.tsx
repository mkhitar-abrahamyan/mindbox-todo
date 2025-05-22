import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import FilterButtons from '../FilterButtons';
import { Filter } from '../../types/types';

test('calls onFilterChange with selected filter', () => {
  const handleFilterChange = jest.fn();

  render(
    <FilterButtons currentFilter={Filter.All} setFilter={handleFilterChange} />,
  );

  fireEvent.click(screen.getByText(/completed/i));
  expect(handleFilterChange).toHaveBeenCalledWith(Filter.Completed);
});
