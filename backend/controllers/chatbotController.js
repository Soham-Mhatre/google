import { askGemini } from '../services/geminiService.js';
import Chat from '../models/Chat.js';

export const askChatbot = async (req, res) => {
  const { message } = req.body;
  const userId = req.user.id; // Assuming you have authentication middleware

  try {
    const response = await askGemini(message);
    
    // Save chat to database
    await Chat.create({ userId, userMessage: message, botResponse: response });

    res.status(200).json({ response });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get response from chatbot' });
  }
};

export const getChatHistory = async (req, res) => {
  const userId = req.user.id;

  try {
    const history = await Chat.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json({ history });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch chat history' });
  }
};