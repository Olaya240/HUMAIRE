import Job from '../models/Job.js';
import { fetchAndStoreJobs } from '../services/jobFetcher.service.js';

export const triggerJobFetch = async (req, res, next) => {
    try {
        const count = await fetchAndStoreJobs();
        res.status(200).json({ message: 'Jobs fetched successfully', count });
    } catch (error) {
        next(error);
    }
};

export const getJobs = async (req, res, next) => {
    try {
        const jobs = await Job.find().sort({ createdAt: -1 });
        res.status(200).json(jobs);
    } catch (error) {
        next(error);
    }
};