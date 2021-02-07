module.exports = function (Joi) {
    return Joi.object({
        username: Joi.string().min(3).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(3).required(),
        agreed: Joi.boolean().invalid(false).required()
    }).required();
}
