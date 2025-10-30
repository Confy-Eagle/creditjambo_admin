const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const { listUsers, viewUser } = require('../controllers/userController');

router.get('/', auth, listUsers); // GET all users
router.get('/:id', auth, viewUser); // GET single user (with devices & balance)

module.exports = router;
