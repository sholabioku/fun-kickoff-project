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
      required: true,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
    },
    availabiltity: [
      {
        from: {
          type: Date,
        },
        to: {
          type: Date,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = Profile = mongoose.model('Profile', ProfileSchema);
