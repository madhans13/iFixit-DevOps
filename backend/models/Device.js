const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Device = sequelize.define('Device', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  brand: {
    type: DataTypes.STRING,
    allowNull: false
  },
  category: {
    type: DataTypes.ENUM('phone', 'laptop', 'tablet', 'desktop', 'console', 'other'),
    allowNull: false
  },
  model: {
    type: DataTypes.STRING,
    allowNull: false
  },
  releaseYear: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  specifications: {
    type: DataTypes.JSONB,
    defaultValue: {}
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true
  },
  status: {
    type: DataTypes.ENUM('active', 'discontinued', 'upcoming'),
    defaultValue: 'active'
  }
}, {
  tableName: 'devices'
});

module.exports = Device; 