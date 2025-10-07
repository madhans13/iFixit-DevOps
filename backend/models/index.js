const User = require('./User');
const Guide = require('./Guide');
const Product = require('./Product');
const Device = require('./Device');

// Define associations
User.hasMany(Guide, { foreignKey: 'authorId', as: 'guides' });
Guide.belongsTo(User, { foreignKey: 'authorId', as: 'author' });

Device.hasMany(Guide, { foreignKey: 'deviceId', as: 'guides' });
Guide.belongsTo(Device, { foreignKey: 'deviceId', as: 'device' });

// Export all models
module.exports = {
  User,
  Guide,
  Product,
  Device
};
