import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const OAuthCallback = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { updateSession } = useAuth();

  useEffect(() => {
    const token = searchParams.get('token');
    const userId = searchParams.get('userId');
    const username = searchParams.get('username');
    const email = searchParams.get('email');
    const error = searchParams.get('error');

    console.log('OAuth callback params:', { token, userId, username, email, error }); // For debugging

    if (error) {
      console.error('OAuth error:', error);
      navigate('/login?error=' + encodeURIComponent(error));
      return;
    }

    if (token && userId && username && email) {
      try {
        const userData = {
          id: userId,
          username,
          email,
          isVerified: true
        };

        updateSession(token, userData);
        navigate('/dashboard');
      } catch (err) {
        console.error('Error updating session:', err);
        navigate('/login?error=session_update_failed');
      }
    } else {
      console.error('Missing required OAuth data:', { token, userId, username, email });
      navigate('/login?error=missing_oauth_data');
    }
  }, [searchParams, navigate, updateSession]);

  return (
    <div className="auth-container">
      <div className="auth-box">
        <div className="text-center">
          <div className="verification-spinner"></div>
          <p className="mt-4">Completing login...</p>
        </div>
      </div>
    </div>
  );
};

export default OAuthCallback; 