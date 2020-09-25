const mongoose = require('mongoose');

const db = {};

db.mongoose = mongoose;

db.User = require('./user.model');
db.Room = require('./room.model');
db.Role = require('./role.model');

db.roleList = ['user', 'admin', 'super'];

module.exports = db;
