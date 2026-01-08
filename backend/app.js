import express from 'express';
import cors from 'cors';
import jobRoutes from './routes/job.routes.js';
import cvRoutes from './routes/cv.routes.js';
import analysisRoutes from './routes/analysis.routes.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/jobs', jobRoutes);
app.use('/api/cvs', cvRoutes);
app.use('/api/analyze', analysisRoutes);

import { notFound } from './middlewares/notFound.middleware.js';
import { errorHandler } from './middlewares/error.middleware.js';

// Error Handling
app.use(notFound);
app.use(errorHandler);

export default app;