const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');

// Serialize user for the session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user from the session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

// Google OAuth Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: '647689407958-dihcoaknn2d968jbo33pd294vvo4acsg.apps.googleusercontent.com',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:5000/api/auth/google/callback',
      scope: ['profile', 'email']
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        console.log('Google profile:', profile); // For debugging

        // Check if user already exists
        let user = await User.findOne({ 
          $or: [
            { googleId: profile.id },
            { email: profile.emails[0].value }
          ]
        });

        if (user) {
          // Update existing user with Google ID if they don't have one
          if (!user.googleId) {
            user.googleId = profile.id;
            await user.save();
          }
          return done(null, user);
        }

        // If not, create new user
        user = new User({
          username: profile.displayName,
          email: profile.emails[0].value,
          password: 'google-oauth-' + Math.random().toString(36).slice(-8), // Random password
          isVerified: true, // Google accounts are already verified
          googleId: profile.id,
          profilePicture: profile.photos?.[0]?.value
        });

        await user.save();
        done(null, user);
      } catch (error) {
        console.error('Passport Google Strategy Error:', error);
        done(error, null);
      }
    }
  )
);

module.exports = passport; 