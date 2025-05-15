import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../componentStyles/AuthPages.css';

function VerifyEmail() {
  const { token } = useParams();
  const navigate = useNavigate();
  const { verifyEmail } = useAuth();
  const [status, setStatus] = useState('verifying'); // verifying, success, error
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const verify = async () => {
      if (!token) {
        setStatus('error');
        setErrorMessage('No verification token provided');
        return;
      }

      try {
        console.log('Attempting to verify email with token:', token);
        const result = await verifyEmail(token);
        console.log('Verification result:', result);

        if (result.success) {
          setStatus('success');
          setTimeout(() => {
            navigate('/login');
          }, 3000);
        } else {
          setStatus('error');
          setErrorMessage(result.error || 'Verification failed');
        }
      } catch (error) {
        console.error('Verification error:', error);
        setStatus('error');
        setErrorMessage('An error occurred during verification');
      }
    };

    verify();
  }, [token, verifyEmail, navigate]);

  const handleRetry = async () => {
    setStatus('verifying');
    setErrorMessage('');
    try {
      const result = await verifyEmail(token);
      if (result.success) {
        setStatus('success');
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      } else {
        setStatus('error');
        setErrorMessage(result.error || 'Verification failed');
      }
    } catch (error) {
      setStatus('error');
      setErrorMessage('An error occurred during verification');
    }
  };

  const handleResendVerification = () => {
    // Navigate to login page where they can request a new verification email
    navigate('/login');
  };

  return (
    <div className="auth-container">
      <div className="auth-box verification-box">
        {status === 'verifying' && (
          <>
            <div className="verification-spinner"></div>
            <h2>Verifying your email...</h2>
            <p>Please wait while we verify your email address.</p>
          </>
        )}

        {status === 'success' && (
          <>
            <div className="verification-success">✓</div>
            <h2>Email Verified!</h2>
            <p>Your email has been successfully verified. Redirecting to login...</p>
          </>
        )}

        {status === 'error' && (
          <>
            <div className="verification-error">✕</div>
            <h2>Verification Failed</h2>
            <p>{errorMessage}</p>
            <div className="verification-actions">
              <button 
                className="auth-button"
                onClick={handleRetry}
              >
                Try Again
              </button>
              <button 
                className="auth-button secondary"
                onClick={handleResendVerification}
              >
                Request New Verification Email
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default VerifyEmail; 