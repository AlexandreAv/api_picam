const axios = require('axios');
const { assert } = require('chai');
const { encrypt, decrypt } = require('../../src/middlewares/bcrypt.middleware');
const { startServer, stopServer, app } = require('../servers/app');

const objectUserValid = {
    firstname: 'Alexandre',
    lastname: 'Rangom',
    nickname: 'Gamatel',
    pass: 'bonjour1234',
    email: 'bonjour@aurevoir.com',
};

const verifPassValid = {
    pass: 'bonjour1234',
    hash: '$2b$10$K8K8WXUb0TftyW3c.LOrb.L147Mzslr4n01nByRekAPf3TY2EpiMy',
};

const verifPassInvalid = {
    pass: 'bonjour1234',
    hash: '$2b$11$K8K8WXUb0TftyW3c.LOrb.L147Mzslr4n01nByRekAPf3TY2EpiMy',
};

describe('#bcryptMiddleware()', () => {
    before(() => {
        app.post('/encrypt', encrypt, (req, res) => {
            res.status(200).send({ pass: req.body.pass });
        });

        app.post('/decrypt', decrypt, (req, res) => {
            res.status(200).send({ message: 'mdp validé' });
        });
        startServer();
    });

    after(() => {
        stopServer();
    });

    context('Test du middleware de cryptage de champ bcryptMiddleware', () => {
        it('test encryptage', () =>
            axios
                .post('http://localhost:3000/encrypt', objectUserValid)
                .then((res) => {
                    assert.equal(res.status, '200');
                    assert.notEqual(res.data.pass, objectUserValid.pass);
                })
                .catch((err) => {
                    throw err;
                }));
    });

    it('test decryptage positif', () =>
        axios
            .post('http://localhost:3000/decrypt', verifPassValid)
            .then((res) => {
                assert.equal(res.status, '200');
            })
            .catch((err) => {
                throw err;
            }));

    it('test decryptage négatif', () =>
        axios
            .post('http://localhost:3000/decrypt', verifPassInvalid)
            .then((res) => {
                assert.equal(res.status, '400');
            })
            .catch((err) => {
                assert.equal(err.response.status, '400');
            }));
});
