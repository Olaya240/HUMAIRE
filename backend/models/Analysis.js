import mongoose from 'mongoose';

const analysisSchema = new mongoose.Schema({
    cv: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CV',
        required: true
    },
    job: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job',
        required: true
    },
    compatibility_score: {
        type: Number,
        required: true,
        min: 0,
        max: 100
    },
    strengths: {
        type: [String],
        default: []
    },
    weaknesses: {
        type: [String],
        default: []
    },
    missing_skills: {
        type: [String],
        default: []
    },
    improvement_suggestions: {
        type: [String],
        default: []
    }
}, { timestamps: true });

const Analysis = mongoose.model('Analysis', analysisSchema);

export default Analysis;