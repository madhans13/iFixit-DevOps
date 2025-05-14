const mongoose = require('mongoose');

const stepSchema = new mongoose.Schema({
  order: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  images: [{
    url: String,
    caption: String
  }],
  video: {
    url: String,
    caption: String
  },
  tools: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  }],
  parts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  }],
  warnings: [String],
  tips: [String]
});

const guideSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    index: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  device: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Device',
    required: true
  },
  category: {
    type: String,
    enum: ['repair', 'upgrade', 'maintenance', 'teardown'],
    required: true
  },
  difficulty: {
    type: Number,
    min: 1,
    max: 5,
    required: true
  },
  timeRequired: {
    value: Number,
    unit: {
      type: String,
      enum: ['minutes', 'hours'],
      default: 'minutes'
    }
  },
  introduction: {
    type: String,
    required: true
  },
  prerequisites: [{
    type: String
  }],
  steps: [stepSchema],
  tools: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  }],
  parts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  }],
  views: {
    type: Number,
    default: 0
  },
  ratings: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    score: {
      type: Number,
      min: 1,
      max: 5
    },
    comment: String,
    date: {
      type: Date,
      default: Date.now
    }
  }],
  status: {
    type: String,
    enum: ['draft', 'published', 'archived'],
    default: 'draft'
  },
  tags: [{
    type: String,
    index: true
  }],
  version: {
    type: Number,
    default: 1
  }
}, {
  timestamps: true
});

// Index for full-text search
guideSchema.index({
  title: 'text',
  introduction: 'text',
  'steps.description': 'text'
});

module.exports = mongoose.model('Guide', guideSchema); 