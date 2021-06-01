const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

const validateToken = async (req, res, next) => {
  const token = req.headers.authorization;

  try {
    if (!token) throw Error('Token not found');
    const decoded = jwt.verify(token, JWT_SECRET);
    if (!decoded) throw Error('Expired or invalid token');

    req.user = decoded;

    next();
  } catch (error) {
    if (error.message === 'jwt malformed') {
      return res.status(401).json({ message: 'Expired or invalid token' });
    }
    return res.status(401).json({ message: error.message });
  }
};

module.exports = validateToken;