require('dotenv').config();
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const bearerHeader = req.headers.authorization;
  const token = bearerHeader && bearerHeader.split(' ')[1];

  if (!token) return res.status(403).send({ message: 'No token provided' });

  return jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: 'Unauthorized!',
      });
    }
    req.userId = decoded;
    return next();
  });
};

module.exports = verifyToken;
