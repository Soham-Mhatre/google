import express from 'express';
import { getRoadmap } from '../controllers/roadmapController.js';

const router = express.Router();

router.post('/', getRoadmap);

export default router;