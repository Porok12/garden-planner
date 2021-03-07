const controller = require("../controllers/account");
const rateLimit = require("express-rate-limit");
const { authJwt } = require("../middleware");

const resetPasswordLimiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    max: 3
});

module.exports = function(app) {
    app.post("/account/reset", resetPasswordLimiter, controller.requestReset);
    app.post("/account/reset/:token", controller.resetPassword);
    app.post("/account/active/:token", controller.activateAccount);
    app.get(
        "/account/projects",
        [
            authJwt.verifyToken
        ],
        controller.getProjects
    );
};
