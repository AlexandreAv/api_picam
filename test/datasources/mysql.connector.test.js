const debug = require('debug')('test:datasource-mysql');
const chai = require('chai');
const expect = chai.expect;

const mysql_data_source = require('../../src/datasources/mysql.connector.js');

const connection = mysql_data_source.connection;
const connection_promise = mysql_data_source.connection_promise;
const close_promise = mysql_data_source.close_promise;


describe('#connection_promise()', () => {
    context('test de connection avec à la base de donnée', () => {
        it('doit se connecter à la base de donnée', () => {
            return connection_promise()
                .then(debug("la connexion s'est bien déroulé"))
                .catch((err) => {
                    expect(err).to.be.a('undefined');
                })
        });
    });
});

describe('#close_promise', () => {
    before('connection à la base de donnée', () => {
        return connection_promise().then(() => {
            debug(`La base de donnée a bien été connecté sur ${db_config.user}:${db_config.host} sur le port ${db_config.port}`);
        }).catch((err) => {
            debug(err);
        });
    });

   context('test de fermeture de la connexion avec le base de donnée', () => {
       it('doit fermer la connexion à la base de donnée', () => {
            return close_promise()
                .then(debug("la déconnexion s'est bien déroulé"))
                .catch((err) => {
                    expect(err).to.be.a('undefined');
                });
       });
   }) ;
});


