const mongoose = require('mongoose');

const RoomSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      minlength: 2,
      required: true,
    },
    description: {
      type: String,
      trim: true,
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
      required: true,
    },
    price: {
      type: Number,
      trim: true,
      default: 0,
    },
    size: {
      from: {
        type: Number,
        required: true,
      },
      to: {
        type: Number,
        required: true,
      },
    },
    image: {
      url: {
        type: String,
        trim: true,
        default: 'https://via.placeholder.com/300x200?text=No+image+of+room',
      },
      height: {
        type: Number,
        trim: true,
      },
      width: {
        type: Number,
        trim: true,
      },
    },
    password: {
      type: String,
      trim: true,
    },
  },
  // Options
  { timestamps: { createdAt: 'createdAt' } },
);

const Room = mongoose.model('Room', RoomSchema, 'rooms');

module.exports = Room;
