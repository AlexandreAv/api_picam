const axios = require('axios');
const { assert } = require('chai');
const { getUserHash } = require('../../src/middlewares/user.middleware');
const { startServer, stopServer, app } = require('../servers/app');

const emailUserValid = {
    email: 'bonjour.test@gmail.com',
};

const emailUserInvalid = {
    email: 'bonjour.lol@gmail.com',
};

describe('#user.middleware()', () => {
    before(() => {
        app.post('/login', getUserHash, (req, res) => {
            res.status(200).send({
                message: 'email trouvé',
                hash: req.body.hash,
            });
        });
        startServer();
    });

    after(() => {
        stopServer();
    });

    context('Test du middleware de vérification de champ ajwMiddleware', () => {
        it('test du middleware dans un cas de positif', () =>
            axios
                .post('http://localhost:3000/login', emailUserValid)
                .then((res) => {
                    assert.equal(res.status, '200');
                    assert.equal(res.data.hash, 'pass');
                })
                .catch((err) => {
                    throw err;
                }));

        it('test du middleware dans un cas de négatif', () =>
            axios
                .post('http://localhost:3000/login', emailUserInvalid)
                .then((res) => {
                    assert.equal(res.status, '200');
                    assert.equal(res.data.hash, undefined);
                })
                .catch((err) => {
                    throw err;
                }));
    });
});
