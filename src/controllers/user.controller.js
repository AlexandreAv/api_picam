const debug = require('debug')('api-picam:user-controller');
const userService = require('../services/user.services');
const httpStatus = require('http-status');

/* User post request ( inscription) */
function userRegister(req, res) {
    const { firstname, lastname, nickname, pass, email } = req.body;
    const data = [firstname, lastname, nickname, pass, email];

    userService
        .postUserQuery(data)
        .then((result, field) => {
            res.status(200).send("l'utilisateur a bien été crée");
        })
        .catch((err) => {
            debug(err);

            if (err.code === 'ER_DUP_ENTRY')
                res.status(401).send('Cette email est déjà utilité');
            else res.status(500).send(httpStatus['500_MESSAGE']);
        });
}

module.exports = {
    userRegister,
};
