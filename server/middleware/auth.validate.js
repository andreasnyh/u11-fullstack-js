const { check } = require('express-validator');

const validateUserLogin = [
  check('email')
    .exists()
    .withMessage('Make sure to input an e-mail adress!')
    .not()
    .isEmpty()
    .withMessage('E-mail is empty')
    .isEmail()
    .withMessage('Make sure to input an valid e-mail adress!'),
  check('password')
    .exists()
    .withMessage('Remember to add a password!')
    .isLength({
      min: 5,
    })
    .withMessage('Password needs to be at least 5 characters long'),
];

const validateUserCreate = [
  check('email')
    .exists()
    .withMessage('Make sure to input a valid e-mail adress!')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY')
    .isEmail()
    .withMessage('EMAIL_IS_NOT_VALID'),

  check('firstName').trim().escape().isLength({ min: 2 }),
  check('lastName').trim().escape().isLength({ min: 2 }),
  check('password')
    .exists()
    .withMessage('Remember to add a password!')
    .isLength({
      min: 5,
    })
    .withMessage('Password needs to be at least 5 characters long'),
];

module.exports = { validateUserCreate, validateUserLogin };
