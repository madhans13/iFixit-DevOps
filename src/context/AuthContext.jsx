import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

const SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sessionExpiry, setSessionExpiry] = useState(null);

  useEffect(() => {
    checkSession();
    const interval = setInterval(checkSession, 5 * 60 * 1000); // Check every 5 minutes
    return () => clearInterval(interval);
  }, []);

  const checkSession = () => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    const expiry = localStorage.getItem('sessionExpiry');

    if (token && userData && expiry) {
      try {
        if (Date.now() > parseInt(expiry)) {
          logout();
          return;
        }

        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        setSessionExpiry(parseInt(expiry));
      } catch (error) {
        console.error('Error parsing stored user data:', error);
        logout();
      }
    }
    setLoading(false);
  };

  const getErrorMessage = (error) => {
    if (error.includes('credentials')) return 'Invalid username or password';
    if (error.includes('exists')) return 'This username is already registered';
    if (error.includes('Password')) return error;
    return 'An unexpected error occurred. Please try again.';
  };

  const updateSession = (token, userData) => {
    const expiry = Date.now() + SESSION_DURATION;
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('sessionExpiry', expiry.toString());
    setSessionExpiry(expiry);
    setUser(userData);
  };

  const login = async (username, password, rememberMe = false) => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: data.error || 'Invalid username or password'
        };
      }

      if (rememberMe) {
        localStorage.setItem('rememberedUsername', username);
      } else {
        localStorage.removeItem('rememberedUsername');
      }

      updateSession(data.token, data.user);
      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      return { 
        success: false, 
        error: 'An unexpected error occurred. Please try again.'
      };
    }
  };

  const register = async (username, email, password) => {
    try {
      // Password strength validation
      if (password.length < 8) {
        throw new Error('Password must be at least 8 characters long');
      }
      if (!/[A-Z]/.test(password)) {
        throw new Error('Password must contain at least one uppercase letter');
      }
      if (!/[0-9]/.test(password)) {
        throw new Error('Password must contain at least one number');
      }
      if (!/[!@#$%^&*]/.test(password)) {
        throw new Error('Password must contain at least one special character');
      }

      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Registration failed');
      }

      return { 
        success: true,
        message: 'Registration successful! You can now log in.'
      };
    } catch (error) {
      return { 
        success: false, 
        error: getErrorMessage(error.message)
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('sessionExpiry');
    setUser(null);
    setSessionExpiry(null);
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    sessionExpiry
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 