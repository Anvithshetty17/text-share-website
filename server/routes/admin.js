const express = require('express');
const router = express.Router();
const Text = require('../models/Text');
const Link = require('../models/Link');

// Simple password protection (in production, use proper authentication)
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

// Middleware to check admin password
const checkAdminAuth = (req, res, next) => {
  const { password } = req.query;
  
  if (password !== ADMIN_PASSWORD) {
    return res.status(401).json({ message: 'Unauthorized. Invalid admin password.' });
  }
  
  next();
};

// GET /api/admin/stats - Get overall stats
router.get('/stats', checkAdminAuth, async (req, res) => {
  try {
    const textCount = await Text.countDocuments();
    const linkCount = await Link.countDocuments();
    const totalHits = await Link.aggregate([
      { $group: { _id: null, total: { $sum: '$hitCount' } } }
    ]);
    
    res.json({
      activeTexts: textCount,
      totalLinks: linkCount,
      totalLinkHits: totalHits[0]?.total || 0,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error getting admin stats:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/admin/texts - Get all texts
router.get('/texts', checkAdminAuth, async (req, res) => {
  try {
    const texts = await Text.find()
      .select('code content viewCount isOneTime maxViews createdAt')
      .sort({ createdAt: -1 })
      .limit(100);
    
    res.json(texts);
  } catch (error) {
    console.error('Error getting texts:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE /api/admin/texts/:id - Delete specific text
router.delete('/texts/:id', checkAdminAuth, async (req, res) => {
  try {
    const { id } = req.params;
    
    const deletedText = await Text.findByIdAndDelete(id);
    
    if (!deletedText) {
      return res.status(404).json({ message: 'Text not found' });
    }
    
    res.json({ message: 'Text deleted successfully' });
  } catch (error) {
    console.error('Error deleting text:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/admin/links - Get all links
router.get('/links', checkAdminAuth, async (req, res) => {
  try {
    const links = await Link.find()
      .sort({ createdAt: -1 })
      .limit(100);
    
    res.json(links);
  } catch (error) {
    console.error('Error getting links:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE /api/admin/links/:id - Delete specific link
router.delete('/links/:id', checkAdminAuth, async (req, res) => {
  try {
    const { id } = req.params;
    
    const deletedLink = await Link.findByIdAndDelete(id);
    
    if (!deletedLink) {
      return res.status(404).json({ message: 'Link not found' });
    }
    
    res.json({ message: 'Link deleted successfully' });
  } catch (error) {
    console.error('Error deleting link:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE /api/admin/cleanup - Clean up expired entries
router.delete('/cleanup', checkAdminAuth, async (req, res) => {
  try {
    // Clean up expired links
    const expiredLinks = await Link.deleteMany({
      expiresAt: { $lt: new Date() }
    });
    
    res.json({
      message: 'Cleanup completed',
      deletedLinks: expiredLinks.deletedCount
    });
  } catch (error) {
    console.error('Error during cleanup:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
