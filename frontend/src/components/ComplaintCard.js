import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './ComplaintCard.css';

function ComplaintCard({ complaint }) {
  const [votes, setVotes] = useState(complaint.votes || 0);
  const [isVoted, setIsVoted] = useState(false);

  const submittedDate = new Date(complaint.createdAt).toLocaleDateString("en-US", {
    month: 'short',
    day: 'numeric'
  });

  const handleUpvote = () => {
    if (!isVoted) {
      setVotes(votes + 1);
      setIsVoted(true);
    } else {
      setVotes(votes - 1);
      setIsVoted(false);
    }
  };

  return (
    <div className="complaint-card">
      <div className="card-header">
        <span className="card-category">{complaint.category}</span>
        <span className={`status-tag status-${complaint.status.toLowerCase().replace(' ', '-')}`}>
          {complaint.status}
        </span>
      </div>
      <h3 className="card-title">{complaint.title}</h3>
      <p className="card-metadata">
        Room {complaint.room} • Submitted {submittedDate}
      </p>
      <p className="card-description">
        {complaint.description}
      </p>
      <div className="card-footer">
        <button 
          className={`upvote-button ${isVoted ? 'voted' : ''}`} 
          onClick={handleUpvote}
        >
          <span className="upvote-icon">▲</span>
          {isVoted ? 'Upvoted' : 'Upvote'}
        </button>
        <span className="vote-count">{votes} votes</span>
      </div>
      <Link to={`/complaint/${complaint.id}`} className="details-link">
        View Details & Status
      </Link>
    </div>
  );
}

export default ComplaintCard;