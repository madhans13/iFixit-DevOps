const sequelize = require('../config/database');
const { User } = require('../models');

async function createAdmin() {
  try {
    await sequelize.authenticate();
    console.log('Connected to PostgreSQL');
    
    // Check if admin already exists
    const existingAdmin = await User.findOne({ where: { email: 'admin@ifixitt.com' } });
    if (existingAdmin) {
      console.log('Admin user already exists');
      process.exit(0);
    }

    // Create admin user
    const adminUser = await User.create({
      username: 'admin',
      email: 'admin@ifixitt.com',
      password: 'admin123',
      role: 'admin',
      expertise: [{
        category: 'General',
        level: 'expert'
      }]
    });

    console.log('Admin user created successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error creating admin user:', error);
    process.exit(1);
  }
}

createAdmin(); 