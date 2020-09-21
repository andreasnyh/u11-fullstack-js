const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const { JWT_SECRET } = process.env;

// returns signed and encrypted token
// const expiration = Math.floor(Date.now() / 1000) + 60 * process.env.JWT_EXPIRATION_IN_MINUTES;
const generateToken = (user) => jwt.sign({ data: user }, process.env.JWT_SECRET, { expiresIn: '30s' });

// Gets expiration time
// const expiration = 30;

const login = (req, res) => {
  const { email, password } = req.body;
  const accessToken = jwt.sign(req.body, JWT_SECRET);
  console.log(accessToken);
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
          return res.status(200).json({ msg: 'Welcome' });
        })
        .catch((err) => console.log(err.message));
    })
    .catch((err) => console.log(err.message));
};

const signup = (req, res) => {
  const {
    email, password, lastName, firstName,
  } = req.body;

  // Check if user already exists
  User.findOne({ email }).then((user) => {
    if (user) {
      return res
        .status(422)
        .json({ errors: [{ msg: 'This e-mail is already registered!' }] });
    }

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
          const token = generateToken(newUser.id);
          console.log('Token created :', token);
          newUser
            .save()
            .then(() => {
              console.log('User created');
              res.status(201).json({ newUser, token });
            })
            .catch((err) => {
              console.log(err.message);
              res.status(400).json('Error saving user!');
            });
        });
    });
  });
};

module.exports = { login, signup, generateToken };
