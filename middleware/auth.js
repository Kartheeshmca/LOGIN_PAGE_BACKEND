// backend/middleware/auth.js
const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  const authHeader = req.header('Authorization');
  if (!authHeader) return res.status(401).json({ message: 'No token, authorization denied' });

  const token = authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Token format invalid' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // decoded contains what we signed (we will sign { id, email, firstName })
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token is not valid' });
  }
};
