const express = require('express');
const router = express.Router();

const {getProfiles} = require('../controllers/profile')

router.route('/').get(getProfiles)


module.exports = router