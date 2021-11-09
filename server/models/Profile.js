const mongoose = require('mongoose')

const ProfileSchema = new mongoose.Schema({
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
  availabiltity: {
    type: Boolean,
    default: false,
  }
}, { timestamps: true })

module.exports = Profile = mongoose.model("Profile", ProfileSchema);

