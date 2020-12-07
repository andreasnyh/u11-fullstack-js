const express = require('express');
const { eventController } = require('../controllers');
const notFound = require('../controllers/notfound.controller');
const { authJwt } = require('../middleware');

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

/* *** Routes *** */

/* Restricted */
router.get('/room/:id', eventController.getRoomEvents);
router.delete('/:id', authJwt.verifyToken, eventController.deleteEvent);
router.get('/', eventController.getAll);
router.post('/', eventController.create);

/* Admin */

/* Public */
router.get('/*', notFound); // This has to be last route

module.exports = router;
