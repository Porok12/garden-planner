const { signUpUtils, authJwt } = require("../middleware");
const rateLimit = require("express-rate-limit");
const controller = require("../controllers/auth");

const signInLimiter = rateLimit({
    skipSuccessfulRequests: true,
    windowMs: 15 * 60 * 1000,
    max: 10
});

const signUpLimiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    max: 3,
    message: "Too many accounts created from this IP, please try again after an hour"
});

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
            signUpLimiter,
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
        (req, res) => {
            res.status(200).send({message: "Token is valid"})
        }
    );

    app.post("/auth/signin", signInLimiter, controller.signin);
};
