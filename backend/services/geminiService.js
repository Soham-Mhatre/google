import fetch from 'node-fetch';

export const getRoadmapFromGeminiAPI = async (projectDescription, duration) => {
  const prompt = `Generate a learning roadmap for a project described as: "${projectDescription}" over ${duration} weeks. Format the roadmap as week-wise with topic, learning material link, and practice material link for each week.`;
  
  const response = await fetch(process.env.GEMINI_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.GEMINI_API_KEY}`, // Ensure this matches your API key setup
    },
    body: JSON.stringify({
      prompt: prompt,
      max_tokens: 1500, // Adjust based on your needs
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to fetch data from Gemini API');
  }

  const data = await response.json();
  return data.roadmap; // Assuming the API returns the roadmap in this format
};
