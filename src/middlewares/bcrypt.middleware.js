const bcrypt = require('bcrypt');

function encrypt(req, res, next) {
    const saltRounds = 10;
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
        if (result) next();
        else {
            res.status(401).send({ message: 'Incorrect password' });
        }
    });
}

module.exports = {
    encrypt,
    decrypt,
};
