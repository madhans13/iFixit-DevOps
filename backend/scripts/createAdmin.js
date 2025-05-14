const mongoose = require('mongoose');
const User = require('../models/User');

mongoose.connect('mongodb://127.0.0.1:27017/ifixit', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(async () => {
  console.log('Connected to MongoDB');
  
  try {
    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: 'admin@ifixitt.com' });
    if (existingAdmin) {
      console.log('Admin user already exists');
      process.exit(0);
    }

    // Create admin user
    const adminUser = new User({
      username: 'admin',
      email: 'admin@ifixitt.com',
      password: 'admin123',
      role: 'admin',
      expertise: [{
        category: 'General',
        level: 'expert'
      }]
    });

    await adminUser.save();
    console.log('Admin user created successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error creating admin user:', error);
    process.exit(1);
  }
}).catch(err => {
  console.error('Error connecting to MongoDB:', err);
  process.exit(1);
}); 