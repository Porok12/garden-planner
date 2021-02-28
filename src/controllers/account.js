const db = require("../models");
const User = db.user;
const Op = db.Sequelize.Op;
const StatusCodes = require("http-status-codes");
const {INTERNAL_SERVER_ERROR, OK, BAD_REQUEST} = StatusCodes;
const mailer = require('../mails');
const Joi = require('joi');
const SHA256 = require("crypto-js/sha256");

module.exports.requestReset = (req, res) => {
    const {error} = Joi.object({
        email: Joi.string().email().required()
    }).required().validate(req.body);

    if (error) {
        return res.status(BAD_REQUEST).send({message: error.message});
    }

    User.findOne({
        where: {
            email: req.body.email
        }
    }).then(user => {
        const token = Date.now().toString(36);
        if (user) {
            user.token = token;
            user.tokenExpire = Date.now() + 24 * 3600 * 1000;
            user.save();

            mailer.sendResetPassword(user.email, token);
        }
        res.status(OK).send({message: "Success"});

    }).catch(err => {
        res.status(INTERNAL_SERVER_ERROR).send({message: err});
    });
};

module.exports.resetPassword = (req, res) => {
    const { token } = req.params;

    if (!token) {
        return res.status(BAD_REQUEST).send({message: 'No token provided'});
    }

    const {error} = Joi.object({
        password: Joi.string().min(3).required()
    }).required().validate(req.body);

    if (error) {
        return res.status(BAD_REQUEST).send({message: error.message});
    }

    User.findOne({
        where: {
            token: token,
            tokenExpire: { [Op.gt]: Date.now() }
        }
    }).then(user => {
        if (user) {
            user.password = SHA256(req.body.password).toString();
            user.token = null;
            user.tokenExpire = null;
            user.save();
            res.status(OK).send({message: "Success"});

        } else {
            res.status(BAD_REQUEST).send({message: 'No user found'});
        }


    }).catch(err => {
        res.status(INTERNAL_SERVER_ERROR).send({message: err});
    });
};

module.exports.activateAccount = (req, res) => {
    const { token } = req.params;

    if (!token) {
        return res.status(BAD_REQUEST).send({message: 'No token provided'});
    }

    User.findOne({
        where: {
            token: token,
            tokenExpire: { [Op.gt]: Date.now() }
        }
    }).then(user => {
        if (user) {
            user.activated = '1';
            user.token = null;
            user.tokenExpire = null;
            user.save();

            res.status(OK).send({
                message: 'Account activated'
            });

        } else {
            res.status(BAD_REQUEST).send({
                message: 'Unknown code'
            });
        }
    })
}

module.exports.getProjects = (req, res) => {
    User.findByPk(req.userId)
        .then(async user => {
            if (!user) {
                return res.status(BAD_REQUEST).send({error: 'User not found!'});
            }

            const projects = await user.getProjects({
                attributes: { exclude: ['userId'] }
            });
            return res.status(OK).send({ projects: projects });
        });
}
