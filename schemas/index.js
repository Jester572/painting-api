const Joi = require('joi');

const UserSchema = Joi.object({
    githubId: Joi.number().required(),
    displayName: Joi.string().required(),
    createdAt: Joi.date().required(),
})


const PaintingSchema = Joi.object({
    painting_title : Joi.string().required(),
    artist : Joi.string().required(),
    date_created : Joi.string().optional().allow(''),
    period : Joi.string().required(),
    keywords : Joi.array().optional().allow(''),
    location : Joi.string().optional().allow(''),
    url : Joi.string().optional().allow(''),
})

module.exports = {UserSchema, PaintingSchema};