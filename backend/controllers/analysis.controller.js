import { matchCVWithJob, matchCVWithAllJobs } from '../services/matcher.service.js';

export const analyzeCvJob = async (req, res, next) => {
    try {
        const { cvId, jobId } = req.body;

        if (!cvId || !jobId) {
            res.status(400);
            throw new Error('cvId and jobId are required');
        }

        const result = await matchCVWithJob(cvId, jobId);
        res.status(200).json(result);

    } catch (error) {
        next(error);
    }
};

export const analyzeCvAll = async (req, res, next) => {
    try {
        const { cvId } = req.body;

        if (!cvId) {
            res.status(400);
            throw new Error('cvId is required');
        }

        const results = await matchCVWithAllJobs(cvId);
        res.status(200).json(results);

    } catch (error) {
        next(error);
    }
};