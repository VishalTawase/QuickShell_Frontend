import React from 'react';

const DisplayOptions = ({ onGroupingChange, onSortingChange }) => {
  return (
    <div className="display-options">
      {/* Display Dropdown */}
      <div className="display-dropdown">
        <label><strong>Display</strong></label>
        <select>
          <option value="">Select an Option</option>
          <option value="options">Options</option>
        </select>

        {/* Grouping and Ordering dropdowns, shown on hover */}
        <div className="dropdown-options">
          {/* Grouping Dropdown */}
          <div className="grouping-dropdown">
            <label>Grouping</label>
            <select
              onChange={(e) => {
                const value = e.target.value;
                onGroupingChange(value);
              }}
            >
              <option value="status">By Status</option>
              <option value="user">By User</option>
              <option value="priority">By Priority</option>
            </select>
          </div>

          {/* Sorting Dropdown */}
          <div className="sorting-dropdown" style={{ marginTop: '10px' }}>
            <label>Ordering</label>
            <select
              onChange={(e) => {
                const value = e.target.value;
                onSortingChange(value);
              }}
            >
              <option value="priority-desc">Sort by Priority (Descending)</option>
              <option value="title-asc">Sort by Title (Ascending)</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisplayOptions;
