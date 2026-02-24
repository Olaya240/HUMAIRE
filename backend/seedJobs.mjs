import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Job from './models/Job.js';

dotenv.config();

const sampleJobs = [
    {
        external_id: 'seed-1',
        title: 'Full Stack Web Developer',
        company: 'TechFlow Solutions',
        location: 'Remote',
        description: 'We are looking for a motivated Full Stack Developer experienced in React, Node.js, and MongoDB. You will build and maintain modern web applications, collaborate with cross-functional teams, and contribute to architectural decisions.',
        url: 'https://example.com/jobs/1',
        date_posted: new Date()
    },
    {
        external_id: 'seed-2',
        title: 'Frontend Engineer',
        company: 'DesignFirst AI',
        location: 'San Francisco, CA',
        description: 'Join our team to build beautiful, human-centric AI interfaces. Expertise in React, Tailwind CSS, and Framer Motion is required. Experience with AI-generated content is a plus.',
        url: 'https://example.com/jobs/2',
        date_posted: new Date()
    },
    {
        external_id: 'seed-3',
        title: 'Backend Node.js Developer',
        company: 'DataScale Systems',
        location: 'New York, NY',
        description: 'Help us scale our backend infrastructure. Strong knowledge of Node.js, Express, MongoDB, and AWS is essential. You will be responsible for building robust APIs and optimizing database performance.',
        url: 'https://example.com/jobs/3',
        date_posted: new Date()
    }
];

const seedJobs = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ Connected to MongoDB for seeding');

        for (const job of sampleJobs) {
            await Job.findOneAndUpdate(
                { external_id: job.external_id },
                job,
                { upsert: true, new: true }
            );
        }

        console.log(`✅ Successfully seeded ${sampleJobs.length} jobs.`);
        process.exit(0);
    } catch (error) {
        console.error('❌ Seeding failed:', error);
        process.exit(1);
    }
};

seedJobs();
