const User = require('../models/user');

// Check if user already exists
const checkEmailExists = (req, res, next) => {
  const { email } = req.body;
  User.findOne({ email }).then((user) => {
    if (user) {
      return res
        .status(422)
        .json({ errors: [{ msg: 'This e-mail is already registered!' }] });
    }
    return next();
  });
};

module.exports = { checkEmailExists };
