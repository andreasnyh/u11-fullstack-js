const express = require('express');

const { validate } = require('../middleware/validate');
const {
  validateUserCreate,
  validateUserLogin,
} = require('../controllers/auth.validate');
const authController = require('../controllers/auth');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// check('what in req', 'message if error').typeOfCheck()
app.post('/login', validate(validateUserLogin), authController.login);

app.post('/signup', validate(validateUserCreate), authController.signup);

module.exports = app;
