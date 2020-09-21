const jwt = require('jsonwebtoken');

const validateToken = (req, res, next) => {
  const bearerHeader = req.headers.authorization;
  const token = bearerHeader && bearerHeader.split(' ')[1];

  if (token === undefined) return res.sendStatus(401);

  return jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    console.log(err);
    if (err) return res.sendStatus(403);
    req.user = user;
    return next();
  });
};

module.exports = validateToken;
