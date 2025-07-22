const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: 'No token provided' });

  const token = authHeader.split(' ')[1];

  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(401).json({ message: 'Session expired. Please log in again.', success: false });
      }
      return res.status(403).json({ message: 'Invalid token', success: false });
    }

    req.user = decoded;
    next();
  });
};

module.exports = authenticate;
