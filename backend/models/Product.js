const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    index: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['tool', 'part', 'kit'],
    required: true
  },
  price: {
    value: {
      type: Number,
      required: true
    },
    currency: {
      type: String,
      default: 'USD'
    }
  },
  stock: {
    type: Number,
    required: true,
    min: 0
  },
  images: [{
    url: String,
    isPrimary: Boolean
  }],
  specifications: {
    type: Map,
    of: String
  },
  compatibility: [{
    deviceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Device'
    },
    models: [String]
  }],
  manufacturer: {
    name: String,
    partNumber: String
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
    review: String,
    date: {
      type: Date,
      default: Date.now
    },
    verified: {
      type: Boolean,
      default: false
    }
  }],
  averageRating: {
    type: Number,
    default: 0
  },
  features: [String],
  weight: {
    value: Number,
    unit: {
      type: String,
      enum: ['g', 'kg', 'oz', 'lb'],
      default: 'g'
    }
  },
  dimensions: {
    length: Number,
    width: Number,
    height: Number,
    unit: {
      type: String,
      enum: ['mm', 'cm', 'in'],
      default: 'mm'
    }
  },
  status: {
    type: String,
    enum: ['active', 'discontinued', 'out_of_stock'],
    default: 'active'
  },
  tags: [{
    type: String,
    index: true
  }]
}, {
  timestamps: true
});

// Index for full-text search
productSchema.index({
  name: 'text',
  description: 'text',
  'manufacturer.name': 'text',
  'manufacturer.partNumber': 'text'
});

// Calculate average rating before saving
productSchema.pre('save', function(next) {
  if (this.ratings && this.ratings.length > 0) {
    const total = this.ratings.reduce((sum, rating) => sum + rating.score, 0);
    this.averageRating = total / this.ratings.length;
  }
  next();
});

module.exports = mongoose.model('Product', productSchema); 