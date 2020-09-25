const mongoose = require('mongoose');

const RoleSchema = mongoose.Schema({
  name: {
    type: String,
    trim: true,
    index: {
      unique: true,
    },
    default: 'user',
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

const User = mongoose.model('Role', RoleSchema, 'roles');

module.exports = User;
