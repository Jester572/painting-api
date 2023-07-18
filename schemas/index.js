const Joi = require('joi');

const UserSchema = Joi.string().required();

const PaintingSchema = Joi.object({
    painting_title : Joi.string().required(),
    artist : Joi.string().required(),
    date_created : Joi.string().optional().allow(''),
    period : Joi.string().required(),
    keywords : [string().optional().allow('')],
    location : Joi.string().optional().allow(''),
    url : Joi.uri().optional().allow(''),
})

module.exports = {UserSchema, PaintingSchema};