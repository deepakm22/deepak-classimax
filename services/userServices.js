const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userSchema = require('../models/userModel');
const { sendMail } = require('../services/mailServices');
const crypto = require('crypto')
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

exports.updatePassword = async (userId, oldPassword, newPassword,email) => {
    const user = await userSchema.findById(userId);
    if (!user) {
    return {
        result: {},
        message: 'User not found',
        status: 'error',
        responseCode: 404,
    };
    }

    const validPassword = await bcrypt.compare(oldPassword, user.password);
    if (!validPassword) {
    return {
        result: {},
        message: 'Old password is incorrect',
        status: 'error',
        responseCode: 400,
    };
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    sendMail(email, 'user password updated Successful', ` ${email}!`);


    return {
    result: {},
    message: 'Password changed successfully',
    status: 'success',
    responseCode: 200,
    };
};

exports.updateEmail = async (userId, currentEmail, newEmail) => {
    const user = await userSchema.findById(userId);
    console.log(user.email);
    
    if (!user) {
        return {
            message: 'User not found',
            status: 'error',
            responseCode: 404,
        };
    }

    if (user.email !== currentEmail) {
        return {
            message: 'Current email does not match our records',
            status: 'error',
            responseCode: 400,
        };
    }

    const existingEmail = await userSchema.findOne({ email: newEmail });
    if (existingEmail) {
        return {
            message: 'Email already in use',
            status: 'error',
            responseCode: 400,
        };
    }

    user.email = newEmail;
    await user.save();

    sendMail(newEmail, 'User Email Updated Successfully', `Hello, ${newEmail}. Your email has been updated successfully.`);

    return {
        message: 'Email updated successfully',
        status: 'success',
        responseCode: 200,
    };
};

exports.getProfile = async (userId) => {
    const user = await userSchema.findById(userId).select('-password');

    if (!user) {
    return {
        result: {},
        message: 'User not found',
        status: 'error',
        responseCode: 404,
    };
    }

    const userProfileWithBase64Image = {
    ...user.toObject(),
    image: user.image ? user.image.toString('base64') : null, 
    };

    return {
    result: userProfileWithBase64Image,
    message: 'User profile fetched successfully',
    status: 'success',
    responseCode: 200,
    }
}

exports.forgotUserPassword = async (email) => {
    try {
        const user = await userSchema.findOne({ email });
        if (!user) {
            return {
                result: {},
                message: 'User not found',
                status: 'error',
                responseCode: 404,
            };
        }

        const otp = crypto.randomInt(100000, 999999).toString();
        const expires = Date.now() + 3600000; 

        user.otp = otp;
        user.expires = expires;
        await user.save();

        sendMail(email, `Your OTP ${otp}`, `Your OTP for password reset is . It is valid for 1 hour.`);

        return {
            result: {},
            message: 'OTP sent to your email',
            status: 'success',
            responseCode: 200,
        };
    } catch (error) {
        console.error('Forgot password error:', error);
        return {
            result: {},
            message: 'An unexpected error occurred. Please try again later.',
            status: 'error',
            responseCode: 500,
            reason: error.message,
        };
    }
};

exports.resetUserPassword = async (email, otp, newPassword) => {
    try {
        const user = await userSchema.findOne({ email, otp });
        if (!user || user.expires < Date.now()) {
            return {
                result: {},
                message: 'OTP is invalid or has expired',
                status: 'error',
                responseCode: 400,
            };
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;

        user.otp = undefined;
        user.expires = undefined;

        await user.save();

        return {
            result: {},
            message: 'Password reset successful',
            status: 'success',
            responseCode: 200,
        };
    } catch (error) {
        return {
            result: {},
            message: 'An unexpected error occurred. Please try again later.',
            status: 'error',
            responseCode: 500,
            reason: error.message,
        };
    }
};
