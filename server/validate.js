const { check, validationResult } = require('express-validator');

exports.validateRegister = [
  check('username', 'Please enter a username').not().isEmpty(),
  check('email', 'Please enter a valid email address').isEmail(),
  check(
    'password',
    'Please enter a password with 6 or more characters'
  ).isLength({
    min: 6,
  }),
  (req, res, next) => {
    const errors = validationResult(req);

    console.log(errors);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    next();
  },
];

exports.validateLogin = [
  check('email', 'Please enter a valid email address').isEmail(),
  check('password', 'Password is required').not().isEmpty(),
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    next();
  },
];

exports.validateCreateProfile = [
  check('firstName', 'Please enter first name with 3 or more characters')
    .not()
    .isEmpty({ min: 3 })
    .isAlphanumeric(),
  check('lastName', 'Please enter last name with 3 or more characters')
    .not()
    .isEmpty({ min: 3 })
    .isAlphanumeric(),
  check(
    'description',
    'Please enter description name with minimum of  3 characters or maximum of characters'
  )
    .not()
    .isEmpty({ min: 3, max: 255 }),
  check('availability', 'Enter a valid array of strings').isArray(),
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    next();
  },
];
