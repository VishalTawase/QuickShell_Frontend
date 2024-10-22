import React from 'react';

const GroupingOptions = ({ onGroupingChange }) => {
  return (
    <div className="grouping-options">
      <label htmlFor="grouping-select">Grouping:</label>
      <select
        id="grouping-select"
        onChange={(e) => onGroupingChange(e.target.value)}
      >
        <option value="status">By Status</option>
        <option value="user">By User</option>
        <option value="priority">By Priority</option>
      </select>
    </div>
  );
};

export default GroupingOptions;
