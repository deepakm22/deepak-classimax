const { registerValidationSchema, loginValidationSchema, profileUpdateSchema, deleteUserSchema, updateUserPasswordSchema, updateUserEmailSchema, resetPasswordSchema} = require('../validation/loginValidation')

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
    case '/deleteUser':
        schema = deleteUserSchema;
        break;
    case '/updatePassword':
        schema = updateUserPasswordSchema;
        break;
    case '/updateEmail':
        schema = updateUserEmailSchema;
        break;
    case '/reset':
        schema = resetPasswordSchema;
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
