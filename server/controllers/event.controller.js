const Event = require('../models/event.model');
const Room = require('../models/room.model');
const User = require('../models/user.model');

const getAll = (req, res) => {
  Event.find()
    // .select('-daysOfWeek')
    .then((events) => {
      // console.log(`Events found: \n ${JSON.stringify(events, null, 2)}`);
      // console.log(events);
      res.send(events);
    })
    .catch((err) => res.status(400).json(`Error: ${err}`));
};

const getRoomEvents = (req, res) => {
  const { id } = req.params;
  Event.find({ room: id })
    .then((events) => {
      res.send(events);
    })
    .catch((err) => res.status(400).json(`Error: ${err}`));
};

const create = (req, res) => {
  const event = req.body;
  console.log('req body', req.body);
  User.findById(event.user).then(
    Room.findById(event.room).then(
      Event.create(event)
        .then(() => {
          console.log(`Event saved: \n ${JSON.stringify(event, null, 2)}`);
          res.status(201).json(event);
        }).catch((err) => res.status(400).json(`Error: ${err}`)),
    ).catch((err) => res.status(400).json(`Error: ${err}`)),
  )
    .catch((err) => res.status(400).json(`Error: ${err}`));
};

/* ***************** TESTS ***************** */

const allAccess = (req, res) => {
  res.status(200).send('Public Content.');
};

const yourEvent = (req, res) => {
  res.status(200).send('Event Content.');
};

const adminBoard = (req, res) => {
  res.status(200).send('Admin Content.');
};

/* *************** END TESTS *************** */

module.exports = {
  create,
  getAll,
  getRoomEvents,
  allAccess,
  yourEvent,
  adminBoard,
};
