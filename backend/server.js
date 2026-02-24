import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import 'express-async-errors';

import connectDB from './config/db.js';

import authRoutes from './routes/authRoutes.js';
import aiRoutes from './routes/aiRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import jobRoutes from './routes/job.routes.js';
import cvRoutes from './routes/cv.routes.js';
import analysisRoutes from './routes/analysis.routes.js';
import { errorHandler } from './middlewares/errorHandler.js';

dotenv.config();

// Init app
const app = express();

// Middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/cvs', cvRoutes);
app.use('/api/analyze', analysisRoutes);

// Error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

// Start server
const startServer = async () => {
  try {
    await connectDB();
    console.log('✅ Connected to MongoDB');

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('❌ Server failed to start', error);
    process.exit(1);
  }
};

startServer();
