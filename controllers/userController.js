const User = require('../model/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { fetchUserNotes } = require('./notesController');

module.exports.register = async function (req, res) {
  try {
    const { fullName, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'Email already registered' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      fullName: fullName,
      email: email,
      password: hashedPassword,
    };
    user = await User.create(newUser);
    return res.status(200).json({
      message: 'User Successfully Registered',
    });
  } catch (error) {
    res.status(500).json({
      message: 'Internal Server Error',
    });
  }
};

module.exports.createSession = async function (req, res) {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    const passwordMatch = await bcrypt.compare(password, existingUser.password);
    if (passwordMatch) {
      const token = jwt.sign({ userId: existingUser.id }, 'notesApp', { expiresIn: '1h' });
      const { _id, fullName, email } = existingUser;
      const userNotes = await fetchUserNotes(_id);
      res.status(200).json({
        message: 'Sign-in successful',
        token,
        user: { userid: _id, fullName, email },
        notes: userNotes,
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error('Error during sign-in:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
