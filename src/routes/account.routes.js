const controller = require("../controllers/account");

module.exports = function(app) {
    app.post("/account/reset-password", controller.requestReset
    );
};
