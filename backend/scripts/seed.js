const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const guides = require('../data/guides');
const products = require('../data/products');
const devices = require('../data/devices');
const User = require('../models/User');
const Guide = require('../models/Guide');
const Product = require('../models/Product');
const Device = require('../models/Device');

const adminUser = {
  username: 'admin',
  email: 'admin@ifixitt.com',
  password: 'admin123',
  role: 'admin'
};

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect('mongodb://127.0.0.1:27017/ifixit', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB');

    // Clear existing data
    await Promise.all([
      User.deleteMany({}),
      Guide.deleteMany({}),
      Product.deleteMany({}),
      Device.deleteMany({})
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
    const createdDevices = await Device.insertMany(devices);
    console.log('Inserted devices');

    // Create a map of device names to their IDs
    const deviceMap = {};
    createdDevices.forEach(device => {
      deviceMap[device.name] = device._id;
    });

    // Add user and device reference to guides
    const guidesWithRefs = guides.map(guide => ({
      ...guide,
      author: user._id,
      device: deviceMap[guide.deviceName] || deviceMap['iPhone 13'] // fallback to iPhone 13 if device not found
    }));

    // Insert guides
    await Guide.insertMany(guidesWithRefs);
    console.log('Inserted guides');

    // Insert products
    await Product.insertMany(products);
    console.log('Inserted products');

    console.log('Database seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase(); 