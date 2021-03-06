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
    .withMessage('You need to input an e-mail address.')
    .isEmail()
    .withMessage('Check that the e-mail you provided is valid'),

  check('firstName')
    .trim()
    .escape()
    .isLength({ min: 2 })
    .withMessage('First name needs to be at least 2 characters long'),

  check('lastName')
    .trim()
    .escape()
    .isLength({ min: 2 })
    .withMessage('Last needs to be at least 2 characters long'),

  check('password')
    .exists()
    .withMessage('Remember to add a password!')
    .isLength({
      min: 5,
    })
    .withMessage('Password needs to be at least 5 characters long'),

  check('passwordAgain').custom(async (passwordAgain, { req }) => {
    const { password } = req.body;
    // If password and confirm password not same
    // don't allow to sign up and throw error
    if (password !== passwordAgain) {
      throw new Error("Passwords doesn't match!");
    }
  }),
];

module.exports = { validateUserCreate, validateUserLogin };
