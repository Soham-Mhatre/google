// Import Gemini API or mock service
import { fetchRoadmapFromAPI } from './geminiService.js';

export const generateRoadmap = async (projectDescription, duration) => {
  // Call API service and get roadmap
  const roadmap = await fetchRoadmapFromAPI(projectDescription, duration);
  
  // You can format the roadmap here if needed before returning
  return roadmap;
}