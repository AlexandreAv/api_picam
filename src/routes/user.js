const express = require('express');
const ajwMiddleware = require('../middlewares/ajw.middleware');
const bcryptMiddleware = require('../middlewares/bcrypt.middleware');
const userController = require('../controllers/user.controller');

const router = express.Router();

/* GET users listing. */
router.get('/', (req, res) => {});

/* POST users listing. */
router.post(
    '/user',
    ajwMiddleware.validation,
    bcryptMiddleware.encrypt,
    userController.userRegister,
);

/* DELETE users listing/ */
router.delete('/user', (req, res) => {});

module.exports = router;
