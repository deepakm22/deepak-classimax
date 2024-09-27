const express = require('express');
const validationMiddleware = require('../middlewares/validateMiddleware')
const authenticateToken = require('../middlewares/authMiddleware');
const {addCategory, getAllCategories, getSingleCategory, updateCategory, deleteCategory} = require('../controllers/categoryController')

const router = express.Router();


router.post('/createCategory', authenticateToken,validationMiddleware, addCategory)
router.get('/getAll', authenticateToken, validationMiddleware, getAllCategories)
router.get('/getSingleCategory/:id', authenticateToken, getSingleCategory)
router.put('/updateCategory/:id', authenticateToken,  validationMiddleware, updateCategory)
router.delete('/deleteCategory/:id', authenticateToken, validationMiddleware, deleteCategory)



module.exports = router;