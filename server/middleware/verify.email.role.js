const { User, roleList } = require('../models');

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

// Check if user already exists
const checkRoleExists = (req, res, next) => {
  const { roles } = req.body;
  if (roles) {
    for (let i = 0; i < roles.length; i++) {
      if (!roleList.includes(roles[i])) {
        return res
          .status(400)
          .json({ errors: [{ msg: `Role ${roles[i]} does not exist.` }] });
      }
    }
  }
  return next();
};

module.exports = { checkEmailExists, checkRoleExists };
