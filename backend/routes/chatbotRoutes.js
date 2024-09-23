const express = require('express');
const { askQuestion } = require('../controllers/chatbotController');
const router = express.Router();

router.post('/', askQuestion);

module.exports = router;
