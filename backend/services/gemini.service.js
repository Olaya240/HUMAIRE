import model from '../config/gemini.js';

export const analyzeCVWithJob = async (cvText, jobDescription) => {
    try {
        const prompt = `
        You are an AI recruitment expert.
        Compare the following CV with the job offer.
        
        JOB DESCRIPTION:
        ${jobDescription}
        
        CV CONTENT:
        ${cvText}
        
        Return STRICT JSON with:
        - compatibility_score (0-100)
        - strengths (array of strings, concise and effective)
        - weaknesses (array of strings, concise and effective)
        - missing_skills (array of strings, concise and effective)
        - improvement_suggestions (array of strings, concise and effective)
        
        Instructions:
        - Detect the language of the CV and strictly use the SAME language for the response.
        - Be direct and to the point.
        - Avoid verbose explanations.
        - Each item should be short and impactful (max 15 words per item).
        
        Do not allow any markdown formatting in the output, just raw JSON.
        `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // Clean up markdown code blocks if present (Gemini often adds ```json ... ```)
        const jsonString = text.replace(/```json/g, '').replace(/```/g, '').trim();

        try {
            return JSON.parse(jsonString);
        } catch (e) {
            console.error("Failed to parse Gemini response as JSON:", text);
            throw new Error("Invalid response format from AI");
        }
    } catch (error) {
        console.error('Gemini Analysis Error:', error.message);
        throw error;
    }
};