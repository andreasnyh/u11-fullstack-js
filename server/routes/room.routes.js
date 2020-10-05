const express = require('express');
const roomController = require('../controllers/room.controller');
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

router.get('/room/:id', authJwt.verifyToken, roomController.roomDetail);

router.get('/allrooms', authJwt.verifyToken, roomController.allRooms);

router.post(
  '/',
  [authJwt.verifyToken, authJwt.isAdmin],
  roomController.create,
);

/* router.get('/find/:email', authJwt.verifyToken, roomController.detail);

router.post('/find', authJwt.verifyToken, roomController.detail);

*/
router.get('/test/all', roomController.allAccess);

router.get('/test/user', authJwt.verifyToken, roomController.userBoard);

router.get(
  '/test/admin',
  [authJwt.verifyToken, authJwt.isAdmin],
  roomController.adminBoard,
);

router.get('/*', notFound); // This has to be last route

module.exports = router;
