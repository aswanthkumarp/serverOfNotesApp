// authMiddleware.js
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.header('x-auth-token');

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, 'notesApp');
    console.log('Decoded Token:', decoded);

    // Check if userId is present in the decoded token
    if (!decoded.userId) {
      return res.status(401).json({ message: 'Token is missing userId' });
    }

    req.user = { userId: decoded.userId };
    next();
  } catch (error) {
    console.error('Token Verification Error:', error);
    res.status(401).json({ message: 'Token is not valid' });
  }
};
