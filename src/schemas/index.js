const Joi = require('joi');
const signinSchema = require('./signin')(Joi);
const signupSchema = require('./signup')(Joi);

module.exports = {
    signinSchema,
    signupSchema
};
