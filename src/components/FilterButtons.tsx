import React from 'react';

import { Filter } from '../types/types';

interface FilterButtonsProps {
  currentFilter: Filter;
  setFilter: (filter: Filter) => void;
}

const FilterButtons: React.FC<FilterButtonsProps> = ({
  currentFilter,
  setFilter,
}) => {
  return (
    <div className="filters">
      {Object.values(Filter).map((f) => (
        <button
          key={f}
          className={f === currentFilter ? 'active' : ''}
          onClick={() => setFilter(f)}
        >
          {f}
        </button>
      ))}
    </div>
  );
};

export default FilterButtons;
