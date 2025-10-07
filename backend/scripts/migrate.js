const sequelize = require('../config/database');
const { User, Guide, Product, Device } = require('../models');

async function migrateDatabase() {
  try {
    console.log('Starting database migration...');
    
    // Test connection
    await sequelize.authenticate();
    console.log('✓ Database connection established');
    
    // Sync all models (create tables)
    await sequelize.sync({ force: true });
    console.log('✓ Database tables created');
    
    // Enable PostgreSQL extensions for better performance
    await sequelize.query('CREATE EXTENSION IF NOT EXISTS "pg_trgm";');
    console.log('✓ PostgreSQL extensions enabled');
    
    console.log('✓ Database migration completed successfully');
    
  } catch (error) {
    console.error('✗ Database migration failed:', error);
    process.exit(1);
  } finally {
    await sequelize.close();
  }
}

// Run migration if this file is executed directly
if (require.main === module) {
  migrateDatabase();
}

module.exports = migrateDatabase;
