import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ComplaintService from '../services/ComplaintService';
import './ComplaintDetailPage.css';

// Mock current user (In real app, fetch from auth context or similar)
const CURRENT_USER = { id: 's101', role: 'student' };

function ComplaintDetailPage() {
  const [complaint, setComplaint] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState('');
  const { id } = useParams();

  useEffect(() => {
    const fetchComplaint = async () => {
      try {
        setLoading(true);
        const data = await ComplaintService.getComplaintById(id);
        setComplaint(data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch complaint:", error);
        setLoading(false);
      }
    };
    fetchComplaint();
  }, [id]);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim() === '') return;
    console.log("Submitting comment:", newComment);
    setNewComment('');
  };

  const getStatusClass = (status) => {
    return status.toLowerCase().replace(' ', '-');
  };

  const timelineEvents = [
    {
      type: 'comment',
      author: 'Warden (Admin)',
      date: '2 days ago',
      body: 'A plumber has been assigned. Their estimated time of arrival is 2 hours.',
    },
    {
      type: 'status_change',
      author: 'Warden (Admin)',
      date: '2 days ago',
      oldStatus: 'Submitted',
      newStatus: 'In Progress',
    },
    {
      type: 'submitted',
      author: 'Original Poster',
      date: '3 days ago',
      body: complaint?.description,
    },
  ];

  if (loading) {
    return <div className="pages"><p>Loading details...</p></div>;
  }

  if (!complaint) {
    return <div className="pages"><p>Complaint not found.</p></div>;
  }

  const isOriginalPoster = complaint.submittedBy === CURRENT_USER.id;
  const isResolvedByWarden = complaint.status === 'Resolved';

  return (
    <main className="complaint-detail-page pages">
      <header className="detail-header">
        <h2 className="detail-title">
          {complaint.title}
          <span>ID: #{complaint.id}</span>
        </h2>
        <div className={`status-badge ${getStatusClass(complaint.status)}`}>
          {complaint.status}
        </div>
      </header>

      <div className="detail-layout">
        <section className="timeline-container">
          <div className="timeline">
            {timelineEvents.map((event, index) => (
              <div key={index} className="timeline-item">
                <div className={`timeline-icon ${event.type}`}></div>
                <div className="timeline-content">
                  <div className="timeline-header">
                    <strong>{event.author}</strong>
                    <span>{event.date}</span>
                  </div>
                  <div className="timeline-body">
                    {event.type === 'status_change' ? (
                      <p>
                        Changed status from
                        <span className={`status-tag-inline ${getStatusClass(event.oldStatus)}`}>{event.oldStatus}</span>
                        to
                        <span className={`status-tag-inline ${getStatusClass(event.newStatus)}`}>{event.newStatus}</span>
                      </p>
                    ) : (
                      <p>{event.body}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <form className="comment-form" onSubmit={handleCommentSubmit}>
            <textarea
              placeholder="Add a comment to help resolve this issue..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <button type="submit">Comment</button>
          </form>
        </section>

        <aside className="sidebar-panel">
          <h4>Details</h4>
          <div className="details-grid">
            <span>Room</span>
            <strong>{complaint.room}</strong>
            <span>Category</span>
            <strong>{complaint.category}</strong>
            <span>Submitted by</span>
            <strong>{isOriginalPoster ? "You" : `User ${complaint.submittedBy}`}</strong>
            <span>Submitted</span>
            <strong>{new Date(complaint.createdAt).toLocaleString()}</strong>
          </div>

          <hr className="sidebar-divider" />

          <h4>Confirmation</h4>
          {isOriginalPoster && isResolvedByWarden && (
            <div className="action-box">
              <p>The issue is marked as resolved. Are you satisfied with the work?</p>
              <button className="confirm-button">
                Yes, Close Complaint
              </button>
              <button className="reopen-button">
                No, Re-open Complaint
              </button>
            </div>
          )}
          
          {isOriginalPoster && !isResolvedByWarden && (
            <p className="sidebar-note">You will be able to confirm or re-open this complaint once it is marked as resolved by the warden.</p>
          )}

          {!isOriginalPoster && (
              <p className="sidebar-note">Only the original poster can confirm or re-open this complaint.</p>
          )}

          <Link to="/student-dashboard" className="back-link">
            &larr; Back to Dashboard
          </Link>
        </aside>
      </div>
    </main>
  );
}

export default ComplaintDetailPage;