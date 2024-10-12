const Joi = require('joi');

exports.adminUpdateProductSchema = Joi.object({
    Status: Joi.string().valid('Approved', 'pending Approval', 'rejected').required()
});
