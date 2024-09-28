import Checklist from '../models/Checklist.js';

export const addToChecklist = async (req, res) => {
  const { content, type } = req.body;
  const userId = req.user.id;

  try {
    const checklistItem = new Checklist({
      userId,
      content,
      type,
    });
    await checklistItem.save();

    res.status(201).json({ message: 'Added to checklist', item: checklistItem });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add to checklist' });
  }
};

export const getChecklist = async (req, res) => {
  const userId = req.user.id;

  try {
    const checklist = await Checklist.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json({ checklist });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch checklist' });
  }
};

export const updateChecklistItem = async (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;
  const userId = req.user.id;

  try {
    const updatedItem = await Checklist.findOneAndUpdate(
      { _id: id, userId },
      { completed },
      { new: true }
    );

    if (!updatedItem) {
      return res.status(404).json({ error: 'Checklist item not found' });
    }

    res.status(200).json({ message: 'Checklist item updated', item: updatedItem });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update checklist item' });
  }
};