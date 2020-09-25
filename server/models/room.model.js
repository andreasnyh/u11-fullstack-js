const mongoose = require('mongoose');

const RoomSchema = mongoose.Schema({
  room: {
    type: String,
    trim: true,
    minlength: 2,
    required: true,
  },
  address: {
    type: String,
    trim: true,
    minlength: 2,
    required: true,
  },
  price: {
    type: Number,
    trim: true,
    default: 0,
  },
  password: {
    type: String,
    trim: true,
    required: true,
  },
  created: {
    type: Date,
    default: Date.now,
  },
  updated: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model('Room', RoomSchema, 'rooms');

module.exports = User;
