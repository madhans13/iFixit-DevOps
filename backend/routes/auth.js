const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('../models/User');
const { sendVerificationEmail } = require('../services/emailService');
const rateLimit = require('express-rate-limit');

// Rate limiting setup
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20, // Increased from 5 to 20 attempts per window for development
  message: { error: 'Too many login attempts. Please try again after 15 minutes.' },
  standardHeaders: true,
  legacyHeaders: false
});

// Generate verification token
const generateToken = () => {
  return crypto.randomBytes(32).toString('hex');
};

// Register route
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    console.log('Registration attempt for:', { username, email });

    // Validate input
    if (!username || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Validate username
    if (username.length < 3) {
      return res.status(400).json({ error: 'Username must be at least 3 characters long' });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      if (existingUser.email === email) {
        return res.status(400).json({ error: 'Email already exists' });
      }
      if (existingUser.username === username) {
        return res.status(400).json({ error: 'Username already exists' });
      }
    }

    // Validate password
    if (password.length < 8) {
      return res.status(400).json({ error: 'Password must be at least 8 characters long' });
    }
    if (!/[A-Z]/.test(password)) {
      return res.status(400).json({ error: 'Password must contain at least one uppercase letter' });
    }
    if (!/[0-9]/.test(password)) {
      return res.status(400).json({ error: 'Password must contain at least one number' });
    }
    if (!/[!@#$%^&*]/.test(password)) {
      return res.status(400).json({ error: 'Password must contain at least one special character' });
    }

    // Generate verification token
    const verificationToken = generateToken();
    const verificationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    // Create new user
    const user = new User({
      username,
      email,
      password, // Password will be hashed by the pre-save middleware
      verificationToken,
      verificationExpires,
      isVerified: false // Explicitly set verification status
    });

    console.log('Saving new user:', username);
    await user.save();
    console.log('User saved successfully:', username);

    // Send verification email
    await sendVerificationEmail(email, verificationToken);
    console.log('Verification email sent to:', email);

    res.status(201).json({ 
      success: true,
      message: 'Registration successful! Please check your email to verify your account.',
      verificationToken // Only for development, remove in production
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Registration failed. Please try again.' });
  }
});

// Email verification route
router.post('/verify-email', async (req, res) => {
  try {
    const { token } = req.body;
    console.log('Attempting to verify email with token:', token);

    if (!token) {
      console.log('No token provided');
      return res.status(400).json({ error: 'Verification token is required' });
    }

    const user = await User.findOne({
      verificationToken: token,
      verificationExpires: { $gt: Date.now() }
    });

    if (!user) {
      console.log('No user found with token:', token);
      // Try to find user without expiry check to see if token expired
      const expiredUser = await User.findOne({ verificationToken: token });
      if (expiredUser) {
        console.log('Found user but token expired for:', expiredUser.email);
        return res.status(400).json({ error: 'Verification token has expired' });
      }
      return res.status(400).json({ error: 'Invalid verification token' });
    }

    console.log('User found:', user.email, 'Proceeding with verification');

    // Update user verification status
    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationExpires = undefined;
    
    await user.save();
    console.log('User verified successfully:', user.email);

    res.json({ 
      success: true,
      message: 'Email verified successfully',
      email: user.email
    });
  } catch (error) {
    console.error('Verification error:', error);
    res.status(500).json({ error: 'Verification failed' });
  }
});

// Login route with rate limiting
router.post('/login', loginLimiter, async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log('Login attempt for username:', username);

    if (!username || !password) {
      console.log('Missing credentials');
      return res.status(400).json({ error: 'Username and password are required' });
    }

    const user = await User.findOne({ username });
    if (!user) {
      console.log('User not found:', username);
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    console.log('User found:', user.username, 'Verified:', user.isVerified);

    // Check if account is locked
    if (user.isLocked && user.isLocked()) {
      const remainingTime = Math.ceil((user.lockUntil - Date.now()) / 1000 / 60);
      console.log('Account is locked:', user.username);
      return res.status(423).json({
        error: `Account is temporarily locked. Please try again in ${remainingTime} minutes.`
      });
    }

    // Check password
    console.log('Checking password for user:', user.username);
    const isMatch = await user.comparePassword(password);
    console.log('Password match result:', isMatch);

    if (!isMatch) {
      console.log('Invalid password for user:', user.username);
      // Increment login attempts
      if (user.incrementLoginAttempts) {
        await user.incrementLoginAttempts();
      }
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Check if email is verified
    if (!user.isVerified) {
      console.log('User not verified:', user.username);
      // Generate new verification token if expired
      if (!user.verificationToken || new Date() > user.verificationExpires) {
        user.verificationToken = generateToken();
        user.verificationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000);
        await user.save();
        await sendVerificationEmail(user.email, user.verificationToken);
      }
      return res.status(403).json({ 
        error: 'Please verify your email first',
        message: 'A new verification email has been sent if the previous one expired.',
        email: user.email
      });
    }

    // Reset login attempts on successful login
    if (user.resetLoginAttempts) {
      await user.resetLoginAttempts();
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    console.log('Login successful for user:', user.username);

    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        isVerified: user.isVerified
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed. Please try again.' });
  }
});

// Resend verification email route
router.post('/resend-verification', async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (user.isVerified) {
      return res.status(400).json({ error: 'Email is already verified' });
    }

    // Generate new verification token
    const verificationToken = generateToken();
    const verificationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000);

    user.verificationToken = verificationToken;
    user.verificationExpires = verificationExpires;
    await user.save();

    // Send new verification email
    await sendVerificationEmail(email, verificationToken);

    res.json({ 
      message: 'Verification email sent',
      verificationToken // Only for development, remove in production
    });
  } catch (error) {
    console.error('Resend verification error:', error);
    res.status(500).json({ error: 'Failed to resend verification email' });
  }
});

module.exports = router; 