const mongoose = require('mongoose');

const RoomSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      minlength: 2,
      required: true,
    },
    floor: {
      type: Number,
      trim: true,
      maxlength: 3,
    },
    street: {
      type: String,
      trim: true,
      minlength: 2,
      required: true,
    },
    postalNumber: {
      type: Number,
      trim: true,
      minlength: 5,
      maxlength: 5,
    },
    town: {
      type: String,
      trim: true,
      minlength: 2,
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
  },
  // Options
  { timestamps: { createdAt: 'createdAt' } },
);

const Room = mongoose.model('Room', RoomSchema, 'rooms');

module.exports = Room;
