import fs from 'fs';
import mammoth from 'mammoth';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

export const parseCV = async (filePath, mimeType) => {
    try {
        console.log('🔍 Parsing CV:', { filePath, mimeType });
        let extractedText = '';

        if (mimeType === 'application/pdf') {
            console.log('📄 Processing PDF...');
            const dataBuffer = fs.readFileSync(filePath);
            console.log('📦 Buffer size:', dataBuffer.length);

            // Use require for pdf-parse as it is a CommonJS module
            const { PDFParse } = require('pdf-parse');

            console.log('🔧 Initializing PDFParse...');
            const pdf = new PDFParse({
                data: new Uint8Array(dataBuffer),
                verbosity: 0
            });

            console.log('📄 Extracting text...');
            const result = await pdf.getText();

            console.log('✅ PDF parsed, text length:', result.text?.length);
            extractedText = result.text || '';
        } else if (mimeType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
            const result = await mammoth.extractRawText({ path: filePath });
            extractedText = result.value;
        } else {
            throw new Error('Unsupported file format. Only PDF and DOCX are allowed.');
        }

        return extractedText.trim();
    } catch (error) {
        console.error('❌ CV Parsing Error:', error);
        console.error('Stack:', error.stack);
        throw new Error('Failed to extract text from CV.');
    }
};