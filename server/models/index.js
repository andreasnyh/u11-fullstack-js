const mongoose = require('mongoose');

const db = {};

db.mongoose = mongoose;

db.Event = require('./event.model');
db.Role = require('./role.model');
db.Room = require('./room.model');
db.User = require('./user.model');

db.roleList = ['user', 'admin', 'super'];

module.exports = db;
