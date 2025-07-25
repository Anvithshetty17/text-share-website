const express = require('express');
const router = express.Router();
const { nanoid } = require('nanoid');
const Link = require('../models/Link');

// URL validation regex
const urlRegex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;

// POST /api/link - Create shortened link
router.post('/', async (req, res) => {
  try {
    const { originalUrl, customSlug, expiryDays } = req.body;
    
    if (!originalUrl || originalUrl.trim().length === 0) {
      return res.status(400).json({ message: 'URL is required' });
    }
    
    // Add protocol if missing
    let formattedUrl = originalUrl.trim();
    if (!formattedUrl.startsWith('http://') && !formattedUrl.startsWith('https://')) {
      formattedUrl = 'https://' + formattedUrl;
    }
    
    // Validate URL format
    if (!urlRegex.test(formattedUrl)) {
      return res.status(400).json({ message: 'Invalid URL format' });
    }
    
    let slug = customSlug;
    
    // Generate slug if not provided
    if (!slug) {
      slug = nanoid(6);
    } else {
      // Validate custom slug
      if (!/^[a-zA-Z0-9_-]+$/.test(slug)) {
        return res.status(400).json({ message: 'Custom slug can only contain letters, numbers, hyphens, and underscores' });
      }
      
      if (slug.length < 3 || slug.length > 20) {
        return res.status(400).json({ message: 'Custom slug must be between 3 and 20 characters' });
      }
    }
    
    // Check if slug already exists
    const existingLink = await Link.findOne({ slug });
    if (existingLink) {
      return res.status(400).json({ message: 'Slug already exists. Please choose a different one.' });
    }
    
    // Calculate expiry date
    let expiresAt = null;
    if (expiryDays && expiryDays > 0) {
      expiresAt = new Date(Date.now() + expiryDays * 24 * 60 * 60 * 1000);
    }
    
    const newLink = new Link({
      originalUrl: formattedUrl,
      slug,
      expiresAt
    });
    
    await newLink.save();
    
    const shortUrl = `${req.protocol}://${req.get('host')}/l/${slug}`;
    
    res.status(201).json({
      message: 'Link shortened successfully',
      originalUrl: formattedUrl,
      shortUrl,
      slug,
      expiresAt
    });
  } catch (error) {
    console.error('Error creating shortened link:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/link/:slug/stats - Get link statistics
router.get('/:slug/stats', async (req, res) => {
  try {
    const { slug } = req.params;
    
    const link = await Link.findOne({ slug });
    
    if (!link) {
      return res.status(404).json({ message: 'Link not found' });
    }
    
    res.json({
      originalUrl: link.originalUrl,
      slug: link.slug,
      hitCount: link.hitCount,
      createdAt: link.createdAt,
      expiresAt: link.expiresAt,
      isExpired: link.expiresAt && new Date() > link.expiresAt
    });
  } catch (error) {
    console.error('Error getting link stats:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/link - Get all links (for admin)
router.get('/', async (req, res) => {
  try {
    const links = await Link.find().sort({ createdAt: -1 }).limit(100);
    res.json(links);
  } catch (error) {
    console.error('Error getting links:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
