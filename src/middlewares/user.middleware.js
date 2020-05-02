const debug = require('debug')('api_picam:user.middleware');
const httpStatus = require('http-status');
const { findHashByEmail } = require('../services/user.services');

function getUserHash(req, res, next) {
    const { email } = req.body;

    findHashByEmail(email)
        .then((result, field) => {
            if (result.length !== 0) {
                const { hash } = result[0];

                req.body.hash = hash;
                next();
            } else {
                res.status(401).send({ error: "L'email n'existe pas" });
            }
        })
        .catch((err) => {
            debug(err);
            res.status(500).send({ error: httpStatus['500_MESSAGE'] });
        });
}

module.exports = {
    getUserHash,
};
