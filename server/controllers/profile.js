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
  const { firstName, lastName, description, gender, address, availability } =
    req.body;

  const profile = await new Profile({
    firstName,
    lastName,
    description,
    gender,
    address,
    availability,
    user: req.user.id,
  }).save();

  res.status(201).json({ success: true, data: profile });
});

// @desc Update profile
// @route PUT /profiles/:id
// @access Private
exports.updateProfile = asyncHandler(async (req, res, next) => {
  let profile = await Profile.findById(req.params.id);

  if (!profile) {
    res.status(404);
    throw new Error(`No profile with id ${req.params.id}`);
  }

  if (profile.user !== req.user.id) {
    res.status(401);
    throw new Error(
      `User ${req.user.id} is not authorized to update this profile`
    );
  }

  profile = await Profile.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({ success: true, data: profile });
});
