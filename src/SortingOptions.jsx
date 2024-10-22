import React from 'react';

const SortingOptions = ({ onSortingChange }) => {
  return (
    <div className="sorting-options">
      <label htmlFor="sorting-select">Ordering:</label>
      <select
        id="sorting-select"
        onChange={(e) => onSortingChange(e.target.value)}
      >
        <option value="priority-desc">Sort by Priority (Descending)</option>
        <option value="title-asc">Sort by Title (Ascending)</option>
      </select>
    </div>
  );
};

export default SortingOptions;
