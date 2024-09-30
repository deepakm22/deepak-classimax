const express = require('express');
const validationMiddleware = require('../middlewares/validateMiddleware')
const authenticateToken = require('../middlewares/authMiddleware');
const { createProduct, getAllProducts, getMyProducts, getSingleProduct, updateProduct, deleteProduct, searchProducts } = require('../controllers/productController');


const router = express.Router();

router.post('/addProduct', authenticateToken, validationMiddleware, createProduct)
router.get('/getAll', authenticateToken, getAllProducts)
router.get('/getMyProduct', authenticateToken, validationMiddleware, getMyProducts)
router.get('/getSingle/:id', authenticateToken, validationMiddleware, getSingleProduct)
router.patch('/updateProduct/:id', authenticateToken, validationMiddleware, updateProduct)
router.delete('/deleteProduct/:id', authenticateToken, validationMiddleware, deleteProduct)
router.get('/search', authenticateToken, searchProducts)



module.exports = router;