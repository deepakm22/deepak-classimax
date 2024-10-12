const express = require('express');
const validationMiddleware = require('../middlewares/validateMiddleware')
const authenticateToken = require('../middlewares/authMiddleware')
const { register, login, updateUserProfile, deleteUser, updateUserPassword, updateUserEmail, getUserProfile, forgotPassword, resetPassword} = require('../controllers/userController');
// const { updateUserPassword } = require('../services/userServices');



const router = express.Router();

router.post('/register', validationMiddleware, register)
router.post('/login', validationMiddleware, login)
router.patch('/updateUserProfile', validationMiddleware, authenticateToken, updateUserProfile)
router.delete('/deleteUser',  authenticateToken, deleteUser)
router.patch('/updatePassword', validationMiddleware, authenticateToken, updateUserPassword)
router.patch('/updateEmail', validationMiddleware, authenticateToken, updateUserEmail)
router.get('/getProfile', authenticateToken, getUserProfile)
router.post('/forgotPass', validationMiddleware, forgotPassword)
router.post('/reset', validationMiddleware, resetPassword)



module.exports = router;