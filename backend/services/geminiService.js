import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';


dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);


export const getRoadmapFromGeminiAPI = async (projectDescription, duration) => {
  const prompt = `Generate a learning roadmap for a project described as: "${projectDescription}" over ${duration} weeks. Format the roadmap as week-wise with topic, learning material link, and practice material link for each week.`;
  
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    throw new Error('Failed to generate roadmap from Gemini API');
  }
};
export const askGemini = async (prompt) => {
  try {
    console.log('Calling Gemini API with prompt:', prompt);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    console.log('Received response from Gemini:', response);
    return response.text();
  } catch (error) {
    console.error('Error in askGemini:', error);
    throw new Error(`Failed to get response from Gemini API: ${error.message}`);
  }
};