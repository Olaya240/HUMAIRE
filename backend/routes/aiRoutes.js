const express = require('express');
const router = express.Router();
const aiController = require('../controllers/aiController');
const { authMiddleware } = require('../middlewares/authMiddleware');

router.post('/query', authMiddleware, aiController.query);
router.get('/history', authMiddleware, aiController.history);

module.exports = router;
