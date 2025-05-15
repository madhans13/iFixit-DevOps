require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const morgan = require('morgan');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const authRoutes = require('./routes/auth');
const session = require('express-session');
const passport = require('./config/passport');

const app = express();
const PORT = process.env.PORT || 5000;

// Import models
const User = require('./models/User');
const Guide = require('./models/Guide');
const Product = require('./models/Product');
const Device = require('./models/Device');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(__dirname, 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    // Generate a unique filename with timestamp and original extension
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, uniqueSuffix + ext);
  }
});

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    // Accept only image files
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'));
    }
  }
});

// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Disable helmet for development
app.use(helmet({
  crossOriginResourcePolicy: false,
  crossOriginEmbedderPolicy: false
}));

app.use(morgan('dev'));

// Serve static files with proper headers
app.use('/uploads', (req, res, next) => {
  res.set({
    'Access-Control-Allow-Origin': 'http://localhost:5173',
    'Cache-Control': 'public, max-age=3600',
    'Cross-Origin-Resource-Policy': 'cross-origin'
  });
  express.static(path.join(__dirname, 'uploads'))(req, res, next);
});

// Add headers for all responses
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Credentials', true);
  next();
});

// Session configuration
app.use(session({
  secret: process.env.SESSION_SECRET || 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/ifixit', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Authentication Middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key', (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }
    req.user = decoded;
    next();
  });
};

// Routes
app.use('/api/auth', authRoutes);

// Guide Routes
app.get('/api/guides/:guideId', async (req, res) => {
  try {
    const guide = await Guide.findById(req.params.guideId)
      .populate('author', 'username reputation')
      .populate('device', 'name brand');
    
    if (!guide) {
      return res.status(404).json({ error: 'Guide not found' });
    }

    // Increment views
    guide.views += 1;
    await guide.save();
    
    res.json(guide);
  } catch (error) {
    console.error('Error fetching guide:', error);
    res.status(500).json({ error: 'Error fetching guide' });
  }
});

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

app.post('/api/guides', authenticateToken, upload.array('images'), async (req, res) => {
  try {
    console.log('Received guide submission request');
    console.log('User:', req.user);
    console.log('Files:', req.files);
    console.log('Body:', req.body);

    const {
      title,
      category,
      difficulty,
      timeRequired,
      introduction,
      prerequisites,
      steps,
      status,
      deviceName,
      deviceBrand
    } = req.body;

    // Parse JSON strings
    const parsedSteps = JSON.parse(steps);
    const parsedPrerequisites = JSON.parse(prerequisites);
    const parsedTimeRequired = JSON.parse(timeRequired);

    // Process uploaded images and map them to steps
    let fileIndex = 0;
    const processedSteps = parsedSteps.map(step => {
      const stepImages = [];
      const numImages = step.images.length;
      
      for (let i = 0; i < numImages; i++) {
        if (req.files[fileIndex]) {
          stepImages.push({
            url: req.files[fileIndex].filename,
            caption: `Step ${step.order} image ${i + 1}`
          });
          fileIndex++;
        }
      }
      
      return {
        ...step,
        images: stepImages
      };
    });

    // Find or create device
    let device = await Device.findOne({ 
      name: deviceName,
      brand: deviceBrand
    });

    if (!device) {
      device = await Device.create({
        name: deviceName,
        brand: deviceBrand,
        category: 'other',
        model: deviceName,
        status: 'active'
      });
    }

    // Create guide with processed steps
    const guide = new Guide({
      title,
      category,
      difficulty: parseInt(difficulty),
      timeRequired: parsedTimeRequired,
      introduction,
      prerequisites: parsedPrerequisites,
      steps: processedSteps,
      status,
      author: req.user.id,
      device: device._id
    });

    const savedGuide = await guide.save();
    
    // Populate the response with author details
    const populatedGuide = await Guide.findById(savedGuide._id)
      .populate('author', 'username')
      .populate('device', 'name brand');

    res.status(201).json(populatedGuide);
  } catch (error) {
    console.error('Error creating guide:', error);
    res.status(500).json({ error: 'Something broke!' });
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

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something broke!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
