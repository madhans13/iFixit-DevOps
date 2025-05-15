const mongoose = require('mongoose');

const guideSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    index: true
  },
  category: {
    type: String,
    enum: ['repair', 'maintenance', 'upgrade'],
    required: true
  },
  difficulty: {
    type: Number,
    min: 1,
    max: 4,
    required: true
  },
  timeRequired: {
    value: {
      type: Number,
      required: true
    },
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
  steps: [{
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
    warnings: [String],
    tips: [String]
  }],
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
  status: {
    type: String,
    enum: ['draft', 'published', 'archived'],
    default: 'draft'
  },
  views: {
    type: Number,
    default: 0
  },
  likes: {
    type: Number,
    default: 0
  },
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment'
  }],
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