const userService = require('../services/user.services');
const httpStatus = require('http-status');

/* User post request ( inscription) */
function userRegister(req, res) {
    const { firstname, lastname, nickname, email } = req.body;
    let data = [firstname, lastname, nickname, email];

    userService
        .postUserQuery(data)
        .then((result, field) => {
            res.status(200).send({ message: httpStatus['200_MESSAGE'] });
        })
        .catch((err) => {
            res.status(500).send({ message: httpStatus['500_MESSAGE'] });
        });
}

module.exports = {
    userRegister,
};
