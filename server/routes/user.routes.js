const express = require('express');
const userController = require('../controllers/user.controller');
const notFound = require('../controllers/notfound.controller');
const { authJwt } = require('../middleware');

const router = express();

router.use((req, res, next) => {
  res.header(
    'Access-Control-Allow-Headers',
    'x-access-token, Origin, Content-Type, Accept',
  );
  next();
});

router.use(express.json());
router.use(express.urlencoded({ extended: false }));

router.post('/', authJwt.verifyToken, userController.findById);
router.get('/user', authJwt.verifyToken, userController.currentUser);
router.get(
  '/allusers',
  [authJwt.verifyToken, authJwt.isAdmin],
  userController.allUsers,
);
router.get('/find/:email', authJwt.verifyToken, userController.detail);

router.post('/find', authJwt.verifyToken, userController.detail);

router.get('/test/all', userController.allAccess);

router.get('/test/user', authJwt.verifyToken, userController.userBoard);

router.get(
  '/test/admin',
  [authJwt.verifyToken, authJwt.isAdmin],
  userController.adminBoard,
);

router.get('/*', notFound); // This has to be last route

module.exports = router;
