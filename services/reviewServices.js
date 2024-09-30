const Review = require('../models/reviewModel')

exports.createReviewService = async (data) => {
    const newReview = new Review(data);
    return await newReview.save();
};

exports.getAllReviewsByProductService = async (productId) => {
    return await Review.find({ productId }); 
};

exports.updateService = async (reviewId, updateData) => {
    return await Review.findByIdAndUpdate(reviewId, updateData, { new: true });
};

exports.deleteReviewService = async (reviewId) => {
    return await Review.findByIdAndDelete(reviewId);
};

exports.getReviewByIdService = async (reviewId) => {
    return await Review.findById(reviewId);
};