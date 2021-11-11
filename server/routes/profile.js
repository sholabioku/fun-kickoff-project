const express = require('express');
const router = express.Router();

const validateObjectId = require('../middleware/validateObjectId');

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
  .get(validateObjectId, getProfile)
  .put([protect, validateObjectId, validateCreateProfile], updateProfile);

module.exports = router;
