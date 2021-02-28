const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;
const Op = db.Sequelize.Op;

const StatusCodes = require("http-status-codes");
const {INTERNAL_SERVER_ERROR, OK, UNAUTHORIZED, NOT_FOUND, BAD_REQUEST} = StatusCodes;

const jwt = require("jsonwebtoken");
const SHA256 = require("crypto-js/sha256");
const AES = require("crypto-js/aes");
const {signinSchema, signupSchema} = require("../schemas");
const mailer = require('../mails');

module.exports.signin = (req, res) => {
    const {error} = signinSchema.validate(req.body);

    if (error) {
        return res.status(BAD_REQUEST).send({message: error.message});
    }

    User.findOne({
        where: {
            username: req.body.username
        }
    })
        .then(user => {
            if (!user) {
                return res.status(NOT_FOUND).send({ message: "User Not found." });
            }

            if (!user.activated) {
                return res.status(UNAUTHORIZED).send({
                    accessToken: null,
                    message: "Account not activated"
                });
            }

            const passwordIsValid = user.password === SHA256(req.body.password).toString();

            if (!passwordIsValid) {
                return res.status(UNAUTHORIZED).send({
                    accessToken: null,
                    message: "Invalid Password"
                });
            }

            const authorities = [];
            user.getRoles().then(roles => {
                for (let i = 0; i < roles.length; i++) {
                    authorities.push("ROLE_" + roles[i].name.toUpperCase());
                }

                const token = jwt.sign({
                    id: user.id,
                    roles: authorities
                }, config.secret, {
                    expiresIn: 86400
                });

                res.status(200).send({
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    roles: authorities,
                    accessToken: token
                });
            });
        })
        .catch(err => {
            res.status(INTERNAL_SERVER_ERROR).send({ message: err.message });
        });
};

module.exports.signup = (req, res) => {
    const {error} = signupSchema.validate(req.body);

    if (error) {
        return res.status(BAD_REQUEST).send({message: error.message});
    }

    const token = Date.now().toString(36);// AES.encrypt(req.body.username, '123').toString();
    const tokenExpire = Date.now() + 48 * 3600 * 1000;

    User.create({
        username: req.body.username,
        email: req.body.email,
        password: SHA256(req.body.password).toString(),
        token: token,
        tokenExpire: tokenExpire
    }).then(user => {
        user.setRoles([1]).then(() => {
            mailer.sendActivationCode(user.email, token)
                .then(() => res.status(OK).send({message: "Success"}));
        });

    }).catch(err => {
        res.status(INTERNAL_SERVER_ERROR).send({message: err});
    });
};
