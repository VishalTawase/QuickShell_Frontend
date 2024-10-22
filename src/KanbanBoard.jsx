import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles.css';
import DisplayOptions from './DisplayOptions'; // Import the new DisplayOptions component

const KanbanBoard = () => {
  const [tickets, setTickets] = useState([]);
  const [grouping, setGrouping] = useState('status'); // Default grouping by status
  const [sorting, setSorting] = useState('priority-desc'); // Default sorting by priority

  // Priority level mapping to display names
  const priorityMap = {
    4: 'Urgent',
    3: 'High',
    2: 'Medium',
    1: 'Low',
    0: 'No priority',
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('https://api.quicksell.co/v1/internal/frontend-assignment');
      setTickets(response.data.tickets);
    };

    fetchData();
  }, []);

  // Grouping and Sorting change handlers
  const handleGroupingChange = (selectedGrouping) => {
    setGrouping(selectedGrouping);
  };

  const handleSortingChange = (selectedSorting) => {
    setSorting(selectedSorting);
  };

  // Sort tickets based on selected sorting criteria
  const getSortedTickets = () => {
    let sortedTickets = [...tickets];

    if (sorting === 'priority-desc') {
      sortedTickets.sort((a, b) => b.priority - a.priority);
    } else if (sorting === 'title-asc') {
      sortedTickets.sort((a, b) => a.title.localeCompare(b.title));
    }

    return sortedTickets;
  };

  // Group tickets based on selected grouping criteria
  const getGroupedTickets = () => {
    const sortedTickets = getSortedTickets();

    if (grouping === 'status') {
      return sortedTickets.reduce((groups, ticket) => {
        groups[ticket.status] = groups[ticket.status] || [];
        groups[ticket.status].push(ticket);
        return groups;
      }, {});
    } else if (grouping === 'user') {
      return sortedTickets.reduce((groups, ticket) => {
        groups[ticket.userId] = groups[ticket.userId] || [];
        groups[ticket.userId].push(ticket);
        return groups;
      }, {});
    } else if (grouping === 'priority') {
      return sortedTickets.reduce((groups, ticket) => {
        groups[ticket.priority] = groups[ticket.priority] || [];
        groups[ticket.priority].push(ticket);
        return groups;
      }, {});
    }

    return sortedTickets;
  };

  const groupedTickets = getGroupedTickets();
  const groupKeys = Object.keys(groupedTickets); // Dynamically get unique values for the selected grouping

  return (
    <div className="kanban-board">
      {/* Display Options Dropdown */}
      <div className="options">
        <DisplayOptions
          onGroupingChange={handleGroupingChange}
          onSortingChange={handleSortingChange}
        />
      </div>

      {/* Ticket Groups */}
      <div className="ticket-groups">
        <div className="ticket-group-row" style={{ display: 'flex' }}>
          {groupKeys.map((group) => {
            // If grouping is by priority, use the priorityMap to display the correct name
            const groupTitle = grouping === 'priority' ? priorityMap[group] : group;

            return (
              <div key={group} className="ticket-group" style={{ margin: '0 20px', width: '300px' }}>
                <h3>{groupTitle}</h3>
                <div>
                  {groupedTickets[group].length > 0 ? (
                    groupedTickets[group].map((ticket) => (
                      <div key={ticket.id} className="ticket" style={{ border: '1px solid #ccc', marginBottom: '10px', padding: '10px' }}>
                        <h4>{ticket.title}</h4>
                        {/* Display priority as a name using priorityMap */}
                        <p>Priority: {priorityMap[ticket.priority]}</p>
                        <p>User: {ticket.userId}</p>
                      </div>
                    ))
                  ) : (
                    <p>No tickets</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default KanbanBoard;
