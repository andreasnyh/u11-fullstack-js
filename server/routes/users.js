const express = require('express');
const userController = require('../controllers/user');
const notFound = require('../controllers/notFoundController');
const verifyToken = require('../middleware/authJwt');

const router = express();

router.use(express.json());
router.use(express.urlencoded({ extended: false }));

router.get('/', verifyToken, userController.index);
router.get('/find/:email', verifyToken, userController.detail);
router.get('/*', notFound);

router.post('/find', verifyToken, userController.detail);

module.exports = router;
