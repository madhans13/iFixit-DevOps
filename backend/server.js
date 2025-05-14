const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 5000;

// Import models
const User = require('./models/User');
const Guide = require('./models/Guide');
const Product = require('./models/Product');

// Enhanced Middleware
app.use(cors());
app.use(express.json());
app.use(helmet()); // Security headers
app.use(morgan('dev')); // Logging

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/api/', limiter);

// MongoDB Connection
mongoose.connect('mongodb://127.0.0.1:27017/ifixit', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Error connecting to MongoDB:', err);
});

// Authentication Middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key', (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
};

// Auth Routes
app.post('/api/auth/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    // Check if user exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ error: 'Username or email already exists' });
    }

    const user = new User({ username, email, password });
    await user.save();

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    res.status(201).json({ token, userId: user._id });
  } catch (error) {
    res.status(500).json({ error: 'Error creating user' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    res.json({
      token,
      userId: user._id,
      username: user.username,
      email: user.email
    });
  } catch (error) {
    res.status(500).json({ error: 'Error logging in' });
  }
});

// Guide Routes
app.get('/api/guides', async (req, res) => {
  try {
    const { search, category, difficulty, sort = 'newest' } = req.query;
    let query = {};

    if (search) {
      query.$text = { $search: search };
    }
    if (category) {
      query.category = category;
    }
    if (difficulty) {
      query.difficulty = parseInt(difficulty);
    }

    let sortOption = {};
    switch (sort) {
      case 'newest':
        sortOption = { createdAt: -1 };
        break;
      case 'popular':
        sortOption = { views: -1 };
        break;
      case 'rating':
        sortOption = { averageRating: -1 };
        break;
    }

    const guides = await Guide.find(query)
      .sort(sortOption)
      .populate('author', 'username reputation')
      .populate('device', 'name brand')
      .limit(20);

    res.json(guides);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching guides' });
  }
});

app.post('/api/guides', authenticateToken, async (req, res) => {
  try {
    const guide = new Guide({
      ...req.body,
      author: req.user.userId
    });
    await guide.save();
    res.status(201).json(guide);
  } catch (error) {
    res.status(500).json({ error: 'Error creating guide' });
  }
});

// Product Routes
app.get('/api/products', async (req, res) => {
  try {
    const { search, category, inStock } = req.query;
    let query = {};

    if (search) {
      query.$text = { $search: search };
    }
    if (category) {
      query.category = category;
    }
    if (inStock === 'true') {
      query.stock = { $gt: 0 };
    }

    const products = await Product.find(query)
      .sort({ averageRating: -1 })
      .limit(20);

    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching products' });
  }
});

app.post('/api/products', authenticateToken, async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: 'Error creating product' });
  }
});

// User Profile Routes
app.get('/api/users/:userId', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.params.userId)
      .select('-password')
      .populate('savedGuides');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching user profile' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
