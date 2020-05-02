const debug = require('debug')('api-picam:user-controller');
const httpStatus = require('http-status');
const jwtService = require('../services/jwt.service');
const userService = require('../services/user.services');
const jwtKey = require('../../config/private-key.JWT.json');

/* Login post request ( connexion ) and JWT token */

async function userLogin(req, res) {
    const { email } = req.body;

    const idQueryResult = await userService
        .findIdByEmail(email)
        .catch((err) => {
            debug(err);
            res.status(500).send(httpStatus['500_MESSAGE']);
        });

    const { id } = idQueryResult[0];
    const tokenValue = await jwtService
        .signPromise(
            {
                idUser: id,
                userState: 'owner',
                iat: Math.floor(Date.now() / 1000) - 30,
            },
            jwtKey.key,
            { expiresIn: 30 * 60 },
        )
        .catch((err) => {
            debug(err);
            res.status(500).send(httpStatus['500_MESSAGE']);
        });

    res.cookie('token', tokenValue, { maxAge: 30000 });
    res.status(200).send('Connexion réussi, token envoyé');
}

module.exports = {
    userLogin,
};
