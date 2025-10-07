const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const bcrypt = require('bcryptjs');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      len: [3, 50]
    }
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [8, 255]
    }
  },
  googleId: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true
  },
  profilePicture: {
    type: DataTypes.STRING,
    allowNull: true
  },
  reputation: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  role: {
    type: DataTypes.ENUM('user', 'expert', 'admin'),
    defaultValue: 'user'
  },
  expertise: {
    type: DataTypes.JSONB,
    defaultValue: []
  },
  completedRepairs: {
    type: DataTypes.JSONB,
    defaultValue: []
  },
  savedGuides: {
    type: DataTypes.JSONB,
    defaultValue: []
  },
  loginAttempts: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  lockUntil: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  tableName: 'users',
  hooks: {
    beforeSave: async (user) => {
      if (user.changed('password')) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      }
    }
  }
});

// Instance methods
User.prototype.comparePassword = async function(candidatePassword) {
  try {
    console.log('Comparing passwords for user:', this.username);
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    console.log('Password comparison result:', isMatch);
    return isMatch;
  } catch (error) {
    console.error('Password comparison error:', error);
    throw error;
  }
};

User.prototype.isLocked = function() {
  return !!(this.lockUntil && this.lockUntil > new Date());
};

User.prototype.incrementLoginAttempts = async function() {
  // Reset attempts if lock has expired
  if (this.lockUntil && this.lockUntil < new Date()) {
    return await this.update({
      loginAttempts: 1,
      lockUntil: null
    });
  }

  // Otherwise increment
  const updates = { loginAttempts: this.loginAttempts + 1 };
  
  // Lock the account if we've reached max attempts
  if (this.loginAttempts + 1 >= 5) {
    updates.lockUntil = new Date(Date.now() + 1800000); // Lock for 30 minutes
  }

  return await this.update(updates);
};

User.prototype.resetLoginAttempts = function() {
  return this.update({
    loginAttempts: 0,
    lockUntil: null
  });
};

module.exports = User; 