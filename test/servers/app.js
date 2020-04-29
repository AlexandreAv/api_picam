const debug = require('debug')('api-picam:test_server');
const http = require('http');
const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
let server = null;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

function startServer() {
    server = http.createServer(app);
    server.on('listening', () =>
        debug("Le server s'est bien lancé sur le port 3000"),
    );
    server.on('close', () => debug("le server s'est bien fermé"));

    server.listen(3000);
}

function stopServer() {
    server.close();
}

module.exports = {
    app,
    startServer,
    stopServer,
};
