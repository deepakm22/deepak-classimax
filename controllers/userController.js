const  { registerUser, loginUser, updateUserProfileService , deleteUser, updatePassword, updateEmail, getProfile, forgotUserPassword, resetUserPassword} = require('../services/userServices')
require('dotenv').config();

exports.register = async (req, res) => {
    try {

        const { email, password, confirmPassword } = req.body;

        const result = await registerUser(email, password, confirmPassword);

        return res.status(result.responseCode).json(result);
    } catch (error) {
        console.error('Registration error:', error);
        return res.status(500).json({
            result: {},
            message: 'An unexpected error occurred. Please try again later.',
            status: 'error',
            responseCode: 500,
            reason: error.message
        });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await loginUser(email, password);
        return res.status(result.responseCode).json(result);
    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({
            result: {},
            message: 'An unexpected error occurred. Please try again later.',
            status: 'error',
            responseCode: 500,
            reason: error.message
        });
    }
};

exports.updateUserProfile = async (req, res) => {
    try {
        const userId  = req.user;
        const email = req.email
        const { firstName, lastName, community_name, zipCode, phone_No, address } = req.body;
        const image = req.files ? req.files.image : null;

        const result = await updateUserProfileService(userId, { firstName, lastName, community_name, zipCode, phone_No, address }, image,email);

        return res.status(result.responseCode).json(result);
    } catch (error) {
        console.error('Update profile error:', error);
        return res.status(500).json({
            result: {},
            message: 'An unexpected error occurred. Please try again later.',
            status: 'error',
            responseCode: 500,
            reason: error.message
        });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const userId = req.user; 
        const email = req.email;
        console.log(userId);

        const result = await deleteUser(userId, email);

        if (!result.success) {
            return res.status(result.statusCode).json({
                result: {},
                message: result.message,
                status: 'error',
                responseCode: result.statusCode,
            });
        }

        return res.status(200).json({
            result: {},
            message: result.message,
            status: 'success',
            responseCode: 200,
        });
    } catch (error) {
        return res.status(500).json({
            result: {},
            message: 'Error deleting user',
            status: 'error',
            responseCode: 500,
            reason: error.message,
        });
    }
};

exports.updateUserPassword = async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    const userId = req.user;
    const email = req.email

    try {
    const result = await updatePassword(userId, oldPassword, newPassword, email);
    return res.status(result.responseCode).json(result);
    } catch (err) {
    return res.status(500).json({
        result: {},
        message: 'Server error',
        status: 'error',
        responseCode: 500,
        error: err.message,
    });
    }
};

exports.updateUserEmail = async (req, res) => {
    const { currentEmail, newEmail } = req.body;
    const userId = req.user;
    const email = req.email;

    try {
        const result = await updateEmail(userId, currentEmail, newEmail, email);
        return res.status(result.responseCode).json(result);
    } catch (err) {
        return res.status(500).json({
            message: 'Server error',
            status: 'error',
            responseCode: 500,
            error: err.message,
        });
    }
};

exports.getUserProfile = async (req, res) => {
    try {
    const userId = req.user;

    const result = await getProfile(userId);

    return res.status(result.responseCode).json(result);
    } catch (err) {
    return res.status(500).json({
        result: {},
        message: 'Server error',
        status: 'error',
        responseCode: 500,
        error: err.message,
    });
    }
};

exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const result = await forgotUserPassword(email);
        return res.status(result.responseCode).json(result);
    } catch (error) {
        console.error('Forgot password error:', error);
        return res.status(500).json({
            result: {},
            message: 'An unexpected error occurred. Please try again later.',
            status: 'error',
            responseCode: 500,
            reason: error.message,
        });
    }
};

exports.resetPassword = async (req, res) => {
    try {
        const { email, otp, newPassword } = req.body;
        const result = await resetUserPassword(email, otp, newPassword);
        return res.status(result.responseCode).json(result);
    } catch (error) {
        console.error('Reset password error:', error);
        return res.status(500).json({
            result: {},
            message: 'An unexpected error occurred. Please try again later.',
            status: 'error',
            responseCode: 500,
            reason: error.message,
        });
    }
};
