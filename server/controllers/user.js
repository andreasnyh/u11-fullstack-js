const User = require('../models/user');

const notFound = (req, res) => res.status(404).json('Not found');

const index = (req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json(`Error: ${err}`));
};

const detail = (req, res) => {
  if (req.params.email) {
    User.findOne({ email: req.params.email }, { password: 0 })
      .then((user) => {
        if (!user) {
          return res.status(404).json('User not found');
        }
        console.log('från params', user);
        return res.json(user);
      })
      .catch((err) => res.status(404).json(`Error: ${err}`));
  } else if (req.body.email) {
    User.findOne({ email: req.body.email }, { password: 0 }) // hide password in response
      .then((user) => {
        if (!user) {
          return res.status(404).json('User not found');
        }
        console.log('från body:', user);
        return res.json(user);
      })
      .catch((err) => res.status(404).json(`Error: ${err}`));
  }
};

const create = (req, res) => {
  const user = req.body;
  User.create(user)
    .then(() => {
      console.log(`User saved: \n ${JSON.stringify(user, null, 2)}`);
      res.status(201).json(user);
    })
    .catch((err) => res.status(400).json(`Error: ${err}`));
};

module.exports = {
  index,
  detail,
  notFound,
  create,
};
