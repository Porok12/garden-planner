const { signUpUtils, authJwt } = require("../middleware");
const controller = require("../controllers/auth");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post(
        "/auth/signup",
        [
            signUpUtils.checkDuplicateUsernameOrEmail,
            signUpUtils.checkRolesExisted
        ],
        controller.signup
    );

    app.post(
        "/auth/test",
        [
            authJwt.verifyToken,
        ],
        (req, res) => {res.status(200).send({message: ":)"})}
    );

    app.post("/auth/signin", controller.signin);
};
