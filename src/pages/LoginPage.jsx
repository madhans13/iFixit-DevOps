import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Eye, EyeOff, User, Lock } from 'lucide-react';
import '../componentStyles/AuthPages.css';

function LoginPage() {
  const usernameInputRef = useRef(null);
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [needsVerification, setNeedsVerification] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const navigate = useNavigate();
  const { login, resendVerification } = useAuth();

  useEffect(() => {
    usernameInputRef.current?.focus();
    const rememberedUsername = localStorage.getItem('rememberedUsername');
    if (rememberedUsername) {
      setFormData(prev => ({ ...prev, username: rememberedUsername }));
      setRememberMe(true);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (error) setError('');
    if (needsVerification) setNeedsVerification(false);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const validateForm = () => {
    if (!formData.username || !formData.password) {
      setError('Please fill in all fields');
      return false;
    }
    return true;
  };

  const handleResendVerification = async () => {
    if (!userEmail) {
      setError('Email address not available');
      return;
    }

    setLoading(true);
    try {
      console.log('Attempting to resend verification email to:', userEmail);
      const result = await resendVerification(userEmail);
      console.log('Resend verification result:', result);

      if (result.success) {
        setError('');
        alert('Verification email sent! Please check your inbox.');
      } else {
        setError(result.error || 'Failed to resend verification email');
      }
    } catch (err) {
      console.error('Resend verification error:', err);
      setError('Failed to resend verification email');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setError('');
    setLoading(true);
    setNeedsVerification(false);

    try {
      console.log('Attempting login with username:', formData.username);
      const result = await login(formData.username, formData.password, rememberMe);
      console.log('Login result:', result);

      if (result.success) {
        setSuccess(true);
        setTimeout(() => {
          navigate('/');
        }, 1000);
      } else {
        if (result.needsVerification) {
          setNeedsVerification(true);
          setUserEmail(result.email);
          setError('Please verify your email before logging in');
        } else {
          setError(result.error || 'Invalid username or password');
        }
      }
    } catch (err) {
      console.error('Login submission error:', err);
      setError('An error occurred during login. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h1>Sign in to your account</h1>
        
        <form className="auth-form" onSubmit={handleSubmit}>
          {error && (
            <div className="error-message">
              {error}
              {needsVerification && (
                <button
                  type="button"
                  onClick={handleResendVerification}
                  className="resend-verification-button"
                  disabled={loading}
                >
                  Resend verification email
                </button>
              )}
            </div>
          )}
          
          {success && (
            <div className="success-message">
              Login successful! Redirecting...
            </div>
          )}

          <div className="form-group">
            <label htmlFor="username">Username</label>
            <div className="input-icon-wrapper">
              <User size={20} className="input-icon" />
              <input
                ref={usernameInputRef}
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                placeholder="Enter your username"
                className={error && !formData.username ? 'error' : ''}
                disabled={loading}
                autoComplete="username"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="input-icon-wrapper">
              <Lock size={20} className="input-icon" />
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Enter your password"
                className={error && !formData.password ? 'error' : ''}
                disabled={loading}
                autoComplete="current-password"
              />
              <button 
                type="button" 
                className="show-password-button"
                onClick={toggleShowPassword}
                tabIndex={0}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div className="form-options">
            <label className="remember-me">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <span>Remember me</span>
            </label>
            <Link to="/forgot-password" className="forgot-password">
              Forgot password?
            </Link>
          </div>

          <button 
            type="submit" 
            className={`auth-button ${loading ? 'loading' : ''} ${success ? 'success' : ''}`}
            disabled={loading || success}
          >
            {loading ? 'Logging in...' : success ? 'Success!' : 'Log In'}
          </button>
        </form>

        <div className="auth-links">
          <p>
            Don't have an account? <Link to="/join">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;