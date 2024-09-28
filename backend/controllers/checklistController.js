import Checklist from '../models/Checklist.js';

export const addToChecklist = async (req, res) => {
  const { content, type } = req.body;
  const userId = req.user.id;

  try {
    const newItem = await Checklist.create({ userId, content, type });
    res.status(201).json({ item: newItem });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add item to checklist' });
  }
};

export const getChecklist = async (req, res) => {
  const userId = req.user.id;

  try {
    const items = await Checklist.find({ userId });
    res.status(200).json({ items });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch checklist' });
  }
};