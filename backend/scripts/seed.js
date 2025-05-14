const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const guides = require('../data/guides');
const products = require('../data/products');
const User = require('../models/User');
const Guide = require('../models/Guide');
const Product = require('../models/Product');

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
      Product.deleteMany({})
    ]);

    console.log('Cleared existing data');

    // Create admin user
    const hashedPassword = await bcrypt.hash(adminUser.password, 10);
    const user = await User.create({
      ...adminUser,
      password: hashedPassword
    });

    console.log('Created admin user');

    // Add user reference to guides
    const guidesWithUser = guides.map(guide => ({
      ...guide,
      author: user._id
    }));

    // Insert guides
    await Guide.insertMany(guidesWithUser);
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