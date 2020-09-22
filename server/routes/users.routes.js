const express = require('express');
const userController = require('../controllers/user.controller');
const notFound = require('../controllers/notfound.controller');
const verifyToken = require('../middleware/auth.jwt');

const router = express();

router.use(express.json());
router.use(express.urlencoded({ extended: false }));

router.get('/', verifyToken, userController.index);
router.get('/find/:email', verifyToken, userController.detail);

router.post('/find', verifyToken, userController.detail);

router.get('/test/all', userController.allAccess);

router.get('/test/user', verifyToken, userController.userBoard);

router.get(
  '/test/admin',
  [
    verifyToken,
    //  authJwt.isAdmin
  ],
  userController.adminBoard,
);

router.get('/*', notFound); // This has to be last route

module.exports = router;
