const express = require('express');
const { authenticate, requireAdmin } = require('../middleware/auth');
const User = require('../models/user');

const router = express.Router();

// Get all users (admin only)
router.get('/users', authenticate, requireAdmin, async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
