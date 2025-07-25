const express = require('express');
const router = express.Router();
const Text = require('../models/Text');

// Generate random 4-digit code
const generateCode = () => {
  return Math.floor(1000 + Math.random() * 9000).toString();
};

// POST /api/text - Create new text
router.post('/', async (req, res) => {
  try {
    const { content, isOneTime, maxViews } = req.body;
    
    if (!content || content.trim().length === 0) {
      return res.status(400).json({ message: 'Content is required' });
    }
    
    if (content.length > 50000) {
      return res.status(400).json({ message: 'Content too long (max 50,000 characters)' });
    }
    
    let code;
    let attempts = 0;
    const maxAttempts = 10;
    
    // Generate unique code
    do {
      code = generateCode();
      attempts++;
      if (attempts > maxAttempts) {
        return res.status(500).json({ message: 'Unable to generate unique code. Please try again.' });
      }
    } while (await Text.findOne({ code }));
    
    const newText = new Text({
      code,
      content: content.trim(),
      isOneTime: isOneTime || false,
      maxViews: maxViews || null
    });
    
    await newText.save();
    
    res.status(201).json({
      message: 'Text created successfully',
      code: newText.code,
      expiresAt: new Date(Date.now() + 10 * 60 * 1000) // 10 minutes from now
    });
  } catch (error) {
    console.error('Error creating text:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/text/:code - Retrieve text by code
router.get('/:code', async (req, res) => {
  try {
    const { code } = req.params;
    
    if (!/^\d{4}$/.test(code)) {
      return res.status(400).json({ message: 'Invalid code format' });
    }
    
    const text = await Text.findOne({ code });
    
    if (!text) {
      return res.status(404).json({ message: 'Text not found or expired' });
    }
    
    // Check view limits
    if (text.maxViews && text.viewCount >= text.maxViews) {
      await Text.findByIdAndDelete(text._id);
      return res.status(404).json({ message: 'Text has reached maximum views and was deleted' });
    }
    
    // Increment view count
    await Text.findByIdAndUpdate(text._id, { $inc: { viewCount: 1 } });
    
    // If one-time view, delete after viewing
    if (text.isOneTime) {
      await Text.findByIdAndDelete(text._id);
    }
    
    res.json({
      content: text.content,
      viewCount: text.viewCount + 1,
      isOneTime: text.isOneTime,
      maxViews: text.maxViews,
      createdAt: text.createdAt
    });
  } catch (error) {
    console.error('Error retrieving text:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
