require('dotenv').config();
const jwt = require('jsonwebtoken');
// const User = require('../models/user');

const verifyToken = (req, res, next) => {
  // const bearerHeader = req.headers.authorization;
  // const token = bearerHeader && bearerHeader.split(' ')[1];
  const token = req.headers['x-access-token'];

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

/* const isAdmin = (req, res, next) => {
  User.findById(req.userId).then((user) => {
    user. ().then((roles) => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === 'admin') {
          next();
          return;
        }
      }

      res.status(403).send({
        message: 'Require Admin Role!',
      });
    });
  });
}; */

module.exports = verifyToken;
