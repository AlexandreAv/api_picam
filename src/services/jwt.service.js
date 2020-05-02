const jwt = require('jsonwebtoken');
const { promisify } = require('util');

const signPromise = promisify(jwt.sign);

const verifPromise = promisify(jwt.verify);

module.exports = {
    signPromise,
    verifPromise,
};
