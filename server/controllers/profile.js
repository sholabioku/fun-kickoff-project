const asyncHandler = require('express-async-handler');
const Profile = require('../models/Profile');

// @desc Get all profiles
// @route GET /profiles
// @access Public
exports.getProfiles = asyncHandler(async (req, res, next) => {
  const profiles = await Profile.find();

  res.status(200).json({success: true, data: profiles, count: profiles.length});
})

//@desc Create a profile
//@route POST /profile
//@ access Private
exports.createProfile = asyncHandler(async (req, res, next) => {
  const profile = await Profile.create(req.body);

  res.status(201).json({success: true, data: profile})
})
