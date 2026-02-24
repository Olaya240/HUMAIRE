import CV from '../models/CV.js';
import { parseCV } from '../services/cvParser.service.js';

export const uploadCV = async (req, res, next) => {
    try {
        if (!req.file) {
            res.status(400);
            throw new Error('No file uploaded');
        }

        const { path, filename, originalname, mimetype } = req.file;

        // Parse content
        const extractedText = await parseCV(path, mimetype);

        // Save to DB
        const newCV = await CV.create({
            filename,
            originalName: originalname,
            path,
            mimeType: mimetype,
            extractedText
        });

        res.status(201).json({
            message: 'CV uploaded and processed successfully',
            cvId: newCV._id,
            extractedText: newCV.extractedText,
            cv: newCV
        });

    } catch (error) {
        next(error);
    }
};