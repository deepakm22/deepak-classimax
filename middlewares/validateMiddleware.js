const { registerValidationSchema, loginValidationSchema, profileUpdateSchema} = require('../validation/loginValidation')

const validationMiddleware = (req, res, next) => {
    let schema;

    switch (req.path) {
    case '/register':
        schema = registerValidationSchema;
        break;
    case '/login':
        schema = loginValidationSchema;
        break;
    case '/updateProfile':
        schema = profileUpdateSchema;
        break;

    default:
        schema = null;
    }

    if (schema) {
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({
        result: {},
        message: error.details[0].message,
        status: 'error',
        responseCode: 400,
        });
    }
    }
    next(); 
};

module.exports = validationMiddleware;
