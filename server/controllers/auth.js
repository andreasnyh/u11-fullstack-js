const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const { JWT_SECRET } = process.env;

const signIn = (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Check e-mail or password!' }] });
      }
      return bcrypt
        .compare(password, user.password)
        .then((isMatch) => {
          console.log(isMatch);
          if (!isMatch) {
            return res.status(400).json({
              errors: [{ msg: 'Check e-mail or password!' }],
            });
          }
          const accessToken = jwt.sign(user.id, JWT_SECRET);
          console.log(accessToken);
          return res.status(200).send({
            msg: 'Welcome',
            user: {
              id: user.id,
              firstName: user.firstName,
              lastName: user.lastName,
              created: user.created,
            },
            accessToken,
          });
        })
        .catch((err) => console.log(err.message));
    })
    .catch((err) => console.log(err.message));
};

const signUp = (req, res) => {
  const {
    email, password, lastName, firstName,
  } = req.body;

  // Create a user object
  const newUser = new User({
    email,
    password,
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
        newUser
          .save()
          .then(() => {
            console.log('User created');
            res.status(201).json({ newUser /* , token */ });
          })
          .catch((err) => {
            console.log(err.message);
            res.status(400).json('Error saving user!');
          });
      });
  });
};

module.exports = { signIn, signUp };
