const asyncHandler = require('express-async-handler');
const Profile = require('../models/Profile');

// @desc Get all profiles
// @route GET /profiles
// @access Public
exports.getProfiles = asyncHandler(async (req, res, next) => {
  const profiles = await Profile.find();

  res
    .status(200)
    .json({ success: true, data: profiles, count: profiles.length });
});

// @desc Get single profile
// @route GET /profiles/:id
// @access Public
exports.getProfile = asyncHandler(async (req, res, next) => {
  const profile = await Profile.findById(req.params.id);
  if (!profile) {
    res.status(404);
    throw new Error(`No profile with id ${req.params.id}`);
  }

  res.status(200).json({ success: true, data: profile });
});

//@desc Create a profile
//@route POST /profile
//@ access Private
exports.createProfile = asyncHandler(async (req, res, next) => {
  const profile = await Profile.create(req.body);

  res.status(201).json({ success: true, data: profile });
});

// @desc Update profile
// @route PUT /profiles/:id
// @access Private
exports.updateProfile = asyncHandler(async (req, res, next) => {
  const profile = await Profile.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!profile) {
    res.status(404);
    throw new Error(`No profile with id ${req.params.id}`);
  }

  res.status(200).json({ success: true, data: profile });
});
