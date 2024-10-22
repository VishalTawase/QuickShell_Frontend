import React from 'react';

const Ticket = ({ ticket }) => {
  const priorityLabels = {
    4: 'Urgent',
    3: 'High',
    2: 'Medium',
    1: 'Low',
    0: 'No priority'
  };

  return (
    <div className="ticket-card">
      <div className="ticket-card-header">
        <div className="ticket-title">{ticket.title}</div>
        <div className="ticket-priority">{priorityLabels[ticket.priority]}</div>
      </div>
      <div className="ticket-card-body">
        <div className="ticket-status">{ticket.status}</div>
        <div className="ticket-assigned-to">{ticket.userId}</div>
      </div>
    </div>
  );
};

export default Ticket;