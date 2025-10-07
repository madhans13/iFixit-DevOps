const sequelize = require('../config/database');
const bcrypt = require('bcryptjs');
const guides = require('../data/guides');
const products = require('../data/products');
const devices = require('../data/devices');
const { User, Guide, Product, Device } = require('../models');

const adminUser = {
  username: 'admin',
  email: 'admin@ifixitt.com',
  password: 'admin123',
  role: 'admin'
};

async function seedDatabase() {
  try {
    // Connect to PostgreSQL
    await sequelize.authenticate();
    console.log('Connected to PostgreSQL');

    // Clear existing data
    await Promise.all([
      User.destroy({ where: {} }),
      Guide.destroy({ where: {} }),
      Product.destroy({ where: {} }),
      Device.destroy({ where: {} })
    ]);

    console.log('Cleared existing data');

    // Create admin user
    const hashedPassword = await bcrypt.hash(adminUser.password, 10);
    const user = await User.create({
      ...adminUser,
      password: hashedPassword
    });

    console.log('Created admin user');

    // Insert devices
    const createdDevices = await Device.bulkCreate(devices);
    console.log('Inserted devices');

    // Create a map of device names to their IDs
    const deviceMap = {};
    createdDevices.forEach(device => {
      deviceMap[device.name] = device.id;
    });

    // Add user and device reference to guides
    const guidesWithRefs = guides.map(guide => ({
      ...guide,
      authorId: user.id,
      deviceId: deviceMap[guide.deviceName] || deviceMap['iPhone 13'] // fallback to iPhone 13 if device not found
    }));

    // Insert guides
    await Guide.bulkCreate(guidesWithRefs);
    console.log('Inserted guides');

    // Insert products
    await Product.bulkCreate(products);
    console.log('Inserted products');

    console.log('Database seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase(); 