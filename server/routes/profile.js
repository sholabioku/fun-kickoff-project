const express = require('express');
const router = express.Router();

const {getProfiles, createProfile} = require('../controllers/profile')
const protect = require('../middleware/auth')

router.route('/').get(getProfiles).post(protect, createProfile)


module.exports = router