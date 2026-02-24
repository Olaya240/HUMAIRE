import AIRequest from '../models/AIRequest.js';
import * as aiService from '../services/aiService.js';

// Handle a user query: send to AI service, moderate, save
export const query = async (req, res) => {
  const userId = req.user.id;
  const { prompt } = req.body;
  if (!prompt) return res.status(400).json({ message: 'Prompt is required' });

  // Use aiService which returns { response, moderated, metadata }
  const result = await aiService.processQuery(prompt, { userId });

  const record = await AIRequest.create({
    user: userId,
    prompt,
    response: result.response,
    moderated: result.moderated,
    metadata: result.metadata || {},
  });

  res.status(201).json({ record });
};

// Get current user's AI history
export const history = async (req, res) => {
  const userId = req.user.id;
  const logs = await AIRequest.find({ user: userId }).sort({ createdAt: -1 });
  res.json({ logs });
};
