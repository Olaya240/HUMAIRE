import mongoose from 'mongoose';

const cvSchema = new mongoose.Schema({
    filename: {
        type: String,
        required: true
    },
    originalName: {
        type: String,
        required: true
    },
    path: {
        type: String,
        required: true
    },
    mimeType: {
        type: String,
        required: true
    },
    extractedText: {
        type: String,
        required: true
    },
    uploadDate: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

const CV = mongoose.model('CV', cvSchema);

export default CV;