const express = require('express');
const userController = require('../controllers/user');

const router = express();

router.use(express.json());
router.use(express.urlencoded({ extended: false }));

router.get('/', userController.index);
router.get('/find/:email', userController.detail);
router.get('/*', userController.notFound);

router.post('/', userController.create);
router.post('/find', userController.detail);

module.exports = router;
