const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  firstName: {
    type: String,
    trim: true,
    minlength: 2,
    required: true,
  },
  lastName: {
    type: String,
    trim: true,
    minlength: 2,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    index: {
      unique: true,
    },
    required: true,
  },
  password: {
    type: String,
    trim: true,
    required: true,
  },
  roles: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Role',
    },
  ],
  created: {
    type: Date,
    default: Date.now,
  },
  updated: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model('User', UserSchema, 'users');

module.exports = User;
