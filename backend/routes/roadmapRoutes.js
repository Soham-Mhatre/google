// Use import statements for ES6 modules
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Import routes
import roadmapRoutes from './roadmapRoutes.js';
import chatbotRoutes from './chatbotRoutes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json()); // To parse JSON bodies

// Use routes
app.use('/api/roadmap', roadmapRoutes);
app.use('/api/chatbot', chatbotRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
