const validateToken = (req, res, next) => {
  const bearerHeader = req.headers.authorization;
  // console.log(bearerHeader);
  if (typeof bearerHeader !== 'undefined') {
    const token = bearerHeader.replace('Bearer ', '').trim();
    console.log(token);
    req.token = token;
    next();
  }
  res.sendStatus(403);
};

module.exports = validateToken;
