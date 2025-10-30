const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const { listAll, listByUser } = require('../controllers/transactionController');

router.get('/', auth, listAll);        // GET all transactions
router.get('/:userId', auth, listByUser); // GET transactions by user

module.exports = router;
