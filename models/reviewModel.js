const mongoose = require('mongoose');


const reviewSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId, 
    required: true,
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId, 
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  Ratings: {
    type: Number, 
    required: true,
    min: 1, 
    max: 5, 
  },
  created_at: {
    type: Date,
    default: Date.now, 
  },
  updated_at: {
    type: Date,
    default: Date.now, 
  },
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true,
  },
  updated_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: false,
  },
});


module.exports = mongoose.model('reviews', reviewSchema);
