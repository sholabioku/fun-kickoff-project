const express = require('express');
const router = express.Router();

const {
  getProfiles,
  getProfile,
  createProfile,
  updateProfile,
} = require('../controllers/profile');
const { validateCreateProfile } = require('../validate');
const protect = require('../middleware/auth');

router
  .route('/')
  .get(getProfiles)
  .post([protect, validateCreateProfile], createProfile);

router
  .route('/:id')
  .get(getProfile)
  .put([protect, validateCreateProfile], updateProfile);

module.exports = router;
