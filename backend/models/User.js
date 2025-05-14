const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  profilePicture: String,
  reputation: {
    type: Number,
    default: 0
  },
  role: {
    type: String,
    enum: ['user', 'expert', 'admin'],
    default: 'user'
  },
  expertise: [{
    category: String,
    level: {
      type: String,
      enum: ['beginner', 'intermediate', 'expert']
    }
  }],
  completedRepairs: [{
    guideId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Guide'
    },
    completedAt: Date,
    difficulty: Number,
    success: Boolean
  }],
  savedGuides: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Guide'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Method to compare password
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema); 