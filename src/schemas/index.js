const Joi = require('joi');
const signinSchema = require('./signin')(Joi);

module.exports = {
    signinSchema
};
