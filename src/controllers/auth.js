const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;
const Op = db.Sequelize.Op;

const StatusCodes = require("http-status-codes");
const {INTERNAL_SERVER_ERROR, OK, UNAUTHORIZED, NOT_FOUND, BAD_REQUEST} = StatusCodes;

const jwt = require("jsonwebtoken");
const SHA256 = require("crypto-js/sha256");
const {signinSchema, signupSchema} = require("../schemas");
const mailer = require('./nodemailer');

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

            const passwordIsValid = user.password === SHA256(req.body.password).toString();

            if (!passwordIsValid) {
                return res.status(UNAUTHORIZED).send({
                    accessToken: null,
                    message: "Invalid Password!"
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

    User.create({
        username: req.body.username,
        email: req.body.email,
        password: SHA256(req.body.password).toString()
    }).then(user => {
        user.setRoles([1]).then(() => {
            mailer.sendActivationCode(user.email)
                .then(() => res.status(OK).send({message: "Success"}));
        });

    }).catch(err => {
        res.status(INTERNAL_SERVER_ERROR).send({message: err});
    });
};
