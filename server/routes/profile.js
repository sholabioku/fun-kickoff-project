const express = require('express');
const router = express.Router();

const { getProfiles, createProfile } = require('../controllers/profile')
const { validateCreateProfile } = require('../validate')
const protect = require('../middleware/auth')

router.route('/').get(getProfiles).post([protect, validateCreateProfile], createProfile)


module.exports = router