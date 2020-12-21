module.exports = function (Joi) {
    return Joi.object({
        username: Joi.string().min(3).required(),
        password: Joi.string().min(3).required(),
    }).required();
}
