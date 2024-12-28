const jwt = require('jsonwebtoken');
const secretKey = "yourSecretKey";


module.exports = function(req, res, next) {
  try {
    const authHeader = req.header('Authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Invalid authorization header format' });
    }

    const token = authHeader.split(' ')[1];
    
    const decoded = jwt.verify(token, secretKey);
    
    req.user = { _id: decoded.userId };
    next();
    
  } catch (err) {
    console.error('Auth Error:', {
      name: err.name,
      message: err.message,
      token: 'present'
    });
    res.status(401).json({ message: 'Session expired. Please login again.' });
  }
};