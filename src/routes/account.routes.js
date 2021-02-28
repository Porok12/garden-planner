const controller = require("../controllers/account");
const { authJwt } = require("../middleware");

module.exports = function(app) {
    app.post("/account/reset", controller.requestReset);
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
