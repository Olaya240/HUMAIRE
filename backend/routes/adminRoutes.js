const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { authMiddleware, adminOnly } = require('../middlewares/authMiddleware');

router.get('/users', authMiddleware, adminOnly, adminController.getUsers);
router.get('/logs', authMiddleware, adminOnly, adminController.getLogs);

module.exports = router;
