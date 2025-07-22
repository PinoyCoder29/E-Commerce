const roles = require('../config/controls')

const authorize = (requiredPermissions) => {
  return (req, res, next) => {
    const userRole = req.user.role;
    if (!roles[userRole] || !requiredPermissions.every(perm => roles[userRole].includes(perm))) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    next();
  };
};

module.exports = authorize;