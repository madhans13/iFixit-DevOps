const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  category: {
    type: DataTypes.ENUM('tool', 'part', 'kit'),
    allowNull: false
  },
  price: {
    type: DataTypes.JSONB,
    allowNull: false
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 0
    }
  },
  images: {
    type: DataTypes.JSONB,
    defaultValue: []
  },
  specifications: {
    type: DataTypes.JSONB,
    defaultValue: {}
  },
  compatibility: {
    type: DataTypes.JSONB,
    defaultValue: []
  },
  manufacturer: {
    type: DataTypes.JSONB,
    defaultValue: {}
  },
  ratings: {
    type: DataTypes.JSONB,
    defaultValue: []
  },
  averageRating: {
    type: DataTypes.DECIMAL(3, 2),
    defaultValue: 0
  },
  features: {
    type: DataTypes.JSONB,
    defaultValue: []
  },
  weight: {
    type: DataTypes.JSONB,
    defaultValue: {}
  },
  dimensions: {
    type: DataTypes.JSONB,
    defaultValue: {}
  },
  status: {
    type: DataTypes.ENUM('active', 'discontinued', 'out_of_stock'),
    defaultValue: 'active'
  },
  tags: {
    type: DataTypes.JSONB,
    defaultValue: []
  }
}, {
  tableName: 'products',
  hooks: {
    beforeSave: (product) => {
      if (product.ratings && product.ratings.length > 0) {
        const total = product.ratings.reduce((sum, rating) => sum + rating.score, 0);
        product.averageRating = total / product.ratings.length;
      }
    }
  }
});

module.exports = Product; 