const debug = require('debug')('datasource:mysql');
const { promisify } = require('util');
const mysql = require('mysql');

const dbConfig = require('./BD_PICAM');

const connection = mysql.createConnection(dbConfig);

const connectionPromise = promisify(connection.connect).bind(connection);
const closePromise = promisify(connection.end).bind(connection);

connection.on('error', (err) => {
    debug(err);
});

connectionPromise()
    .then(() => {
        debug(
            `La base de donnée a bien été connecté sur ${dbConfig.user}:${dbConfig.host} sur le port ${dbConfig.port}`,
        );
    })
    .catch((err) => {
        debug(err);
    });

connection.on('end', () => {
    debug('la connexion a bien été fermé');
});

module.exports = {
    connection,
    connectionPromise,
    closePromise,
};
