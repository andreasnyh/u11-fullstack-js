const adminRouter = require('./admin.routes.js');
const authRouter = require('./auth.routes.js');
const eventRouter = require('./event.routes.js');
const userRouter = require('./user.routes.js');
const roomRouter = require('./room.routes.js');

module.exports = {
  adminRouter,
  authRouter,
  eventRouter,
  userRouter,
  roomRouter,
};
