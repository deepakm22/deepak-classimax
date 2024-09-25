const Joi = require('joi')

const registerValidationSchema = Joi.object({
    email: Joi.string().email().required().messages({
        'string.email': 'Please enter a valid email address',
        'any.required': 'Email is required'
    }),
    password: Joi.string().min(6).required().messages({
        'string.min': 'Password must be at least 6 characters long',
        'any.required': 'Password is required'
    }),
    confirmPassword: Joi.string().min(6).required().messages({
        'string.min': 'Password must be at least 6 characters long',
        'any.required': 'Confirm password is required'
    })
});

const loginValidationSchema = Joi.object({
    email: Joi.string().email().required().messages({
        'string.email': 'Please enter a valid email address',
        'any.required': 'Email is required'
    }),
    password: Joi.string().required().messages({
        'any.required': 'Password is required'
    })
});

const profileUpdateSchema = Joi.object({
    firstName: Joi.string().optional().messages({
        'string.base': 'First name must be a string'
    }),
    lastName: Joi.string().optional().messages({
        'string.base': 'Last name must be a string'
    }),
    community_name: Joi.string().optional().messages({
        'string.base': 'Community name must be a string'
    }),
    zipCode: Joi.string().optional().messages({
        'string.base': 'Zip code must be a string'
    }),
    phone_No: Joi.string().optional().messages({
        'string.base': 'Phone number must be a string'
    }),
    address: Joi.string().optional().messages({
        'string.base': 'Address must be a string'
    }),
    image: Joi.any().optional()
});



module.exports = { registerValidationSchema, loginValidationSchema, profileUpdateSchema  };
