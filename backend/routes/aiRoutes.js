import express from 'express';
import * as aiController from '../controllers/aiController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/query', authMiddleware, aiController.query);
router.get('/history', authMiddleware, aiController.history);

export default router;
