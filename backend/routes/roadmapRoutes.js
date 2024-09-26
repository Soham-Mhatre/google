import express from 'express';
import { getRoadmap } from '../controllers/roadmapController.js';

const router = express.Router();

// Handle GET requests
router.get('/', (req, res) => {
  res.send('Roadmap API endpoint');
});

// Handle POST requests
router.post('/', getRoadmap);

export default router;
