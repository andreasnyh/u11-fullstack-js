const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Role } = require('../models');

const User = require('../models/user.model');

const { JWT_SECRET } = process.env;

const signIn = (req, res) => {
  const { email, password } = req.body;
  const jwtExpirationTime = 240;

  User.findOne({ email })
    .populate('roles', '-__v')
    .then((user) => {
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Check e-mail or password!' }] });
      }
      return bcrypt
        .compare(password, user.password)
        .then((isMatch) => {
          console.log('isMatch: ', isMatch);
          if (!isMatch) {
            return res.status(400).json({
              errors: [{ msg: 'Check e-mail or password!' }],
            });
          }
          const perms = [];
          const accessToken = jwt.sign({ id: user.id }, JWT_SECRET, {
            expiresIn: jwtExpirationTime,
          });
          for (let i = 0; i < user.roles.length; i++) {
            perms.push(`ROLE_${user.roles[i].name.toUpperCase()}`);
          }

          return res.status(200).send({
            msg: 'Welcome',
            user: {
              id: user.id,
              roles: perms,
              firstName: user.firstName,
              lastName: user.lastName,
              created: user.created,
              accessToken,
              jwtExpirationTime,
            },
          });
        })
        .catch((err) => console.log(err.message));
    })
    .catch((err) => console.log(err.message));
};

const signUp = (req, res) => {
  // eslint-disable-next-line object-curly-newline
  const { email, password, lastName, firstName, roles } = req.body;

  // Create a user object
  const newUser = new User({
    email,
    lastName,
    firstName,
  });

  // Password encryption & save user
  return bcrypt.genSalt(10).then((salt) => {
    bcrypt
      .hash(password, salt)
      .then((hashedPW) => {
        newUser.password = hashedPW;
      })
      .then(() => {
        if (roles) {
          Role.find({ name: { $in: roles } }, (err, userRoles) => {
            newUser.roles = userRoles.map((role) => role.id);
          }).then(() => {
            newUser
              .save()
              .then(() => {
                console.log(`User "${newUser.firstName} ${newUser.lastName}" created.`);
                res.status(201).json({ newUser });
              })
              .catch((err) => res.status(400).json('Error saving user!', err));
          });
        } else {
          Role.findOne({ name: 'user' }, (err, role) => {
            newUser.roles = [role.id];
            newUser.save().then(() => {
              console.log(`User "${newUser.firstName} ${newUser.lastName}" created.`);
              res.status(201).json({ newUser });
            });
          }).catch((err) => res.status(400).json('Error saving user!', err));
        }
      })
      .catch((err) => {
        res.status(400).json({ message: 'Error saving user!', err });
      });
  });
};

module.exports = { signIn, signUp };
