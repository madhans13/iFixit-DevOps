require('dotenv').config();
const express = require('express');
const sequelize = require('./config/database');
const { Op } = require('sequelize');
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
const { User, Guide, Product, Device } = require('./models');

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

// Connect to PostgreSQL
const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connected to PostgreSQL');
    
    // Sync database (create tables if they don't exist)
    await sequelize.sync({ force: true });
    console.log('Database synchronized');
  } catch (error) {
    console.error('PostgreSQL connection error:', error);
    process.exit(1);
  }
};

connectDB();

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
    const guide = await Guide.findByPk(req.params.guideId, {
      include: [
        { model: User, as: 'author', attributes: ['username', 'reputation'] },
        { model: Device, as: 'device', attributes: ['name', 'brand'] }
      ]
    });
    
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
    let whereClause = {};

    if (category) {
      whereClause.category = category;
    }
    if (difficulty) {
      whereClause.difficulty = parseInt(difficulty);
    }

    let orderClause = [];
    switch (sort) {
      case 'newest':
        orderClause = [['createdAt', 'DESC']];
        break;
      case 'popular':
        orderClause = [['views', 'DESC']];
        break;
      case 'rating':
        orderClause = [['averageRating', 'DESC']];
        break;
    }

    const guides = await Guide.findAll({
      where: whereClause,
      order: orderClause,
      include: [
        { model: User, as: 'author', attributes: ['username', 'reputation'] },
        { model: Device, as: 'device', attributes: ['name', 'brand'] }
      ],
      limit: 20
    });

    // If search is provided, filter results (PostgreSQL full-text search would be better)
    let filteredGuides = guides;
    if (search) {
      filteredGuides = guides.filter(guide => 
        guide.title.toLowerCase().includes(search.toLowerCase()) ||
        guide.introduction.toLowerCase().includes(search.toLowerCase())
      );
    }

    res.json(filteredGuides);
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
      where: {
        name: deviceName,
        brand: deviceBrand
      }
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
    const guide = await Guide.create({
      title,
      category,
      difficulty: parseInt(difficulty),
      timeRequired: parsedTimeRequired,
      introduction,
      prerequisites: parsedPrerequisites,
      steps: processedSteps,
      status,
      authorId: req.user.id,
      deviceId: device.id
    });
    
    // Fetch the created guide with associations
    const populatedGuide = await Guide.findByPk(guide.id, {
      include: [
        { model: User, as: 'author', attributes: ['username'] },
        { model: Device, as: 'device', attributes: ['name', 'brand'] }
      ]
    });

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
    let whereClause = {};

    if (category) {
      whereClause.category = category;
    }
    if (inStock === 'true') {
      whereClause.stock = { [Op.gt]: 0 };
    }

    const products = await Product.findAll({
      where: whereClause,
      order: [['averageRating', 'DESC']],
      limit: 20
    });

    // If search is provided, filter results
    let filteredProducts = products;
    if (search) {
      filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.description.toLowerCase().includes(search.toLowerCase())
      );
    }

    res.json(filteredProducts);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching products' });
  }
});

app.post('/api/products', authenticateToken, async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
    } catch (error) {
    res.status(500).json({ error: 'Error creating product' });
  }
});

// User Profile Routes
app.get('/api/users/:userId', authenticateToken, async (req, res) => {
  try {
    const user = await User.findByPk(req.params.userId, {
      attributes: { exclude: ['password'] },
      include: [
        { model: Guide, as: 'guides', attributes: ['id', 'title', 'createdAt'] }
      ]
    });
    
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
