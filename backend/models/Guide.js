const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Guide = sequelize.define('Guide', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  category: {
    type: DataTypes.ENUM('repair', 'maintenance', 'upgrade'),
    allowNull: false
  },
  difficulty: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 4
    }
  },
  timeRequired: {
    type: DataTypes.JSONB,
    allowNull: false
  },
  introduction: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  prerequisites: {
    type: DataTypes.JSONB,
    defaultValue: []
  },
  steps: {
    type: DataTypes.JSONB,
    defaultValue: []
  },
  authorId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  deviceId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'devices',
      key: 'id'
    }
  },
  status: {
    type: DataTypes.ENUM('draft', 'published', 'archived'),
    defaultValue: 'draft'
  },
  views: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  likes: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  comments: {
    type: DataTypes.JSONB,
    defaultValue: []
  },
  tags: {
    type: DataTypes.JSONB,
    defaultValue: []
  },
  version: {
    type: DataTypes.INTEGER,
    defaultValue: 1
  }
}, {
  tableName: 'guides'
});

module.exports = Guide; 