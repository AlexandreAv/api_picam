const axios = require('axios');
const { assert } = require('chai');
const { validation } = require('../../src/middlewares/ajw.middleware');
const { startServer, stopServer, app } = require('../servers/app');

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
                .post('http://localhost:3000/user', { todo: 'Buy the mikl' })
                .then((res) => {
                    assert(res.statusCode === 200);
                })
                .catch((err) => {
                    throw err;
                }));
    });
});
