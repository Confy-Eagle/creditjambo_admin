const express = require('express');
const router = express.Router();
const { login, getProfile } = require('../controllers/authController');
const auth = require('../middlewares/authMiddleware');

// Admin Login
router.post('/login', login);

// Optional: get current admin profile
router.get('/me', auth, getProfile);

module.exports = router;
