const express = require('express');
const validationMiddleware = require('../middlewares/validateMiddleware')
const authenticateToken = require('../middlewares/authMiddleware')
const { register, login, updateUserProfile, deleteUser} = require('../controllers/userController');



const router = express.Router();

router.post('/register', validationMiddleware, register)
router.post('/login', validationMiddleware, login)
router.patch('/updateUserProfile', validationMiddleware, authenticateToken, updateUserProfile)
router.delete('/deleteUser',  authenticateToken, deleteUser)


module.exports = router;