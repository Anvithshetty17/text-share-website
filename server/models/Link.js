const mongoose = require('mongoose');

const linkSchema = new mongoose.Schema({
  originalUrl: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true,
    unique: true
  },
  hitCount: {
    type: Number,
    default: 0
  },
  expiresAt: {
    type: Date,
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Link', linkSchema);
