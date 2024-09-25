const express = require('express');
const validationMiddleware = require('../middlewares/validateMiddleware')
const authenticateToken = require('../middlewares/authMiddleware')
const { register, login, updateUserProfile, deleteUser, updateUserPassword} = require('../controllers/userController');
// const { updateUserPassword } = require('../services/userServices');



const router = express.Router();

router.post('/register', validationMiddleware, register)
router.post('/login', validationMiddleware, login)
router.patch('/updateUserProfile', validationMiddleware, authenticateToken, updateUserProfile)
router.delete('/deleteUser',  authenticateToken, deleteUser)
router.patch('/updatePassword', validationMiddleware, authenticateToken, updateUserPassword)


module.exports = router;