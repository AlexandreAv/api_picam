const express = require('express');
const ajwMiddleware = require('../middlewares/ajw.middleware');
const bcryptMiddleware = require('../middlewares/bcrypt.middleware');
const userMiddleware = require('../middlewares/user.middleware');
const loginController = require('../controllers/login.controller');

const router = express.Router();

/* POST users listing. */
router.post(
    '/',
    ajwMiddleware.validation,
    userMiddleware.getUserHash,
    bcryptMiddleware.decrypt,
    loginController.userLogin,
);

module.exports = router;
