import React from 'react';
import ComplaintCard from './ComplaintCard';
import './ComplaintList.css';

function ComplaintList({ complaints }) {
  if (complaints.length === 0) {
    return <p className="no-complaints">You have no complaints in this category.</p>;
  }

  return (
    <div className="complaint-list">
      {complaints.map(complaint => (
        <ComplaintCard key={complaint.id} complaint={complaint} />
      ))}
    </div>
  );
}

export default ComplaintList;