const Joi = require('joi')

const addSubCategorySchema = Joi.object({
    subCategory_name: Joi.string().trim().min(3).max(100).required().messages({
        'string.base': 'SubCategory name must be a string',
        'string.empty': 'SubCategory name cannot be empty',
        'string.min': 'SubCategory name must be at least 3 characters long',
        'string.max': 'SubCategory name must not exceed 100 characters',
        'any.required': 'SubCategory name is required'
    }),
    categoryId: Joi.string().trim().required().messages({
        'string.base': 'Category ID must be a string',
        'string.empty': 'Category ID cannot be empty',
        'any.required': 'Category ID is required'
    })
});

const updateSubCategorySchema = Joi.object({
    subcategory_name: Joi.string().trim().min(3).max(100).required().messages({
        'string.base': 'SubCategory name must be a string',
        'string.empty': 'SubCategory name cannot be empty',
        'string.min': 'SubCategory name must be at least 3 characters long',
        'string.max': 'SubCategory name must not exceed 100 characters',
        'any.required': 'SubCategory name is required'
    }),
    categoryId: Joi.string().trim().required().messages({
        'string.base': 'Category ID must be a string',
        'string.empty': 'Category ID cannot be empty',
        'any.required': 'Category ID is required'
    })
});

module.exports = {addSubCategorySchema, updateSubCategorySchema}