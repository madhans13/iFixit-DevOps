const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  tls: {
    rejectUnauthorized: false // Allow self-signed certificates
  }
});

// For development: Log verification link to console
const sendVerificationEmail = async (email, token) => {
  try {
    // Create verification link
    const verificationLink = `http://localhost:5173/verify-email/${token}`;
    
    // Log the verification details to console
    console.log('\n=== VERIFICATION EMAIL ===');
    console.log('To:', email);
    console.log('Subject: Email Verification - iFixit Clone');
    console.log('Verification Link:', verificationLink);
    console.log('Token:', token);
    console.log('========================\n');

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Email Verification - iFixit Clone',
      html: `
        <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">
          <h2>Welcome to iFixit Clone!</h2>
          <p>Thank you for registering. Please verify your email address by clicking the link below:</p>
          <a href="http://localhost:5173/verify-email/${token}" 
             style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px;">
            Verify Email
          </a>
          <p>If you did not create an account, please ignore this email.</p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error('Error with verification:', error);
    return false;
  }
};

// For development: Log password reset link to console
const sendPasswordResetEmail = async (email, token) => {
  try {
    // Create reset link
    const resetLink = `http://localhost:5173/reset-password/${token}`;
    
    // Log the reset details to console
    console.log('\n=== PASSWORD RESET EMAIL ===');
    console.log('To:', email);
    console.log('Subject: Password Reset - iFixit Clone');
    console.log('Reset Link:', resetLink);
    console.log('Token:', token);
    console.log('========================\n');

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Password Reset - iFixit Clone',
      html: `
        <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">
          <h2>Password Reset Request</h2>
          <p>You requested to reset your password. Click the link below to reset it:</p>
          <a href="http://localhost:5173/reset-password/${token}"
             style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px;">
            Reset Password
          </a>
          <p>If you did not request this, please ignore this email.</p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error('Error with password reset:', error);
    return false;
  }
};

module.exports = {
  sendVerificationEmail,
  sendPasswordResetEmail
}; 