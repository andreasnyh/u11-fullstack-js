const User = require('../models/user.model');

const allUsers = (req, res) => {
  User.find()
    .select('-password')
    .then((users) => res.json(users))
    .catch((err) => res.status(403).json(`Error: ${err}`));
};

const currentUser = (req, res) => {
  User.findById(req.userId)
    .select('-password')
    .then((user) => res.json(user))
    .catch((err) => res.status(404).json(`Error: ${err}`));
};

const findById = (req, res) => {
  const { userId } = req.body;
  User.findById(userId)
    .select('-password')
    .then((user) => res.json(user))
    .catch((err) => res.status(404).json(`Error: ${err}`));
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

const update = (req, res) => {
  const { user, id } = req.body;
  User.findByIdAndUpdate(id, user)
    .select('-password')
    .then((updated) => {
      console.log(updated);
      // console.log(`User updated: \n ${JSON.stringify(user, null, 2)}`);
      res.status(201).json(user);
    })
    .catch((err) => res.status(400).json(`Error: ${err}`));
};

/* ***************** TESTS ***************** */

const allAccess = (req, res) => {
  res.status(200).send('Public Content.');
};

const userBoard = (req, res) => {
  res.status(200).send('User Content.');
};

const adminBoard = (req, res) => {
  res.status(200).send('Admin Content.');
};

/* *************** END TESTS *************** */

module.exports = {
  detail,
  create,
  update,
  allUsers,
  findById,
  allAccess,
  userBoard,
  adminBoard,
  currentUser,
};
