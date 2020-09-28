const mongoose = require('mongoose');

const RoleSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      index: {
        unique: true,
      },
    },
  },
  // Options
  { timestamps: { createdAt: 'createdAt' } },
);

const User = mongoose.model('Role', RoleSchema, 'roles');

module.exports = User;
