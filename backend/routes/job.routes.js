import express from 'express';
import { triggerJobFetch, getJobs } from '../controllers/job.controller.js';

const router = express.Router();

router.post('/fetch', triggerJobFetch);
router.get('/', getJobs);

export default router;