const express = require('express');
const validationMiddleware = require('../middlewares/validateMiddleware')
const authenticateToken = require('../middlewares/authMiddleware');
const { createReview, getReviewsByProduct, updateReview, deleteReview } = require('../controllers/reviewController');

const router = express.Router();

router.post('/addReview', authenticateToken, validationMiddleware, createReview)
router.get('/getReview/:id', authenticateToken, validationMiddleware, getReviewsByProduct)
router.patch('/updateReview/:reviewId', authenticateToken, validationMiddleware, updateReview)
router.delete('/deleteReview/:reviewId', authenticateToken, validationMiddleware, deleteReview)


module.exports = router;