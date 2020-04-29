const bcrypt = require('bcrypt');

const saltRounds = 10;

function encrypt(req, res, next) {
    const { pass } = req.body;

    bcrypt.hash(pass, saltRounds).then((hash) => {
        req.body.pass = hash;
        next();
    });
}

function decrypt(req, res, next) {
    const { pass } = req.body;
    const { hash } = req.body;

    bcrypt.compare(pass, hash).then((result) => {
        if (result) req.body.isSame = true;
        else req.body.isSame = false;
        next();
    });
}

module.exports = {
    encrypt,
};
