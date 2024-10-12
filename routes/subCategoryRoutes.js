const express = require('express');
const validationMiddleware = require('../middlewares/validateMiddleware')
const authenticateToken = require('../middlewares/authMiddleware');
const { addSubCategory, getAllSubCategories, getSingleSubCategory, updateSubCategory, deleteSubCategory } = require('../controllers/subCategoryController');


const router = express.Router();

router.post('/createSubCategory', authenticateToken, validationMiddleware, addSubCategory)
router.get('/getAll', authenticateToken, validationMiddleware, getAllSubCategories)
router.get('/getSingle/:id', authenticateToken,  getSingleSubCategory)
router.put('/updateSubCategory/:id', authenticateToken, validationMiddleware, updateSubCategory)
router.delete('/deleteSubCategory/:id', authenticateToken, deleteSubCategory)


module.exports = router;