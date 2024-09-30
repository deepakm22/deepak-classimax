const Joi = require('joi')

const createReviewSchema = Joi.object({
    productId: Joi.string().required().messages({
    'string.empty': 'Product ID is required',
    }),
    name: Joi.string().required().messages({
    'string.empty': 'Name is required',
    }),
    email: Joi.string().email().required().messages({
    'string.email': 'Valid email is required',
    'string.empty': 'Email is required',
    }),
    message: Joi.string().required().messages({
    'string.empty': 'Message is required',
    }),
    Ratings: Joi.number().integer().min(1).max(5).required().messages({
    'number.base': 'Ratings must be a number',
    'number.integer': 'Ratings must be an integer',
    'number.min': 'Ratings must be at least 1',
    'number.max': 'Ratings must be at most 5',
    'any.required': 'Ratings are required',
    }),
});

const updateReviewSchema = Joi.object({
    productId: Joi.string().optional().messages({
    'string.empty': 'Product ID is invalid',
    }),
    name: Joi.string().optional().messages({
    'string.empty': 'Name is required',
    }),
    email: Joi.string().email().optional().messages({
    'string.email': 'Valid email is required',
    'string.empty': 'Email is required',
    }),
    message: Joi.string().optional().messages({
    'string.empty': 'Message is required',
    }),
    Ratings: Joi.number().integer().min(1).max(5).optional().messages({
    'number.base': 'Ratings must be a number',
    'number.integer': 'Ratings must be an integer',
    'number.min': 'Ratings must be at least 1',
    'number.max': 'Ratings must be at most 5',
    'any.required': 'Ratings are required',
    }),
});

module.exports = {createReviewSchema, updateReviewSchema}