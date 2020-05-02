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
        const [key, value] = entry;
        const { path, method, routes } = value;

        const bufferSchema = await readFilePromise(path, 'utf8').catch(
            (err) => {
                debug(err);
            },
        );

        const jsonSchema = JSON.parse(bufferSchema);
        objectAjv.addSchema(jsonSchema, `${method}_${routes}`);
    });
}

loadConfig(config);

function validation(req, res, next) {
    const { originalUrl, method, body } = req;
    const validate = objectAjv.getSchema(`${method}_${originalUrl}`);

    if (validate(body)) next();
    else {
        res.status(400).send('Veuillez envoyer bien formater vos données');
        debug('Un client a été jarté ici');
        debug(body);
    }
}

module.exports = {
    validation,
};
