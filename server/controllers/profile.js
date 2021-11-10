const asyncHandler = require('express-async-handler');
const Profile = require('../models/Profile');

// @desc Get all profiles
// @route GET /profiles
// @access Public
exports.getProfiles = asyncHandler(async (req, res, next) => {
  const profiles = await Profile.find();

  res.status(200).json({success: true, data: profiles})
})