const { askGemini } = require('../services/geminiService');

exports.askQuestion = async (req, res) => {
  const { question } = req.body;

  try {
    const response = await askGemini(question);
    res.status(200).json({ success: true, answer: response });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
