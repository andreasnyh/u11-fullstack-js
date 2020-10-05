require('dotenv').config();
const jwt = require('jsonwebtoken');
const { User, Role } = require('../models');

const verifyToken = (req, res, next) => {
  const token = req.headers['x-access-token'];

  if (!token) {
    return res.status(403).send({ errors: [{ msg: 'No token provided' }] });
  }

  return jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        errors: [
          {
            msg: 'Unauthorized!',
            reason: err.message,
          },
        ],
      });
    }
    req.userId = decoded.id;
    return next();
  });
};

const isAdmin = (req, res, next) => {
  // Find the user in db
  User.findById(req.userId).then((user) => {
    // Does the user have admin role assigned?
    Role.find({ _id: { $in: user.roles } }, (err, roles) => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === 'admin') {
          return next();
        }
      }

      res.status(403).send({
        errors: [
          {
            msg: 'Requires Admin Role!',
          },
        ],
      });
    });
  });
};

module.exports = { verifyToken, isAdmin };
