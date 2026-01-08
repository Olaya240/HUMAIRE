import Analysis from '../models/Analysis.js';
import CV from '../models/CV.js';
import Job from '../models/Job.js';
import { analyzeCVWithJob } from './gemini.service.js';

export const matchCVWithJob = async (cvId, jobId) => {
    const cv = await CV.findById(cvId);
    if (!cv) throw new Error('CV not found');

    const job = await Job.findById(jobId);
    if (!job) throw new Error('Job not found');

    // Check if analysis already exists to save costs/time, or force re-analyze? 
    // Requirement says "Compare", implies action. We will assume always run fresh or update.

    const analysisResult = await analyzeCVWithJob(cv.extractedText, job.description);

    // Save result
    const storedAnalysis = await Analysis.findOneAndUpdate(
        { cv: cvId, job: jobId },
        {
            compatibility_score: analysisResult.compatibility_score,
            strengths: analysisResult.strengths,
            weaknesses: analysisResult.weaknesses,
            missing_skills: analysisResult.missing_skills,
            improvement_suggestions: analysisResult.improvement_suggestions
        },
        { upsert: true, new: true }
    );

    return storedAnalysis;
};

export const matchCVWithAllJobs = async (cvId) => {
    const jobs = await Job.find({});
    if (jobs.length === 0) throw new Error('No jobs found to compare against.');

    const results = [];

    // In production, this should be a queue job, but here we await loop
    for (const job of jobs) {
        try {
            const analysis = await matchCVWithJob(cvId, job._id);
            results.push(analysis);
        } catch (err) {
            console.error(`Failed to analyze job ${job._id}:`, err.message);
        }
    }

    // Sort by compatibility score descending
    results.sort((a, b) => b.compatibility_score - a.compatibility_score);

    return results;
};