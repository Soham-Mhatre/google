import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import roadmapRoutes from './routes/roadmapRoutes.js';
import chatbotRoutes from './routes/chatbotRoutes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the Gemini API server');
});

// Use routes
app.use('/api/roadmap', roadmapRoutes);
app.use('/api/chatbot', chatbotRoutes);

// Catch-all route for undefined paths
app.use((req, res) => {
  res.status(404).send('404 - Not Found');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});