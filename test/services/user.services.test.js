const {
    postUserQuery,
    findUserById,
} = require('../../src/services/user.services.js');

describe('#postUserQuery()', () => {
    context("Test de création d'user sur la base de donnée", () => {
        it('Requête insertion de données à la table user', () =>
            postUserQuery(['nom', 'prénom', 'surnom', 'pass', 'email'])
                .then((result, field) => {})
                .catch((err) => {
                    throw err;
                }));
    });
});

describe('#findUserById()', () => {
    context('Trouver un utilisateur par son id', () => {
        it("requête de sélection d'élément dans la table user par son id", () =>
            postUserQuery(1)
                .then((result, field) => {})
                .catch((err) => {
                    throw err;
                }));
    });
});
