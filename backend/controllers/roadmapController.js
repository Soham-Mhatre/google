import { getRoadmapFromGeminiAPI } from '../services/geminiService.js';

export const getRoadmap = async (req, res) => {
  const { projectDescription, duration } = req.body;

  if (!projectDescription || !duration) {
    return res.status(400).json({ error: 'Project description and duration are required' });
  }

  try {
    const roadmap = await getRoadmapFromGeminiAPI(projectDescription, duration);
    res.status(200).json({ roadmap });
  } catch (error) {
    console.error('Error fetching roadmap from API:', error);
    res.status(500).json({ error: 'Failed to generate roadmap' });
  }
};