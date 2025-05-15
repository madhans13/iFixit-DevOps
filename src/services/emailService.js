// Frontend email service that makes API calls to the backend
const API_URL = 'http://localhost:5000/api';

export const sendVerificationEmail = async (email, token) => {
  try {
    const response = await fetch(`${API_URL}/auth/send-verification`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, token })
    });

    const data = await response.json();
    return data.success;
  } catch (error) {
    console.error('Error sending verification email:', error);
    return false;
  }
};

export const sendPasswordResetEmail = async (email) => {
  try {
    const response = await fetch(`${API_URL}/auth/reset-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email })
    });

    const data = await response.json();
    return data.success;
  } catch (error) {
    console.error('Error sending password reset email:', error);
    return false;
  }
}; 