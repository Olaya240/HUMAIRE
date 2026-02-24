import axios from 'axios';
import Job from '../models/Job.js';

const JOB_API_URL = process.env.JOB_API_URL || 'https://findwork.dev/api/jobs/';

export const fetchAndStoreJobs = async () => {
    try {
        console.log('Fetching jobs from external API...');

        // Note: For Findwork.dev, you need an API key in the Authorization header.
        // If using a different free API like Remotive (https://remotive.com/api/remote-jobs), adjust accordingly.
        const config = {
            headers: {
                // If using Findwork.dev
                'Authorization': `Token ${process.env.FINDWORK_API_TOKEN}`
            }
        };

        // If using Remotive (free, no key), remove config.
        // For compliance with user request, we assume Findwork/similar structure.

        const response = await axios.get(JOB_API_URL, process.env.FINDWORK_API_TOKEN ? config : {});

        const jobsData = response.data.results || response.data.jobs || response.data; // Handle different API structures

        if (!Array.isArray(jobsData)) {
            throw new Error("Invalid API response format: Expected an array of jobs.");
        }

        let savedCount = 0;

        for (const jobData of jobsData) {
            // Map API fields to our schema
            const newJob = {
                external_id: jobData.id?.toString() || jobData.url || Math.random().toString(), // Ensure unique ID
                title: jobData.role || jobData.title,
                company: jobData.company_name || jobData.company,
                location: jobData.location,
                description: jobData.text || jobData.description, // Remotive uses 'description', Findwork uses 'text'
                url: jobData.url,
                date_posted: jobData.date_posted ? new Date(jobData.date_posted) : new Date()
            };

            // Upsert (update if exists, insert if new)
            await Job.findOneAndUpdate(
                { external_id: newJob.external_id },
                newJob,
                { upsert: true, new: true }
            );
            savedCount++;
        }

        console.log(`Successfully fetched and stored ${savedCount} jobs.`);
        return savedCount;

    } catch (error) {
        console.error('Error fetching jobs:', error.message);
        throw error;
    }
};

export const fetchInterviewDetails = async (interviewId = '19018219') => {
    try {
        const options = {
            method: 'GET',
            url: 'https://glassdoor-real-time.p.rapidapi.com/companies/interview-details',
            params: { interviewId },
            headers: {
                'x-rapidapi-key': process.env.RAPIDAPI_KEY || 'e5da63c97amshc3dae869f0a7046p12b18fjsn5e4cba115049',
                'x-rapidapi-host': 'glassdoor-real-time.p.rapidapi.com'
            }
        };

        const response = await axios.request(options);
        console.log('Glassdoor Interview Details:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching Glassdoor interview details:', error.message);
        throw error;
    }
};
