const express = require('express');
const {
  CreateNotes,
  listNotes,
  getNoteById,
  editNoteById,
  deleteNotes,
} = require('../controllers/notesController');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
router.post('/savenotes', authMiddleware, CreateNotes);
router.get('/listnotes', authMiddleware, listNotes, (req, res) => {
  res.json({ message: 'This is a protected route', userId: req.userId });
});
router.get('/getnote/:id', authMiddleware, getNoteById);

router.put('/updatenote/:id', authMiddleware, editNoteById);
router.delete('/deletenote/:id', authMiddleware, deleteNotes);
module.exports = router;
