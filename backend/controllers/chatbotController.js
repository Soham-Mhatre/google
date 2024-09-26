// backend/controllers/chatbotController.js
import { askGemini } from '../services/geminiService.js';

export const askChatbot = async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  try {
    console.log('Received prompt:', prompt);
    const response = await askGemini(prompt);
    console.log('Gemini API response:', response);
    res.status(200).json({ response });
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    res.status(500).json({ error: 'Failed to get response from chatbot', details: error.message });
  }
};