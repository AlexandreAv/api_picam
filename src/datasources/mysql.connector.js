const debug = require('debug')('datasource:mysql');
const util = require('util');
const mysql = require('mysql');

const db_config = require('./BD_PICAM');

const connection = mysql.createConnection(db_config);

const connection_promise = util.promisify(connection.connect).bind(connection);
const close_promise = util.promisify(connection.end).bind(connection);

// connection_promise().then(() => {
//     debug(`La base de donnée a bien été connecté sur ${db_config.user}:${db_config.host} sur le port ${db_config.port}`);
// }).catch((err) => {
//     debug(err);
// });


module.exports = {
    connection,
    connection_promise,
    close_promise,
};
