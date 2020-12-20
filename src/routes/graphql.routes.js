const graphql = require('../controllers/grapql');

module.exports = function (app) {
    app.use('/graphql', graphql.controller);
}
