const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = async function(req, res, next) {
  // Get token from header
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret');
    
    // Add user info to request
    req.user = {
      _id: decoded.userId,
      id: decoded.userId // Adding both for compatibility
    };
    
    next();
  } catch (err) {
    console.error('Auth Error:', err.message);
    res.status(401).json({ message: 'Token is not valid' });
  }
};