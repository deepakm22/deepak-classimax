const Joi = require('joi')


const createProductSchema = Joi.object({
    title: Joi.string().min(3).required(),
    description: Joi.string().min(10).required(),
    categoryId: Joi.string().required(),
    adType: Joi.string().valid('Business', 'Personal').required(),
    price: Joi.number().positive().required(),
    Negotiable: Joi.boolean().optional(),
    image: Joi.binary().optional(), 
    Specification: Joi.object().optional()
});


const updateProductSchema = Joi.object({
    title: Joi.string().min(3).optional(),
    description: Joi.string().min(10).optional(),
    categoryId: Joi.string().optional(),
    adType: Joi.string().valid('Business', 'Personal').optional(),
    price: Joi.number().positive().optional(),
    isArchived:Joi.boolean().optional(),
    Negotiable: Joi.boolean().optional(),
    image: Joi.binary().optional(),
    Specification: Joi.object().optional(),
    Status: Joi.string().valid('Approved', 'pending Approval', 'rejected').optional()
});





module.exports = {createProductSchema, updateProductSchema}
