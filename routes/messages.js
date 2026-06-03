const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

// GET /api/messages - get all messages (simple admin view)
// In production you'd add auth middleware here
router.get('/', async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 }).limit(50);
    res.json({ success: true, count: messages.length, messages });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// GET /api/messages/count
router.get('/count', async (req, res) => {
  try {
    const total = await Contact.countDocuments();
    const unread = await Contact.countDocuments({ read: false });
    res.json({ success: true, total, unread });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
