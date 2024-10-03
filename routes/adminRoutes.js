const express = require('express');
const validationMiddleware = require('../middlewares/validateMiddleware')
const authenticateToken = require('../middlewares/authMiddleware');
const { updateProduct } = require('../controllers/adminController');


const router = express.Router();

router.patch('/adminUpdateProduct/:id', authenticateToken, validationMiddleware, updateProduct)


module.exports = router;