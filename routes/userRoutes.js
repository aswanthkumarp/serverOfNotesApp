const express = require('express');
const { register, createSession } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware')
const router = express.Router();

router.post('/register',register)
router.post('/login',createSession)



// Protected route example
router.get('/protected', authMiddleware, (req, res) => {
    res.json({ message: 'This is a protected route', userId: req.userId });
  });

module.exports = router