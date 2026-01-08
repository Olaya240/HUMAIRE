import fs from 'fs';
import pdf from 'pdf-parse';
import mammoth from 'mammoth';

export const parseCV = async (filePath, mimeType) => {
    try {
        let extractedText = '';

        if (mimeType === 'application/pdf') {
            const dataBuffer = fs.readFileSync(filePath);
            const data = await pdf(dataBuffer);
            extractedText = data.text;
        } else if (mimeType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
            const result = await mammoth.extractRawText({ path: filePath });
            extractedText = result.value;
        } else {
            throw new Error('Unsupported file format. Only PDF and DOCX are allowed.');
        }

        return extractedText.trim();
    } catch (error) {
        console.error('Error parsing CV:', error.message);
        throw new Error('Failed to extract text from CV.');
    }
};