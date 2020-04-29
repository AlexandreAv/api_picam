const debug = require('debug')('api-picam:ajw_middleware');
const fs = require('fs');
const { promisify } = require('util');
const Ajv = require('ajv');
const httpStatus = require('http-status');
const config = require('../../config/ajw.middleware.config.json');

const objectAjv = new Ajv();
const readFilePromise = promisify(fs.readFile);

// TODO ajouter un moyen d'envoyer la config au middleware sans la recharger à chaque appel

function loadConfig(configObject) {
    const workConfig = { ...configObject };

    Object.entries(workConfig).forEach(async (entry) => {
        const [value] = entry;
        const { path, method, routes } = value;

        const schema = await readFilePromise(path).catch((err) => {
            debug(err);
        });

        objectAjv.addSchema(schema, `${method}_${routes}`);
    });
}

loadConfig(config);

function validation(req, res, next) {
    const { url, method, body } = req;
    const objectUrl = new URL(url, `http://${req.headers.host}`);
    const { pathname } = objectUrl;
    const validate = objectAjv.getSchema(`${method}_${pathname}`);

    if (validate(body)) next();
    else {
        res.status(400).send(httpStatus['400_MESSAGE']);
    }
}

module.exports = {
    validation,
};
