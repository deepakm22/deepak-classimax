const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userSchema = require('../models/userModel');
const { sendMail } = require('../services/mailServices');
require('dotenv').config();

exports.registerUser = async (email, password, confirmPassword) => {
    try {
        if (password !== confirmPassword) {
            return {
                result: {},
                message: 'Passwords do not match',
                status: 'error',
                responseCode: 400
            };
        }
        const existingUser = await userSchema.findOne({ email });
        if (existingUser) {
            return {
                result: {},
                message: 'Email already exists. Please use a different email',
                status: 'error',
                responseCode: 400
            };
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await userSchema.create({ email, password: hashedPassword });

        sendMail(email, 'Register Successful', `Welcome back, ${email}!`);

        return {
            result: { email },
            message: 'User created successfully',
            status: 'success',
            responseCode: 201
        };
    } catch (error) {
        console.error('Registration error:', error);
        throw error;
    }
};

exports.loginUser = async (email, password) => {
    try {
        const user = await userSchema.findOne({ email });
        if (!user) {
            return {
                result: {},
                message: 'User not found',
                status: 'error',
                responseCode: 400
            };
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return {
                result: {},
                message: 'Invalid credentials',
                status: 'error',
                responseCode: 400
            };
        }

        const token = jwt.sign({ id: user.id, email: user.email }, process.env.SECRET_KEY);

        sendMail(email, 'Login Successful', `Welcome back, ${user.email}!`);

        return {
            result: { user_email: user.email, token },
            message: 'Login successful',
            status: 'success',
            responseCode: 200
        };
    } catch (error) {
        console.error('Login error:', error);
        throw error;
    }
};

exports.updateUserProfileService = async (userId, updateData, image, email) => {
    try {
        if (image) {
            const base64Image = image.data.toString('base64');
            const imageBuffer = Buffer.from(base64Image, 'base64');
            updateData.image = imageBuffer;
        }

        updateData.updated_at = Date.now();
        const _id = userId
console.log(_id);

        const updatedUser = await userSchema.findByIdAndUpdate(_id, updateData, { new: true });

        if (!updatedUser) {
            return {
                result: {},
                message: 'User not found',
                status: 'error',
                responseCode: 404
            };
        }

        sendMail(email, 'user updated Successful', `${email}!`);


        return {
            result: updatedUser,
            message: 'Profile updated successfully',
            status: 'success',
            responseCode: 200
        };
    } catch (error) {
        console.error('Update profile error:', error);
        throw error;
    }
};

exports.deleteUser = async (userId, email) => {
    try {
        const user = await userSchema.findByIdAndDelete({ _id: userId });
        if (!user) {
            return {
                success: false,
                statusCode: 404,
                message: 'User not found',
            };
        }
        sendMail(email, 'user deleted Successful', ` ${email}!`);

        return {
            success: true,
            statusCode: 200,
            message: 'User deleted successfully',
        };
    } catch (error) {
        throw new Error(error.message);
    }
};

exports.updatePassword = async (userId, updateData, email) => {
    try {
console.log(updateData);

        updateData.updated_at = Date.now();
        const _id = userId
console.log(_id);

        const updatedPassword = await userSchema.findByIdAndUpdate(_id, updateData, { new: true });

        if (!updatedPassword) {
            return {
                result: {},
                message: 'User not found',
                status: 'error',
                responseCode: 404
            };
        }

        sendMail(email, 'user password updated Successful', `${email}!`);


        return {
            result: updatedPassword,
            message: 'Password updated successfully',
            status: 'success',
            responseCode: 200
        };
    } catch (error) {
        console.error('Update password error:', error);
        throw error;
    }
};
