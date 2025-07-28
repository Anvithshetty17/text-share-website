const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
});

// Middleware
app.use(limiter);
const allowedOrigins = [
  'https://gotext.anvithshetty.me',
  'https://gotext.vercel.app',
  'http://localhost:3000' // dev environment
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    callback(new Error('Not allowed by CORS'));
  },
  methods: ['GET', 'POST', 'OPTIONS'],
  credentials: true,
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/student-tools';
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/text', require('./routes/text'));
app.use('/api/link', require('./routes/link'));
app.use('/api/admin', require('./routes/admin'));

// Redirect route for shortened links
app.get('/l/:slug', async (req, res) => {
  try {
    const Link = require('./models/Link');
    const link = await Link.findOne({ slug: req.params.slug });
    
    if (!link) {
      return res.status(404).json({ message: 'Link not found' });
    }
    
    // Check if link has expired
    if (link.expiresAt && new Date() > link.expiresAt) {
      await Link.findByIdAndDelete(link._id);
      return res.status(404).json({ message: 'Link has expired' });
    }
    
    // Increment hit count
    await Link.findByIdAndUpdate(link._id, { $inc: { hitCount: 1 } });
    
    res.redirect(link.originalUrl);
  } catch (error) {
    console.error('Redirect error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ message: 'Server is running', timestamp: new Date().toISOString() });
});

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
