const express = require('express');

const authController = require('../controllers/auth.controller');
const { validate } = require('../middleware/validate');
const { verify } = require('../middleware');
const {
  validateUserCreate,
  validateUserLogin,
} = require('../middleware/auth.validate');

const router = express();
router.use(express.json());
router.use(express.urlencoded({ extended: false }));

router.use((req, res, next) => {
  res.header(
    'Access-Control-Allow-Headers',
    'x-access-token, Origin, Content-Type, Accept',
  );
  next();
});

// check('what in req', 'message if error').typeOfCheck()
router.post('/signin', validate(validateUserLogin), authController.signIn);

router.post(
  '/signup',
  [validate(validateUserCreate), verify.checkEmailExists],
  authController.signUp,
);

module.exports = router;
