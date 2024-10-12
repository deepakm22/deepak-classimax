const {createReviewService, getAllReviewsByProductService, getReviewByIdService, updateService, deleteReviewService} = require('../services/reviewServices')

exports.createReview = async (req, res) => {
    try {
        const reviewData = {
            userId: req.user,
            productId: req.body.productId,
            name: req.body.name,
            email: req.body.email,
            message: req.body.message,
            Ratings: req.body.Ratings,
            created_by: req.user,
            updated_by: req.user
        };

        const newReview = await createReviewService(reviewData);

        return res.status(201).json({
            result: newReview,
            message: 'Review created successfully',
            status: 'success',
            responseCode: 201
        });
    } catch (error) {
        return res.status(500).json({
            result: null,
            message: error.message,
            status: 'error',
            responseCode: 500
        });
    }
};

exports.getReviewsByProduct = async (req, res) => {
    try {
        const reviews = await getAllReviewsByProductService(req.params.id);

        return res.status(200).json({
            result: reviews,
            message: 'Reviews retrieved successfully',
            status: 'success',
            responseCode: 200
        });
    } catch (error) {
        return res.status(500).json({
            result: null,
            message: error.message,
            status: 'error',
            responseCode: 500
        });
    }
};

exports.updateReview = async (req, res) => {
    try {
        const existingReview = await getReviewByIdService(req.params.reviewId);

        if (!existingReview) {
            return res.status(404).json({
                result: null,
                message: 'Review not found',
                status: 'error',
                responseCode: 404
            });
        }

        const updatedReview = await updateService(req.params.reviewId, req.body);

        return res.status(200).json({
            result: updatedReview,
            message: 'Review updated successfully',
            status: 'success',
            responseCode: 200
        });
    } catch (error) {
        return res.status(500).json({
            result: null,
            message: error.message,
            status: 'error',
            responseCode: 500
        });
    }
};

exports.deleteReview = async (req, res) => {
    try {

        const { reviewId } = req.params;
        console.log(reviewId);
        

        const existingReview = await getReviewByIdService(reviewId);


        if (!existingReview) {
            return res.status(404).json({
                result: null,
                message: 'Review not found',
                status: 'error',
                responseCode: 404
            });
        }

    const deleted =  await deleteReviewService(req.params.reviewId);

        return res.status(200).json({
            result: deleted,
            message: 'Review deleted successfully',
            status: 'success',
            responseCode: 200
        });
    } catch (error) {
        return res.status(500).json({
            result: null,
            message: error.message,
            status: 'error',
            responseCode: 500
        });
    }
};
