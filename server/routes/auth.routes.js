const express = require('express');

const authController = require('../controllers/auth.controller');
const { validate } = require('../middleware/validate');
const { verify } = require('../middleware');
const {
  validateUserCreate,
  validateUserLogin,
} = require('../middleware/auth.validate');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.header(
    'Access-Control-Allow-Headers',
    'x-access-token, Origin, Content-Type, Accept',
  );
  next();
});

// check('what in req', 'message if error').typeOfCheck()
app.post('/signin', validate(validateUserLogin), authController.signIn);

app.post(
  '/signup',
  [validate(validateUserCreate), verify.checkEmailExists],
  authController.signUp,
);

module.exports = app;
