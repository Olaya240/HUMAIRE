import express from 'express';
import { analyzeCvJob, analyzeCvAll } from '../controllers/analysis.controller.js';

const router = express.Router();

router.post('/cv-job', analyzeCvJob);
router.post('/cv-all-jobs', analyzeCvAll);

export default router;