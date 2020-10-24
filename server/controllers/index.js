const authController = require('./auth.controller');
const eventController = require('./event.controller');
const notFound = require('./notfound.controller');
const roomController = require('./room.controller');
const userController = require('./user.controller');

module.exports = {
  authController,
  eventController,
  notFound,
  roomController,
  userController,
};
