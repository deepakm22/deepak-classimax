const mongoose = require('mongoose');


const productSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true
    },
userId: {
    type: mongoose.Types.ObjectId, 
},
categoryId: {
    type: mongoose.Types.ObjectId, 
    required: true,
},
adType: {
    type: String, 
    required: true,
    enum: ['Business', 'Personal',], 
},
image: {
    type: Buffer, 
    required: false,
},
isActive: {
    type: Boolean, 
    default: true, 
},
price: {
    type: mongoose.Types.Decimal128, 
    required: true,
},
Negotiable: {
    type: Boolean, 
    default: false, 
},
Status: {
    type: String, 
    enum: ['Approved', 'pending Approval','rejected',],
    default: 'pending Approval',
    required: true,
},
Specification: {
    type: Object, 
    required: false,
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
    required: false,
},
updated_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: false,
},
});


module.exports = mongoose.model('products', productSchema);
