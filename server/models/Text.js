const mongoose = require('mongoose');

const textSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
    length: 4
  },
  content: {
    type: String,
    required: true,
    maxlength: 50000
  },
  isOneTime: {
    type: Boolean,
    default: false
  },
  viewCount: {
    type: Number,
    default: 0
  },
  maxViews: {
    type: Number,
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 600 // 10 minutes TTL
  }
});

// Index for TTL (Time To Live) - MongoDB will auto-delete after 10 minutes
textSchema.index({ createdAt: 1 }, { expireAfterSeconds: 600 });

module.exports = mongoose.model('Text', textSchema);
