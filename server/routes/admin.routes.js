const express = require('express');
const { userController, roomController } = require('../controllers');
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

router.get(
  '/allusers',
  [authJwt.verifyToken, authJwt.isAdmin],
  userController.allUsers,
);
router.get(
  '/find/:email',
  [authJwt.verifyToken, authJwt.isAdmin],
  userController.detail,
);

router.post(
  '/addroom',
  [authJwt.verifyToken, authJwt.isAdmin],
  roomController.create,
);

router.get('/*', notFound); // This has to be last route

module.exports = router;
