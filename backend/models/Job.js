import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
    external_id: {
        type: String,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: false
    },
    date_posted: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

const Job = mongoose.model('Job', jobSchema);

export default Job;