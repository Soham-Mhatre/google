import express from 'express';
import { generateRoadmap, getRoadmapHistory } from '../controllers/roadmapController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/generate', auth, generateRoadmap);
router.get('/history', auth, getRoadmapHistory);

export default router;