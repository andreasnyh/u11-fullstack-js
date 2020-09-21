const express = require('express');
const userController = require('../controllers/user');

const router = express();

router.use(express.json());
router.use(express.urlencoded({ extended: false }));

router.get('/', userController.index);

router.post('/find/:email', userController.detail);
router.post('/find', userController.detail);
router.post('/create', userController.create);

router.get('/*', userController.notFound);

module.exports = router;
