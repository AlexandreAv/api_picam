const { promisify } = require('util');
const mysql = require('mysql');
const { connection } = require('../datasources/mysql.connector');

const queryPromise = promisify(connection.query).bind(connection);

/* Create user */
const createUserSql = `INSERT INTO T_USER (firstname, lastname, nickname, hash, email)
                         VALUES (?, ?, ?, ?, ?)`;

function postUserQuery(data) {
    return queryPromise({
        sql: mysql.format(createUserSql, data),
        timeout: 10000,
    });
}

/* Find user by id */
const findUserByIdSql = 'SELECT * FROM T_USER WHERE id=?';

function findUserById(id) {
    return queryPromise({
        sql: mysql.format(findUserByIdSql, id),
        timeout: 10000,
    });
}

/* Find user by id */
const findHashByEmailSql = 'SELECT hash FROM T_USER WHERE email=?';

function findHashByEmail(email) {
    return queryPromise({
        sql: mysql.format(findHashByEmailSql, email),
        timeout: 10000,
    });
}

/* Find user by id */
const findIdByEmailSql = 'SELECT id FROM T_USER WHERE email=?';

function findIdByEmail(email) {
    return queryPromise({
        sql: mysql.format(findIdByEmailSql, email),
        timeout: 10000,
    });
}

module.exports = {
    postUserQuery,
    findUserById,
    findHashByEmail,
    findIdByEmail,
};
