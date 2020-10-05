const Room = require('../models/room.model');

const roomDetail = (req, res) => {
  const { id } = req.params;
  Room.findById(id)
    .select('-password')
    .then((room) => res.json(room))
    .catch((err) => res.status(404).json(`Error: ${err}`));
};

const roomDetailBooked = (req, res) => {
  const { id } = req.params;
  Room.findById(id)
    .then((room) => res.json(room))
    .catch((err) => res.status(404).json(`Error: ${err}`));
};
/*
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
 */

const allRooms = (req, res) => {
  Room.find()
    .select('-password')
    .then((rooms) => res.json(rooms))
    .catch((err) => res.status(403).json(`Error: ${err}`));
};

const create = (req, res) => {
  const room = req.body;
  Room.create(room)
    .then(() => {
      console.log(`Room saved: \n ${JSON.stringify(room, null, 2)}`);
      res.status(201).json(room);
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
  create,
  allRooms,
  roomDetail,
  roomDetailBooked,
  // TESTS
  allAccess,
  userBoard,
  adminBoard,
};