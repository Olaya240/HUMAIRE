import * as moderation from './moderationService.js';

// Simulated AI Service: takes a prompt and returns a response object.
// In a real integration, this would call OpenAI or another provider.
export const processQuery = async (prompt, opts = {}) => {
  // 1) Run moderation on the prompt
  const mod = moderation.check(prompt);

  // If prompt is disallowed, return a safe message and mark moderated false
  if (!mod.allowed) {
    return {
      response: 'Your query was flagged by content moderation and cannot be processed.',
      moderated: false,
      metadata: { reason: 'prompt_flagged', matches: mod.matches },
    };
  }

  // 2) Simulate an AI response (this is replacable with real API call)
  // Keep response concise and neutral.
  const response = `Simulated AI response for input: "${prompt}"\n\n[This is a simulated answer produced by HUMAIRE. Replace with real AI integration.]`;

  // 3) Optionally moderate the response itself (basic check)
  const responseMod = moderation.check(response);
  const moderated = responseMod.allowed;

  const finalResponse = moderated ? response : 'Generated content was removed by moderation.';

  return {
    response: finalResponse,
    moderated,
    metadata: { promptMatches: mod.matches, responseMatches: responseMod.matches },
  };
};
