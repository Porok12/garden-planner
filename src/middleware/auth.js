const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;

const StatusCodes = require("http-status-codes");
const {FORBIDDEN, UNAUTHORIZED} = StatusCodes;

const verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];

    if (!token) {
        return res.status(FORBIDDEN).send({
            message: "No token provided!"
        });
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(UNAUTHORIZED).send({
                message: "Unauthorized!"
            });
        }
        req.userId = decoded.id;
        next();
    });
};

const readToken = (req, res, next) => {
    let token = req.headers["x-access-token"];

    jwt.verify(token || '', config.secret, (err, decoded) => {
        if (!err) {
            req.user = decoded;
        } else {
            req.user = {
                roles: ['NONE_ROLE']
            };
        }

        next();
    });
};

const isAdmin = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
        user.getRoles().then(roles => {
            for (let i = 0; i < roles.length; i++) {
                if (roles[i].name === "admin") {
                    return next();
                }
            }

            return res.status(FORBIDDEN).send({
                message: "Require Admin Role!"
            });
        });
    });
};

const authJwt = {
    verifyToken: verifyToken,
    readToken: readToken,
    isAdmin: isAdmin
};

module.exports = authJwt;
