const express = require('express');
const { eventController } = require('../controllers');
const notFound = require('../controllers/notfound.controller');
// const { authJwt } = require('../middleware');

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

router.post('/', eventController.create);

router.get('/*', notFound); // This has to be last route

module.exports = router;
