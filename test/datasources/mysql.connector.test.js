const debug = require('debug')('test:datasource-mysql');
const chai = require('chai');
const dbConfig = require('../../src/datasources/BD_PICAM.json');

const { expect } = chai;

const mysqlDataSource = require('../../src/datasources/mysql.connector.js');

const { connection, connectionPromise, closePromise } = mysqlDataSource;

describe('#connection_promise()', () => {
    context('test de connection avec à la base de donnée', () => {
        it('doit se connecter à la base de donnée', () =>
            connectionPromise()
                .then(() => {})
                .catch((err) => {
                    throw err;
                }));
    });
});

describe('#close_promise', () => {
    before('connection à la base de donnée', () =>
        connectionPromise()
            .then(() => {
                debug(
                    `La base de donnée a bien été connecté sur ${dbConfig.user}:${dbConfig.host} sur le port ${dbConfig.port}`,
                );
            })
            .catch((err) => {
                debug(err);
            }),
    );

    context('test de fermeture de la connexion avec le base de donnée', () => {
        it('doit fermer la connexion à la base de donnée', () =>
            closePromise()
                .then(() => {
                    debug("la déconnexion s'est bien déroulé");
                })
                .catch((err) => {}));
    });
});
