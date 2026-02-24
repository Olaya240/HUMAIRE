import express from 'express';
import * as adminController from '../controllers/adminController.js';
import { authMiddleware, adminOnly } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/users', authMiddleware, adminOnly, adminController.getUsers);
router.get('/logs', authMiddleware, adminOnly, adminController.getLogs);

export default router;
