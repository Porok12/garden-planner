const db = require("../models");
const User = db.user;
const StatusCodes = require("http-status-codes");
const {INTERNAL_SERVER_ERROR, OK, BAD_REQUEST} = StatusCodes;
const mailer = require('./nodemailer');
const Joi = require('joi');

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
        if (user) {
            mailer.sendResetPassword(user.email);
        }
        res.status(OK).send({message: "Success"});

    }).catch(err => {
        res.status(INTERNAL_SERVER_ERROR).send({message: err});
    });
};
