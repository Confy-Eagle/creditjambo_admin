const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const { listDevices, updateVerification, removeDevice } = require('../controllers/deviceController');

router.get('/', auth, listDevices);
router.put('/:id/verify', auth, updateVerification);
router.delete('/:id', auth, removeDevice);

module.exports = router;
