const { authJwt } = require("../middleware");
const rateLimit = require("express-rate-limit");
const graphql = require('../controllers/grapql');


const queryLimiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    max: 1000,
});

module.exports = function (app) {
    app.post(
        '/graphql',
        [
            queryLimiter,
            authJwt.readToken
        ],
        graphql.controller
    );
}
