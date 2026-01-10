const { body, validationResult } = require('express-validator');

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array()
    });
  }
  next();
};

// Project validation rules
exports.validateProject = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Project title is required')
    .isLength({ max: 100 })
    .withMessage('Title cannot exceed 100 characters'),

  body('description')
    .trim()
    .notEmpty()
    .withMessage('Project description is required')
    .isLength({ max: 200 })
    .withMessage('Description cannot exceed 200 characters'),

  body('fullDescription')
    .trim()
    .notEmpty()
    .withMessage('Full description is required')
    .isLength({ max: 1000 })
    .withMessage('Full description cannot exceed 1000 characters'),

  body('liveUrl')
    .isURL()
    .withMessage('Please provide a valid live URL'),

  body('githubUrl')
    .isURL()
    .withMessage('Please provide a valid GitHub URL'),

  body('tags')
    .isArray({ min: 1 })
    .withMessage('At least one tag is required'),

  body('features')
    .isArray({ min: 1 })
    .withMessage('At least one feature is required'),

  body('challenges')
    .isArray({ min: 1 })
    .withMessage('At least one challenge is required'),

  handleValidationErrors
];

// User validation rules
exports.validateUser = [
  body('username')
    .trim()
    .notEmpty()
    .withMessage('Username is required')
    .isLength({ min: 3, max: 30 })
    .withMessage('Username must be between 3 and 30 characters'),

  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),

  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),

  handleValidationErrors
];

// Login validation rules
exports.validateLogin = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),

  body('password')
    .notEmpty()
    .withMessage('Password is required'),

  handleValidationErrors
];

// Contact form validation rules
exports.validateContact = [
  body('fullName')
    .trim()
    .notEmpty()
    .withMessage('Full name is required')
    .isLength({ max: 100 })
    .withMessage('Name cannot exceed 100 characters'),

  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please provide a valid email')
    .normalizeEmail(),

  body('phone')
    .optional({ checkFalsy: true })
    .trim()
    .matches(/^[\d\s\-\+\(\)]{10,15}$/)
    .withMessage('Please enter a valid phone number (10-15 digits)'),

  body('address')
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 200 })
    .withMessage('Address cannot exceed 200 characters'),

  body('message')
    .trim()
    .notEmpty()
    .withMessage('Message is required')
    .isLength({ min: 10 })
    .withMessage('Message must be at least 10 characters')
    .isLength({ max: 1000 })
    .withMessage('Message cannot exceed 1000 characters'),

  handleValidationErrors
];