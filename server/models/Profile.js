const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    gender: {
      type: String,
      enum: ['male', 'female'],
    },
    address: {
      type: String,
    },
    availabiltity: [String],
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = Profile = mongoose.model('Profile', ProfileSchema);
