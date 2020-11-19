const Event = require('../models/event.model');

const getAll = (req, res) => {
  Event.find()
    // .select('-daysOfWeek')
    .then((events) => {
      // console.log(`Events found: \n ${JSON.stringify(events, null, 2)}`);
      console.log(events);
      res.send(events);
    })
    .catch((err) => res.status(400).json(`Error: ${err}`));
};

const create = (req, res) => {
  const event = req.body;
  Event.create(event)
    .then(() => {
      console.log(`Event saved: \n ${JSON.stringify(event, null, 2)}`);
      res.status(201).json(event);
    })
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
  allAccess,
  yourEvent,
  adminBoard,
};
