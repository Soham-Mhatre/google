import { getRoadmapFromGeminiAPI } from '../services/geminiService.js';
import Roadmap from '../models/Roadmap.js';

export const generateRoadmap = async (req, res) => {
  const { topic, weeks } = req.body;
  const userId = req.user.id;

  try {
    const roadmap = await getRoadmapFromGeminiAPI(topic, weeks);
    
    // Save roadmap to database
    await Roadmap.create({ userId, topic, duration: weeks, content: roadmap });

    res.status(200).json({ roadmap });
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate roadmap' });
  }
};

export const getRoadmapHistory = async (req, res) => {
  const userId = req.user.id;

  try {
    const history = await Roadmap.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json({ history });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch roadmap history' });
  }
};