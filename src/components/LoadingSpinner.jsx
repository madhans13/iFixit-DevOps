import React from 'react';
import '../componentStyles/LoadingSpinner.css';

const LoadingSpinner = ({ size = 'medium', fullPage = false }) => {
  const spinnerClass = `loading-spinner ${size} ${fullPage ? 'full-page' : ''}`;
  
  return (
    <div className={spinnerClass}>
      <div className="spinner"></div>
      {fullPage && <p>Loading...</p>}
    </div>
  );
};

export default LoadingSpinner; 