const mongoose = require('mongoose');

const deviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    index: true
  },
  brand: {
    type: String,
    required: true,
    index: true
  },
  category: {
    type: String,
    enum: ['phone', 'laptop', 'tablet', 'desktop', 'console', 'other'],
    required: true
  },
  model: {
    type: String,
    required: true
  },
  releaseYear: Number,
  specifications: {
    type: Map,
    of: String
  },
  description: String,
  image: String,
  status: {
    type: String,
    enum: ['active', 'discontinued', 'upcoming'],
    default: 'active'
  }
}, {
  timestamps: true
});

// Index for full-text search
deviceSchema.index({
  name: 'text',
  brand: 'text',
  model: 'text'
});

module.exports = mongoose.model('Device', deviceSchema); 