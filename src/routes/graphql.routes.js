const { authJwt } = require("../middleware");
const graphql = require('../controllers/grapql');

module.exports = function (app) {
    app.post(
        '/graphql',
        [
            authJwt.readToken
        ],
        graphql.controller
    );
}
