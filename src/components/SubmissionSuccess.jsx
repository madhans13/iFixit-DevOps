import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

const SubmissionSuccess = ({ guideId, title }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate(`/guides/${guideId}`);
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate, guideId]);

  return (
    <div className="submission-success-container">
      <div className="success-content">
        <CheckCircle size={64} className="success-icon" />
        <h1>Guide Submitted Successfully!</h1>
        <p>Your guide "{title}" has been created.</p>
        <p className="redirect-text">You will be redirected to your guide in a few seconds...</p>
        <div className="button-group">
          <button 
            className="view-guide-button"
            onClick={() => navigate(`/guides/${guideId}`)}
          >
            View Guide Now
          </button>
          <button 
            className="create-another-button"
            onClick={() => navigate('/create-guide')}
          >
            Create Another Guide
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubmissionSuccess; 