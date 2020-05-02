const {
    postUserQuery,
    findUserById,
    findHashByEmail,
    findIdByEmail,
} = require('../../src/services/user.services.js');

describe('Teste des requêtes envoyer à la base de donnée pour le controller user', () => {
    context("Test de création d'user sur la base de donnée", () => {
        it('Requête insertion de données à la table user', () =>
            postUserQuery([
                'nom',
                'prénom',
                'surnom',
                'pass',
                'bonjour.test@gmail.com',
            ])
                .then((result, field) => {})
                .catch((err) => {
                    throw err;
                }));
    });

    context('Trouver un utilisateur par son id', () => {
        it("requête de sélection d'élément dans la table user par son id", () =>
            findUserById(5)
                .then((result, field) => {})
                .catch((err) => {
                    throw err;
                }));
    });

    context('Trouver un utilisateur par son email', () => {
        it('requête de sélection du hash dans la table user par son email', () =>
            findHashByEmail('email')
                .then((result, field) => {})
                .catch((err) => {
                    throw err;
                }));

        it('requête de sélection du id dans la table user par son email', () =>
            findIdByEmail('rrangom@gmail.com')
                .then((result, field) => {})
                .catch((err) => {
                    throw err;
                }));
    });
});
