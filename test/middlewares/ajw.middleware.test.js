const axios = require('axios');
const { assert } = require('chai');
const { validation } = require('../../src/middlewares/ajw.middleware');
const { startServer, stopServer, app } = require('../servers/app');

const objectUserValid = {
    firstname: 'Alexandre',
    lastname: 'Rangom',
    nickname: 'Gamatel',
    pass: 'bonjour1234',
    email: 'bonjour@aurevoir.com',
};

const objectUserInvalid = {
    firstname: 'Alexandre',
    lastname: 'Rangom',
    nickname: 'Gamatel',
    email: 'bonjour@aurevoir.com',
};

describe('#ajwMiddleware()', () => {
    before(() => {
        app.post('/user', validation, (req, res) => {
            res.status(200).send({ message: 'vaidé' });
        });
        startServer();
    });

    after(() => {
        stopServer();
    });

    context('Test du middleware de vérification de champ ajwMiddleware', () => {
        it('test du middleware dans un cas de réussite', () =>
            axios
                .post('http://localhost:3000/user', objectUserValid)
                .then((res) => {
                    assert.equal(res.status, '200');
                })
                .catch((err) => {
                    throw err;
                }));

        it('test du middleware dans un cas de réussite', () =>
            axios
                .post('http://localhost:3000/user', objectUserInvalid)
                .then((res) => {
                    assert.equal(res, undefined);
                })
                .catch((err) => {
                    assert.equal(err.response.status, 400);
                }));
    });
});
