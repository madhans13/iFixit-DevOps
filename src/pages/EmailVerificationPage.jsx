import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../componentStyles/AuthPages.css';

function EmailVerificationPage() {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState('verifying');
  const navigate = useNavigate();
  const { verifyEmail } = useAuth();

  useEffect(() => {
    const verifyToken = async () => {
      const token = searchParams.get('token');
      if (!token) {
        setStatus('error');
        return;
      }

      try {
        const result = await verifyEmail(token);
        if (result.success) {
          setStatus('success');
          setTimeout(() => {
            navigate('/login');
          }, 3000);
        } else {
          setStatus('error');
        }
      } catch (error) {
        setStatus('error');
      }
    };

    verifyToken();
  }, [searchParams, navigate, verifyEmail]);

  const renderContent = () => {
    switch (status) {
      case 'verifying':
        return (
          <>
            <div className="verification-spinner"></div>
            <h2>Verifying your email...</h2>
            <p>Please wait while we verify your email address.</p>
          </>
        );
      case 'success':
        return (
          <>
            <div className="verification-success">✓</div>
            <h2>Email Verified!</h2>
            <p>Your email has been successfully verified. Redirecting to login...</p>
          </>
        );
      case 'error':
        return (
          <>
            <div className="verification-error">✕</div>
            <h2>Verification Failed</h2>
            <p>The verification link is invalid or has expired.</p>
            <button 
              className="auth-button"
              onClick={() => navigate('/login')}
            >
              Go to Login
            </button>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box verification-box">
        {renderContent()}
      </div>
    </div>
  );
}

export default EmailVerificationPage; 