const jwt = require('jsonwebtoken')
require('dotenv').config()
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(400).json({
    message: 'no to provided'
  });

  jwt.verify(token,process.env.SECRET_KEY, (err, user) => {
    if (err) return res.status(400).json({
        message: 'invalid token'
    })
    req.user = user;
    next();
  });
}

module.exports = authenticateToken