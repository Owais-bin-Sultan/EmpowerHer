const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, 'your_jwt_secret');
    req.user = { _id: decoded.userId }; // Changed to match token payload
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};