const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;

const StatusCodes = require("http-status-codes");
const {BAD_REQUEST} = StatusCodes;

const checkDuplicateUsernameOrEmail = (req, res, next) => {
    if (req.body && (!req.body.username || !req.body.email)) {
        return next();
    }

    // Username
    User.findOne({
        where: {
            username: req.body.username
        }
    }).then(user => {
        if (user) {
            res.status(BAD_REQUEST).send({
                message: "Failed! Username is already in use!"
            });
            return;
        }

        User.findOne({
            where: {
                email: req.body.email
            }
        }).then(user => {
            if (user) {
                res.status(BAD_REQUEST).send({
                    message: "Failed! Email is already in use!"
                });
                return;
            }

            next();
        });
    });
};

const checkRolesExisted = (req, res, next) => {
    if (req.body.roles) {
        for (let i = 0; i < req.body.roles.length; i++) {
            if (!ROLES.includes(req.body.roles[i])) {
                res.status(400).send({
                    message: "Failed! Role does not exist = " + req.body.roles[i]
                });
                return;
            }
        }
    }

    next();
};

const verifySignUp = {
    checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail,
    checkRolesExisted: checkRolesExisted
};

module.exports = verifySignUp;
