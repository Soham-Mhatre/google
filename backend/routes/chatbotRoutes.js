import express from 'express';
import { askChatbot } from '../controllers/chatbotController.js';

const router = express.Router();
router.get('/', (req, res) => {
    res.send('Chatbot API endpoint');
  });
router.post('/', askChatbot);

export default router;